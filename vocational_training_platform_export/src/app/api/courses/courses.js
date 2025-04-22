'use server'

import { getCloudflareContext } from '@/lib/cloudflare'
import { checkAuthStatus } from '../auth/auth'

// استرجاع جميع الدورات
export async function getCourses(filters = {}) {
  const { db } = await getCloudflareContext()
  
  try {
    let query = `
      SELECT c.id, c.title, c.description, c.level, c.duration, c.image, c.price, c.is_published,
             u.full_name as instructor_name, u.id as instructor_id,
             (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrollment_count,
             (SELECT AVG(rating) FROM ratings WHERE course_id = c.id) as average_rating
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE 1=1
    `
    
    const params = []
    
    // تطبيق الفلاتر
    if (filters.level) {
      query += ' AND c.level = ?'
      params.push(filters.level)
    }
    
    if (filters.instructor_id) {
      query += ' AND c.instructor_id = ?'
      params.push(filters.instructor_id)
    }
    
    if (filters.is_published !== undefined) {
      query += ' AND c.is_published = ?'
      params.push(filters.is_published ? 1 : 0)
    }
    
    if (filters.search) {
      query += ' AND (c.title LIKE ? OR c.description LIKE ?)'
      const searchTerm = `%${filters.search}%`
      params.push(searchTerm, searchTerm)
    }
    
    // الترتيب
    query += ' ORDER BY c.created_at DESC'
    
    // تنفيذ الاستعلام
    const stmt = db.prepare(query)
    const bindStmt = params.length > 0 ? stmt.bind(...params) : stmt
    const courses = await bindStmt.all()
    
    return { success: true, courses: courses.results }
  } catch (error) {
    console.error('Error fetching courses:', error)
    return { success: false, error: 'فشل في استرجاع الدورات' }
  }
}

// استرجاع دورة محددة مع تفاصيلها
export async function getCourseById(courseId) {
  const { db } = await getCloudflareContext()
  
  try {
    // استرجاع بيانات الدورة
    const course = await db.prepare(`
      SELECT c.id, c.title, c.description, c.level, c.duration, c.image, c.price, c.is_published,
             u.full_name as instructor_name, u.id as instructor_id, u.bio as instructor_bio,
             (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrollment_count,
             (SELECT AVG(rating) FROM ratings WHERE course_id = c.id) as average_rating
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE c.id = ?
    `).bind(courseId).first()
    
    if (!course) {
      return { success: false, error: 'الدورة غير موجودة' }
    }
    
    // استرجاع وحدات الدورة
    const modules = await db.prepare(`
      SELECT id, title, description, order_index
      FROM modules
      WHERE course_id = ?
      ORDER BY order_index
    `).bind(courseId).all()
    
    // استرجاع دروس كل وحدة
    const moduleIds = modules.results.map(m => m.id)
    let lessons = []
    
    if (moduleIds.length > 0) {
      const placeholders = moduleIds.map(() => '?').join(',')
      lessons = await db.prepare(`
        SELECT id, module_id, title, description, type, duration, order_index
        FROM lessons
        WHERE module_id IN (${placeholders})
        ORDER BY module_id, order_index
      `).bind(...moduleIds).all()
      
      // تنظيم الدروس حسب الوحدات
      modules.results.forEach(module => {
        module.lessons = lessons.results.filter(lesson => lesson.module_id === module.id)
      })
    }
    
    // استرجاع التقييمات
    const ratings = await db.prepare(`
      SELECT r.id, r.rating, r.review, r.created_at,
             u.full_name as user_name
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.course_id = ?
      ORDER BY r.created_at DESC
      LIMIT 10
    `).bind(courseId).all()
    
    return { 
      success: true, 
      course: {
        ...course,
        modules: modules.results,
        ratings: ratings.results
      }
    }
  } catch (error) {
    console.error('Error fetching course:', error)
    return { success: false, error: 'فشل في استرجاع بيانات الدورة' }
  }
}

// إنشاء دورة جديدة
export async function createCourse(courseData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بإنشاء دورة' }
  }
  
  if (auth.role !== 'admin' && auth.role !== 'instructor') {
    return { success: false, error: 'غير مصرح لك بإنشاء دورة' }
  }
  
  try {
    // إنشاء الدورة
    const result = await db.prepare(`
      INSERT INTO courses (title, description, instructor_id, level, duration, image, price, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      courseData.title,
      courseData.description || null,
      auth.role === 'instructor' ? auth.userId : courseData.instructor_id,
      courseData.level,
      courseData.duration || null,
      courseData.image || null,
      courseData.price || 0,
      courseData.is_published || false
    ).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إنشاء الدورة' }
    }
    
    const courseId = result.meta.last_row_id
    
    return { success: true, courseId }
  } catch (error) {
    console.error('Error creating course:', error)
    return { success: false, error: 'فشل في إنشاء الدورة' }
  }
}

// تحديث دورة
export async function updateCourse(courseId, courseData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بتحديث الدورة' }
  }
  
  try {
    // التحقق من وجود الدورة ومن صلاحية المستخدم لتحديثها
    const course = await db.prepare(`
      SELECT instructor_id FROM courses WHERE id = ?
    `).bind(courseId).first()
    
    if (!course) {
      return { success: false, error: 'الدورة غير موجودة' }
    }
    
    // التحقق من الصلاحيات
    if (auth.role !== 'admin' && auth.userId !== course.instructor_id) {
      return { success: false, error: 'غير مصرح لك بتحديث هذه الدورة' }
    }
    
    // تحديث الدورة
    await db.prepare(`
      UPDATE courses
      SET title = ?, description = ?, level = ?, duration = ?, image = ?, price = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      courseData.title,
      courseData.description || null,
      courseData.level,
      courseData.duration || null,
      courseData.image || null,
      courseData.price || 0,
      courseData.is_published !== undefined ? courseData.is_published : false,
      courseId
    ).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error updating course:', error)
    return { success: false, error: 'فشل في تحديث الدورة' }
  }
}

// حذف دورة
export async function deleteCourse(courseId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بحذف الدورة' }
  }
  
  try {
    // التحقق من وجود الدورة ومن صلاحية المستخدم لحذفها
    const course = await db.prepare(`
      SELECT instructor_id FROM courses WHERE id = ?
    `).bind(courseId).first()
    
    if (!course) {
      return { success: false, error: 'الدورة غير موجودة' }
    }
    
    // التحقق من الصلاحيات
    if (auth.role !== 'admin' && auth.userId !== course.instructor_id) {
      return { success: false, error: 'غير مصرح لك بحذف هذه الدورة' }
    }
    
    // حذف الدورة (سيتم حذف جميع السجلات المرتبطة بها تلقائياً بسبب ON DELETE CASCADE)
    await db.prepare(`
      DELETE FROM courses WHERE id = ?
    `).bind(courseId).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting course:', error)
    return { success: false, error: 'فشل في حذف الدورة' }
  }
}

// التسجيل في دورة
export async function enrollInCourse(courseId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة
  if (!auth.authenticated) {
    return { success: false, error: 'يجب تسجيل الدخول للتسجيل في الدورة' }
  }
  
  try {
    // التحقق من وجود الدورة
    const course = await db.prepare(`
      SELECT id, is_published FROM courses WHERE id = ?
    `).bind(courseId).first()
    
    if (!course) {
      return { success: false, error: 'الدورة غير موجودة' }
    }
    
    if (!course.is_published && auth.role !== 'admin') {
      return { success: false, error: 'الدورة غير متاحة للتسجيل حالياً' }
    }
    
    // التحقق من عدم التسجيل المسبق
    const existingEnrollment = await db.prepare(`
      SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?
    `).bind(auth.userId, courseId).first()
    
    if (existingEnrollment) {
      return { success: false, error: 'أنت مسجل بالفعل في هذه الدورة' }
    }
    
    // إنشاء التسجيل
    await db.prepare(`
      INSERT INTO enrollments (user_id, course_id, status)
      VALUES (?, ?, 'active')
    `).bind(auth.userId, courseId).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error enrolling in course:', error)
    return { success: false, error: 'فشل في التسجيل في الدورة' }
  }
}

// استرجاع الدورات المسجل فيها المستخدم
export async function getUserEnrollments() {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة
  if (!auth.authenticated) {
    return { success: false, error: 'يجب تسجيل الدخول لعرض الدورات المسجلة' }
  }
  
  try {
    const enrollments = await db.prepare(`
      SELECT e.id, e.progress, e.status, e.enrollment_date,
             c.id as course_id, c.title, c.description, c.level, c.image,
             u.full_name as instructor_name
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      JOIN users u ON c.instructor_id = u.id
      WHERE e.user_id = ?
      ORDER BY e.enrollment_date DESC
    `).bind(auth.userId).all()
    
    return { success: true, enrollments: enrollments.results }
  } catch (error) {
    console.error('Error fetching user enrollments:', error)
    return { success: false, error: 'فشل في استرجاع الدورات المسجلة' }
  }
}

// تحديث تقدم المتدرب في الدورة
export async function updateEnrollmentProgress(enrollmentId, progress) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بتحديث التقدم' }
  }
  
  try {
    // التحقق من وجود التسجيل وملكيته
    const enrollment = await db.prepare(`
      SELECT id FROM enrollments WHERE id = ? AND user_id = ?
    `).bind(enrollmentId, auth.userId).first()
    
    if (!enrollment && auth.role !== 'admin' && auth.role !== 'instructor') {
      return { success: false, error: 'غير مصرح لك بتحديث هذا التسجيل' }
    }
    
    // تحديث التقدم
    await db.prepare(`
      UPDATE enrollments
      SET progress = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(progress, enrollmentId).run()
    
    // إذا كان التقدم 100%، تحديث حالة التسجيل إلى "مكتمل"
    if (progress >= 100) {
      await db.prepare(`
        UPDATE enrollments
        SET status = 'completed', completion_date = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(enrollmentId).run()
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error updating enrollment progress:', error)
    return { success: false, error: 'فشل في تحديث التقدم' }
  }
}

// إضافة تقييم للدورة
export async function rateCourse(courseId, rating, review) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة
  if (!auth.authenticated) {
    return { success: false, error: 'يجب تسجيل الدخول لتقييم الدورة' }
  }
  
  try {
    // التحقق من أن المستخدم مسجل في الدورة
    const enrollment = await db.prepare(`
      SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?
    `).bind(auth.userId, courseId).first()
    
    if (!enrollment) {
      return { success: false, error: 'يجب التسجيل في الدورة أولاً لتقييمها' }
    }
    
    // التحقق من عدم وجود تقييم سابق
    const existingRating = await db.prepare(`
      SELECT id FROM ratings WHERE user_id = ? AND course_id = ?
    `).bind(auth.userId, courseId).first()
    
    if (existingRating) {
      // تحديث التقييم الموجود
      await db.prepare(`
        UPDATE ratings
        SET rating = ?, review = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(rating, review || null, existingRating.id).run()
    } else {
      // إنشاء تقييم جديد
      await db.prepare(`
        INSERT INTO ratings (user_id, course_id, rating, review)
        VALUES (?, ?, ?, ?)
      `).bind(auth.userId, courseId, rating, review || null).run()
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error rating course:', error)
    return { success: false, error: 'فشل في تقييم الدورة' }
  }
}
