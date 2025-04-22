'use server'

import { getCloudflareContext } from '@/lib/cloudflare'
import { checkAuthStatus } from '../auth/auth'

// استرجاع جميع المتدربين
export async function getStudents() {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بعرض المتدربين' }
  }
  
  if (auth.role !== 'admin' && auth.role !== 'instructor') {
    return { success: false, error: 'غير مصرح لك بعرض المتدربين' }
  }
  
  try {
    let query = `
      SELECT u.id, u.username, u.email, u.full_name, u.profile_image, u.is_active,
             (SELECT COUNT(*) FROM enrollments WHERE user_id = u.id) as enrolled_courses_count,
             (SELECT MAX(updated_at) FROM enrollments WHERE user_id = u.id) as last_activity
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      WHERE r.name = 'student'
    `
    
    // إذا كان المستخدم محاضراً، يعرض فقط المتدربين المسجلين في دوراته
    if (auth.role === 'instructor') {
      query = `
        SELECT DISTINCT u.id, u.username, u.email, u.full_name, u.profile_image, u.is_active,
               (SELECT COUNT(*) FROM enrollments WHERE user_id = u.id) as enrolled_courses_count,
               (SELECT MAX(updated_at) FROM enrollments WHERE user_id = u.id) as last_activity
        FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        JOIN enrollments e ON u.id = e.user_id
        JOIN courses c ON e.course_id = c.id
        WHERE r.name = 'student' AND c.instructor_id = ?
      `
      
      const students = await db.prepare(query).bind(auth.userId).all()
      return { success: true, students: students.results }
    } else {
      const students = await db.prepare(query).all()
      return { success: true, students: students.results }
    }
  } catch (error) {
    console.error('Error fetching students:', error)
    return { success: false, error: 'فشل في استرجاع بيانات المتدربين' }
  }
}

// استرجاع بيانات متدرب محدد
export async function getStudentById(studentId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بعرض بيانات المتدرب' }
  }
  
  try {
    // التحقق من وجود المتدرب
    const student = await db.prepare(`
      SELECT u.id, u.username, u.email, u.full_name, u.profile_image, u.bio, u.phone, u.is_active
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      WHERE u.id = ? AND r.name = 'student'
    `).bind(studentId).first()
    
    if (!student) {
      return { success: false, error: 'المتدرب غير موجود' }
    }
    
    // إذا كان المستخدم محاضراً، يتحقق من أن المتدرب مسجل في إحدى دوراته
    if (auth.role === 'instructor') {
      const isEnrolled = await db.prepare(`
        SELECT 1
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE e.user_id = ? AND c.instructor_id = ?
        LIMIT 1
      `).bind(studentId, auth.userId).first()
      
      if (!isEnrolled && auth.userId !== parseInt(studentId)) {
        return { success: false, error: 'غير مصرح لك بعرض بيانات هذا المتدرب' }
      }
    }
    
    // استرجاع الدورات المسجل فيها المتدرب
    const enrollments = await db.prepare(`
      SELECT e.id, e.progress, e.status, e.enrollment_date, e.completion_date,
             c.id as course_id, c.title as course_title, c.level,
             u.full_name as instructor_name
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      JOIN users u ON c.instructor_id = u.id
      WHERE e.user_id = ?
      ORDER BY e.enrollment_date DESC
    `).bind(studentId).all()
    
    // استرجاع الشهادات
    const certificates = await db.prepare(`
      SELECT cert.id, cert.issue_date, cert.certificate_url,
             c.id as course_id, c.title as course_title
      FROM certificates cert
      JOIN courses c ON cert.course_id = c.id
      WHERE cert.user_id = ?
      ORDER BY cert.issue_date DESC
    `).bind(studentId).all()
    
    return { 
      success: true, 
      student,
      enrollments: enrollments.results,
      certificates: certificates.results
    }
  } catch (error) {
    console.error('Error fetching student:', error)
    return { success: false, error: 'فشل في استرجاع بيانات المتدرب' }
  }
}

// استرجاع تقدم المتدرب في دورة محددة
export async function getStudentCourseProgress(studentId, courseId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بعرض تقدم المتدرب' }
  }
  
  try {
    // التحقق من وجود التسجيل
    const enrollment = await db.prepare(`
      SELECT e.id, e.progress, e.status, e.enrollment_date, e.completion_date,
             c.instructor_id
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = ? AND e.course_id = ?
    `).bind(studentId, courseId).first()
    
    if (!enrollment) {
      return { success: false, error: 'المتدرب غير مسجل في هذه الدورة' }
    }
    
    // التحقق من الصلاحيات
    if (auth.role !== 'admin' && auth.userId !== enrollment.instructor_id && auth.userId !== parseInt(studentId)) {
      return { success: false, error: 'غير مصرح لك بعرض تقدم هذا المتدرب' }
    }
    
    // استرجاع تفاصيل الدورة
    const course = await db.prepare(`
      SELECT c.id, c.title, c.level, c.duration,
             u.full_name as instructor_name
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE c.id = ?
    `).bind(courseId).first()
    
    // استرجاع وحدات الدورة
    const modules = await db.prepare(`
      SELECT id, title, order_index
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
        SELECT id, module_id, title, type, order_index
        FROM lessons
        WHERE module_id IN (${placeholders})
        ORDER BY module_id, order_index
      `).bind(...moduleIds).all()
      
      // تنظيم الدروس حسب الوحدات
      modules.results.forEach(module => {
        module.lessons = lessons.results.filter(lesson => lesson.module_id === module.id)
      })
    }
    
    return { 
      success: true, 
      enrollment,
      course,
      modules: modules.results
    }
  } catch (error) {
    console.error('Error fetching student course progress:', error)
    return { success: false, error: 'فشل في استرجاع تقدم المتدرب' }
  }
}

// استرجاع شهادات المتدرب
export async function getStudentCertificates(studentId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بعرض شهادات المتدرب' }
  }
  
  // التحقق من الصلاحيات
  if (auth.role !== 'admin' && auth.userId !== parseInt(studentId)) {
    // إذا كان المستخدم محاضراً، يتحقق من أن المتدرب مسجل في إحدى دوراته
    if (auth.role === 'instructor') {
      const isEnrolled = await db.prepare(`
        SELECT 1
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE e.user_id = ? AND c.instructor_id = ?
        LIMIT 1
      `).bind(studentId, auth.userId).first()
      
      if (!isEnrolled) {
        return { success: false, error: 'غير مصرح لك بعرض شهادات هذا المتدرب' }
      }
    } else {
      return { success: false, error: 'غير مصرح لك بعرض شهادات هذا المتدرب' }
    }
  }
  
  try {
    const certificates = await db.prepare(`
      SELECT cert.id, cert.issue_date, cert.certificate_url,
             c.id as course_id, c.title as course_title, c.level,
             u.full_name as instructor_name
      FROM certificates cert
      JOIN courses c ON cert.course_id = c.id
      JOIN users u ON c.instructor_id = u.id
      WHERE cert.user_id = ?
      ORDER BY cert.issue_date DESC
    `).bind(studentId).all()
    
    return { success: true, certificates: certificates.results }
  } catch (error) {
    console.error('Error fetching student certificates:', error)
    return { success: false, error: 'فشل في استرجاع شهادات المتدرب' }
  }
}

// تحديث حالة تسجيل المتدرب في دورة
export async function updateEnrollmentStatus(enrollmentId, status) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بتحديث حالة التسجيل' }
  }
  
  if (auth.role !== 'admin' && auth.role !== 'instructor') {
    return { success: false, error: 'غير مصرح لك بتحديث حالة التسجيل' }
  }
  
  try {
    // التحقق من وجود التسجيل
    const enrollment = await db.prepare(`
      SELECT e.id, e.user_id, c.instructor_id
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.id = ?
    `).bind(enrollmentId).first()
    
    if (!enrollment) {
      return { success: false, error: 'التسجيل غير موجود' }
    }
    
    // التحقق من الصلاحيات إذا كان المستخدم محاضراً
    if (auth.role === 'instructor' && auth.userId !== enrollment.instructor_id) {
      return { success: false, error: 'غير مصرح لك بتحديث حالة هذا التسجيل' }
    }
    
    // تحديث حالة التسجيل
    await db.prepare(`
      UPDATE enrollments
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(status, enrollmentId).run()
    
    // إذا كانت الحالة "مكتمل"، تحديث تاريخ الإكمال
    if (status === 'completed') {
      await db.prepare(`
        UPDATE enrollments
        SET completion_date = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(enrollmentId).run()
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error updating enrollment status:', error)
    return { success: false, error: 'فشل في تحديث حالة التسجيل' }
  }
}
