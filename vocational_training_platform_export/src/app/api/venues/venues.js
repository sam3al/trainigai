'use server'

import { getCloudflareContext } from '@/lib/cloudflare'
import { checkAuthStatus } from '../auth/auth'

// استرجاع جميع مواقع التدريب
export async function getVenues() {
  const { db } = await getCloudflareContext()
  
  try {
    const venues = await db.prepare(`
      SELECT id, name, address, capacity, type, description
      FROM venues
      ORDER BY name
    `).all()
    
    return { success: true, venues: venues.results }
  } catch (error) {
    console.error('Error fetching venues:', error)
    return { success: false, error: 'فشل في استرجاع بيانات مواقع التدريب' }
  }
}

// استرجاع موقع تدريب محدد
export async function getVenueById(venueId) {
  const { db } = await getCloudflareContext()
  
  try {
    const venue = await db.prepare(`
      SELECT id, name, address, capacity, type, description
      FROM venues
      WHERE id = ?
    `).bind(venueId).first()
    
    if (!venue) {
      return { success: false, error: 'موقع التدريب غير موجود' }
    }
    
    // استرجاع جدول الدورات في هذا الموقع
    const schedules = await db.prepare(`
      SELECT s.id, s.start_time, s.end_time,
             c.id as course_id, c.title as course_title,
             u.full_name as instructor_name
      FROM schedules s
      JOIN courses c ON s.course_id = c.id
      JOIN users u ON c.instructor_id = u.id
      WHERE s.venue_id = ?
      ORDER BY s.start_time
    `).bind(venueId).all()
    
    return { 
      success: true, 
      venue,
      schedules: schedules.results
    }
  } catch (error) {
    console.error('Error fetching venue:', error)
    return { success: false, error: 'فشل في استرجاع بيانات موقع التدريب' }
  }
}

// إنشاء موقع تدريب جديد
export async function createVenue(venueData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بإنشاء موقع تدريب' }
  }
  
  if (auth.role !== 'admin') {
    return { success: false, error: 'غير مصرح لك بإنشاء موقع تدريب' }
  }
  
  try {
    // إنشاء موقع التدريب
    const result = await db.prepare(`
      INSERT INTO venues (name, address, capacity, type, description)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      venueData.name,
      venueData.address || null,
      venueData.capacity || null,
      venueData.type,
      venueData.description || null
    ).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إنشاء موقع التدريب' }
    }
    
    const venueId = result.meta.last_row_id
    
    return { success: true, venueId }
  } catch (error) {
    console.error('Error creating venue:', error)
    return { success: false, error: 'فشل في إنشاء موقع التدريب' }
  }
}

// تحديث موقع تدريب
export async function updateVenue(venueId, venueData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بتحديث موقع التدريب' }
  }
  
  if (auth.role !== 'admin') {
    return { success: false, error: 'غير مصرح لك بتحديث موقع التدريب' }
  }
  
  try {
    // التحقق من وجود موقع التدريب
    const venue = await db.prepare(`
      SELECT id FROM venues WHERE id = ?
    `).bind(venueId).first()
    
    if (!venue) {
      return { success: false, error: 'موقع التدريب غير موجود' }
    }
    
    // تحديث موقع التدريب
    await db.prepare(`
      UPDATE venues
      SET name = ?, address = ?, capacity = ?, type = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      venueData.name,
      venueData.address || null,
      venueData.capacity || null,
      venueData.type,
      venueData.description || null,
      venueId
    ).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error updating venue:', error)
    return { success: false, error: 'فشل في تحديث موقع التدريب' }
  }
}

// حذف موقع تدريب
export async function deleteVenue(venueId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بحذف موقع التدريب' }
  }
  
  if (auth.role !== 'admin') {
    return { success: false, error: 'غير مصرح لك بحذف موقع التدريب' }
  }
  
  try {
    // التحقق من وجود موقع التدريب
    const venue = await db.prepare(`
      SELECT id FROM venues WHERE id = ?
    `).bind(venueId).first()
    
    if (!venue) {
      return { success: false, error: 'موقع التدريب غير موجود' }
    }
    
    // التحقق من عدم وجود جدول زمني مرتبط بهذا الموقع
    const schedules = await db.prepare(`
      SELECT id FROM schedules WHERE venue_id = ? LIMIT 1
    `).bind(venueId).first()
    
    if (schedules) {
      return { success: false, error: 'لا يمكن حذف موقع التدريب لوجود جدول زمني مرتبط به' }
    }
    
    // حذف موقع التدريب
    await db.prepare(`
      DELETE FROM venues WHERE id = ?
    `).bind(venueId).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting venue:', error)
    return { success: false, error: 'فشل في حذف موقع التدريب' }
  }
}

// إضافة جدول زمني
export async function addSchedule(scheduleData) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بإضافة جدول زمني' }
  }
  
  if (auth.role !== 'admin' && auth.role !== 'instructor') {
    return { success: false, error: 'غير مصرح لك بإضافة جدول زمني' }
  }
  
  try {
    // التحقق من وجود الدورة وموقع التدريب
    const course = await db.prepare(`
      SELECT id, instructor_id FROM courses WHERE id = ?
    `).bind(scheduleData.course_id).first()
    
    if (!course) {
      return { success: false, error: 'الدورة غير موجودة' }
    }
    
    // التحقق من الصلاحيات إذا كان المستخدم محاضراً
    if (auth.role === 'instructor' && auth.userId !== course.instructor_id) {
      return { success: false, error: 'غير مصرح لك بإضافة جدول زمني لهذه الدورة' }
    }
    
    const venue = await db.prepare(`
      SELECT id FROM venues WHERE id = ?
    `).bind(scheduleData.venue_id).first()
    
    if (!venue) {
      return { success: false, error: 'موقع التدريب غير موجود' }
    }
    
    // التحقق من عدم وجود تعارض في الجدول الزمني
    const conflictingSchedule = await db.prepare(`
      SELECT id FROM schedules
      WHERE venue_id = ? AND (
        (start_time <= ? AND end_time >= ?) OR
        (start_time <= ? AND end_time >= ?) OR
        (start_time >= ? AND end_time <= ?)
      )
    `).bind(
      scheduleData.venue_id,
      scheduleData.end_time, scheduleData.start_time,
      scheduleData.start_time, scheduleData.start_time,
      scheduleData.start_time, scheduleData.end_time
    ).first()
    
    if (conflictingSchedule) {
      return { success: false, error: 'يوجد تعارض في الجدول الزمني لموقع التدريب' }
    }
    
    // إضافة الجدول الزمني
    const result = await db.prepare(`
      INSERT INTO schedules (course_id, venue_id, start_time, end_time)
      VALUES (?, ?, ?, ?)
    `).bind(
      scheduleData.course_id,
      scheduleData.venue_id,
      scheduleData.start_time,
      scheduleData.end_time
    ).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إضافة الجدول الزمني' }
    }
    
    const scheduleId = result.meta.last_row_id
    
    return { success: true, scheduleId }
  } catch (error) {
    console.error('Error adding schedule:', error)
    return { success: false, error: 'فشل في إضافة الجدول الزمني' }
  }
}

// حذف جدول زمني
export async function deleteSchedule(scheduleId) {
  const { db } = await getCloudflareContext()
  const auth = await checkAuthStatus()
  
  // التحقق من المصادقة والصلاحيات
  if (!auth.authenticated) {
    return { success: false, error: 'غير مصرح لك بحذف الجدول الزمني' }
  }
  
  try {
    // التحقق من وجود الجدول الزمني والدورة المرتبطة به
    const schedule = await db.prepare(`
      SELECT s.id, c.instructor_id
      FROM schedules s
      JOIN courses c ON s.course_id = c.id
      WHERE s.id = ?
    `).bind(scheduleId).first()
    
    if (!schedule) {
      return { success: false, error: 'الجدول الزمني غير موجود' }
    }
    
    // التحقق من الصلاحيات
    if (auth.role !== 'admin' && auth.userId !== schedule.instructor_id) {
      return { success: false, error: 'غير مصرح لك بحذف هذا الجدول الزمني' }
    }
    
    // حذف الجدول الزمني
    await db.prepare(`
      DELETE FROM schedules WHERE id = ?
    `).bind(scheduleId).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting schedule:', error)
    return { success: false, error: 'فشل في حذف الجدول الزمني' }
  }
}
