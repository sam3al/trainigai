'use server'

import { getCloudflareContext } from '@/lib/cloudflare'
import { checkAuthStatus } from '../auth/auth'

// استرجاع جميع المحاضرين
export async function getInstructors() {
  const { db } = await getCloudflareContext()
  
  try {
    const instructors = await db.prepare(`
      SELECT u.id, u.username, u.email, u.full_name, u.profile_image, u.bio, u.phone, u.is_active
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      WHERE r.name = 'instructor'
      ORDER BY u.full_name
    `).all()
    
    return { success: true, instructors: instructors.results }
  } catch (error) {
    console.error('Error fetching instructors:', error)
    return { success: false, error: 'فشل في استرجاع بيانات المحاضرين' }
  }
}

// استرجاع دورات محاضر معين
export async function getInstructorCourses(instructorId) {
  const { db } = await getCloudflareContext()
  
  try {
    // التحقق من وجود المحاضر
    const instructor = await db.prepare(`
      SELECT u.id, u.full_name, u.bio, u.profile_image
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      WHERE u.id = ? AND r.name = 'instructor'
    `).bind(instructorId).first()
    
    if (!instructor) {
      return { success: false, error: 'المحاضر غير موجود' }
    }
    
    // استرجاع الدورات
    const courses = await db.prepare(`
      SELECT c.id, c.title, c.description, c.level, c.duration, c.image, c.is_published,
             (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrollment_count,
             (SELECT AVG(rating) FROM ratings WHERE course_id = c.id) as average_rating
      FROM courses c
      WHERE c.instructor_id = ?
      ORDER BY c.created_at DESC
    `).bind(instructorId).all()
    
    return { 
      success: true, 
      instructor,
      courses: courses.results 
    }
  } catch (error) {
    console.error('Error fetching instructor courses:', error)
    return { success: false, error: 'فشل في استرجاع دورات المحاضر' }
  }
}

// استرجاع متدربي محاضر معين
export async function getInstructorStudents(instructorId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بعرض المتدربين' }
  }
  
  if (auth.role !== 'admin' && auth.userId !== parseInt(instructorId)) {
    return { success: false, error: 'غير مصرح لك بعرض متدربي محاضر آخر' }
  }
  
  try {
    const students = await db.prepare(`
      SELECT DISTINCT u.id, u.username, u.email, u.full_name, u.profile_image,
             (SELECT COUNT(*) FROM enrollments WHERE user_id = u.id AND course_id IN (
                SELECT id FROM courses WHERE instructor_id = ?
             )) as enrolled_courses_count,
             (SELECT MAX(updated_at) FROM enrollments WHERE user_id = u.id) as last_activity
      FROM users u
      JOIN enrollments e ON u.id = e.user_id
      JOIN courses c ON e.course_id = c.id
      WHERE c.instructor_id = ?
      ORDER BY u.full_name
    `).bind(instructorId, instructorId).all()
    
    return { success: true, students: students.results }
  } catch (error) {
    console.error('Error fetching instructor students:', error)
    return { success: false, error: 'فشل في استرجاع بيانات المتدربين' }
  }
}

// إضافة وحدة تعليمية لدورة
export async function addModuleToCourse(courseId, moduleData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بإضافة وحدة تعليمية' }
  }
  
  try {
    // التحقق من وجود الدورة ومن صلاحية المستخدم لتعديلها
    const course = await db.prepare(`
      SELECT instructor_id FROM courses WHERE id = ?
    `).bind(courseId).first()
    
    if (!course) {
      return { success: false, error: 'الدورة غير موجودة' }
    }
    
    // التحقق من الصلاحيات
    if (auth.role !== 'admin' && auth.userId !== course.instructor_id) {
      return { success: false, error: 'غير مصرح لك بتعديل هذه الدورة' }
    }
    
    // الحصول على أعلى ترتيب موجود
    const maxOrder = await db.prepare(`
      SELECT MAX(order_index) as max_order FROM modules WHERE course_id = ?
    `).bind(courseId).first()
    
    const orderIndex = maxOrder && maxOrder.max_order !== null ? maxOrder.max_order + 1 : 0
    
    // إضافة الوحدة التعليمية
    const result = await db.prepare(`
      INSERT INTO modules (course_id, title, description, order_index)
      VALUES (?, ?, ?, ?)
    `).bind(
      courseId,
      moduleData.title,
      moduleData.description || null,
      orderIndex
    ).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إضافة الوحدة التعليمية' }
    }
    
    const moduleId = result.meta.last_row_id
    
    return { success: true, moduleId }
  } catch (error) {
    console.error('Error adding module:', error)
    return { success: false, error: 'فشل في إضافة الوحدة التعليمية' }
  }
}

// إضافة درس لوحدة تعليمية
export async function addLessonToModule(moduleId, lessonData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بإضافة درس' }
  }
  
  try {
    // التحقق من وجود الوحدة التعليمية والدورة المرتبطة بها
    const module = await db.prepare(`
      SELECT m.id, c.instructor_id
      FROM modules m
      JOIN courses c ON m.course_id = c.id
      WHERE m.id = ?
    `).bind(moduleId).first()
    
    if (!module) {
      return { success: false, error: 'الوحدة التعليمية غير موجودة' }
    }
    
    // التحقق من الصلاحيات
    if (auth.role !== 'admin' && auth.userId !== module.instructor_id) {
      return { success: false, error: 'غير مصرح لك بتعديل هذه الوحدة التعليمية' }
    }
    
    // الحصول على أعلى ترتيب موجود
    const maxOrder = await db.prepare(`
      SELECT MAX(order_index) as max_order FROM lessons WHERE module_id = ?
    `).bind(moduleId).first()
    
    const orderIndex = maxOrder && maxOrder.max_order !== null ? maxOrder.max_order + 1 : 0
    
    // إضافة الدرس
    const result = await db.prepare(`
      INSERT INTO lessons (module_id, title, description, content, type, duration, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      moduleId,
      lessonData.title,
      lessonData.description || null,
      lessonData.content || null,
      lessonData.type,
      lessonData.duration || null,
      orderIndex
    ).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إضافة الدرس' }
    }
    
    const lessonId = result.meta.last_row_id
    
    return { success: true, lessonId }
  } catch (error) {
    console.error('Error adding lesson:', error)
    return { success: false, error: 'فشل في إضافة الدرس' }
  }
}

// إضافة مادة تعليمية لدرس
export async function addMaterialToLesson(lessonId, materialData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بإضافة مادة تعليمية' }
  }
  
  try {
    // التحقق من وجود الدرس والوحدة والدورة المرتبطة به
    const lesson = await db.prepare(`
      SELECT l.id, c.instructor_id
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN courses c ON m.course_id = c.id
      WHERE l.id = ?
    `).bind(lessonId).first()
    
    if (!lesson) {
      return { success: false, error: 'الدرس غير موجود' }
    }
    
    // التحقق من الصلاحيات
    if (auth.role !== 'admin' && auth.userId !== lesson.instructor_id) {
      return { success: false, error: 'غير مصرح لك بتعديل هذا الدرس' }
    }
    
    // إضافة المادة التعليمية
    const result = await db.prepare(`
      INSERT INTO materials (lesson_id, title, type, url)
      VALUES (?, ?, ?, ?)
    `).bind(
      lessonId,
      materialData.title,
      materialData.type,
      materialData.url
    ).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إضافة المادة التعليمية' }
    }
    
    const materialId = result.meta.last_row_id
    
    return { success: true, materialId }
  } catch (error) {
    console.error('Error adding material:', error)
    return { success: false, error: 'فشل في إضافة المادة التعليمية' }
  }
}

// إضافة اختبار لدرس
export async function addQuizToLesson(lessonId, quizData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بإضافة اختبار' }
  }
  
  try {
    // التحقق من وجود الدرس والوحدة والدورة المرتبطة به
    const lesson = await db.prepare(`
      SELECT l.id, c.instructor_id
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN courses c ON m.course_id = c.id
      WHERE l.id = ?
    `).bind(lessonId).first()
    
    if (!lesson) {
      return { success: false, error: 'الدرس غير موجود' }
    }
    
    // التحقق من الصلاحيات
    if (auth.role !== 'admin' && auth.userId !== lesson.instructor_id) {
      return { success: false, error: 'غير مصرح لك بتعديل هذا الدرس' }
    }
    
    // إضافة الاختبار
    const result = await db.prepare(`
      INSERT INTO quizzes (lesson_id, title, description, duration, passing_score)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      lessonId,
      quizData.title,
      quizData.description || null,
      quizData.duration || null,
      quizData.passing_score || 60
    ).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إضافة الاختبار' }
    }
    
    const quizId = result.meta.last_row_id
    
    // إضافة الأسئلة إذا كانت موجودة
    if (quizData.questions && quizData.questions.length > 0) {
      for (const question of quizData.questions) {
        await db.prepare(`
          INSERT INTO questions (quiz_id, question_text, question_type, options, correct_answer, points)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
          quizId,
          question.question_text,
          question.question_type,
          JSON.stringify(question.options || []),
          question.correct_answer,
          question.points || 1
        ).run()
      }
    }
    
    return { success: true, quizId }
  } catch (error) {
    console.error('Error adding quiz:', error)
    return { success: false, error: 'فشل في إضافة الاختبار' }
  }
}

// إصدار شهادة للمتدرب
export async function issueCertificate(userId, courseId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بإصدار شهادة' }
  }
  
  if (auth.role !== 'admin' && auth.role !== 'instructor') {
    return { success: false, error: 'غير مصرح لك بإصدار شهادة' }
  }
  
  try {
    // التحقق من وجود التسجيل وإكمال الدورة
    const enrollment = await db.prepare(`
      SELECT e.id, e.progress, c.instructor_id
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = ? AND e.course_id = ?
    `).bind(userId, courseId).first()
    
    if (!enrollment) {
      return { success: false, error: 'المتدرب غير مسجل في هذه الدورة' }
    }
    
    // التحقق من الصلاحيات إذا كان المستخدم محاضراً
    if (auth.role === 'instructor' && auth.userId !== enrollment.instructor_id) {
      return { success: false, error: 'غير مصرح لك بإصدار شهادة لهذه الدورة' }
    }
    
    // التحقق من إكمال الدورة
    if (enrollment.progress < 100 && auth.role !== 'admin') {
      return { success: false, error: 'يجب إكمال الدورة أولاً للحصول على شهادة' }
    }
    
    // التحقق من عدم وجود شهادة سابقة
    const existingCertificate = await db.prepare(`
      SELECT id FROM certificates WHERE user_id = ? AND course_id = ?
    `).bind(userId, courseId).first()
    
    if (existingCertificate) {
      return { success: false, error: 'تم إصدار شهادة لهذه الدورة مسبقاً' }
    }
    
    // إنشاء رابط الشهادة (في تطبيق حقيقي، سيتم إنشاء ملف PDF وتخزينه)
    const certificateUrl = `/certificates/${userId}_${courseId}_${Date.now()}.pdf`
    
    // إصدار الشهادة
    const result = await db.prepare(`
      INSERT INTO certificates (user_id, course_id, certificate_url)
      VALUES (?, ?, ?)
    `).bind(userId, courseId, certificateUrl).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إصدار الشهادة' }
    }
    
    const certificateId = result.meta.last_row_id
    
    return { success: true, certificateId, certificateUrl }
  } catch (error) {
    console.error('Error issuing certificate:', error)
    return { success: false, error: 'فشل في إصدار الشهادة' }
  }
}
