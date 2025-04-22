'use server'

import { cookies } from 'next/headers'
import { getCloudflareContext } from '@/lib/cloudflare'

// استرجاع بيانات المستخدمين
export async function getUsers() {
  const { db } = await getCloudflareContext()
  
  try {
    const users = await db.prepare(`
      SELECT u.id, u.username, u.email, u.full_name, u.profile_image, u.bio, u.phone, u.is_active, 
             r.name as role_name
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      ORDER BY u.created_at DESC
    `).all()
    
    return { success: true, users: users.results }
  } catch (error) {
    console.error('Error fetching users:', error)
    return { success: false, error: 'فشل في استرجاع بيانات المستخدمين' }
  }
}

// استرجاع بيانات مستخدم محدد
export async function getUserById(userId) {
  const { db } = await getCloudflareContext()
  
  try {
    const user = await db.prepare(`
      SELECT u.id, u.username, u.email, u.full_name, u.profile_image, u.bio, u.phone, u.is_active, 
             r.name as role_name
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      WHERE u.id = ?
    `).bind(userId).first()
    
    if (!user) {
      return { success: false, error: 'المستخدم غير موجود' }
    }
    
    return { success: true, user }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { success: false, error: 'فشل في استرجاع بيانات المستخدم' }
  }
}

// إنشاء مستخدم جديد
export async function createUser(userData) {
  const { db } = await getCloudflareContext()
  
  try {
    // التحقق من عدم وجود مستخدم بنفس البريد الإلكتروني أو اسم المستخدم
    const existingUser = await db.prepare(`
      SELECT id FROM users WHERE email = ? OR username = ?
    `).bind(userData.email, userData.username).first()
    
    if (existingUser) {
      return { success: false, error: 'البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل' }
    }
    
    // إنشاء المستخدم
    const result = await db.prepare(`
      INSERT INTO users (username, email, password_hash, full_name, profile_image, bio, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      userData.username,
      userData.email,
      userData.password_hash, // يجب تشفير كلمة المرور قبل التخزين
      userData.full_name,
      userData.profile_image || null,
      userData.bio || null,
      userData.phone || null
    ).run()
    
    if (!result.success) {
      return { success: false, error: 'فشل في إنشاء المستخدم' }
    }
    
    const userId = result.meta.last_row_id
    
    // إضافة دور للمستخدم
    await db.prepare(`
      INSERT INTO user_roles (user_id, role_id)
      SELECT ?, id FROM roles WHERE name = ?
    `).bind(userId, userData.role || 'student').run()
    
    return { success: true, userId }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: 'فشل في إنشاء المستخدم' }
  }
}

// تحديث بيانات مستخدم
export async function updateUser(userId, userData) {
  const { db } = await getCloudflareContext()
  
  try {
    // التحقق من وجود المستخدم
    const existingUser = await db.prepare(`
      SELECT id FROM users WHERE id = ?
    `).bind(userId).first()
    
    if (!existingUser) {
      return { success: false, error: 'المستخدم غير موجود' }
    }
    
    // تحديث بيانات المستخدم
    await db.prepare(`
      UPDATE users
      SET full_name = ?, profile_image = ?, bio = ?, phone = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      userData.full_name,
      userData.profile_image || null,
      userData.bio || null,
      userData.phone || null,
      userData.is_active !== undefined ? userData.is_active : true,
      userId
    ).run()
    
    // تحديث دور المستخدم إذا تم تغييره
    if (userData.role) {
      // حذف الأدوار الحالية
      await db.prepare(`
        DELETE FROM user_roles WHERE user_id = ?
      `).bind(userId).run()
      
      // إضافة الدور الجديد
      await db.prepare(`
        INSERT INTO user_roles (user_id, role_id)
        SELECT ?, id FROM roles WHERE name = ?
      `).bind(userId, userData.role).run()
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error updating user:', error)
    return { success: false, error: 'فشل في تحديث بيانات المستخدم' }
  }
}

// حذف مستخدم
export async function deleteUser(userId) {
  const { db } = await getCloudflareContext()
  
  try {
    // التحقق من وجود المستخدم
    const existingUser = await db.prepare(`
      SELECT id FROM users WHERE id = ?
    `).bind(userId).first()
    
    if (!existingUser) {
      return { success: false, error: 'المستخدم غير موجود' }
    }
    
    // حذف المستخدم (سيتم حذف جميع السجلات المرتبطة به تلقائياً بسبب ON DELETE CASCADE)
    await db.prepare(`
      DELETE FROM users WHERE id = ?
    `).bind(userId).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting user:', error)
    return { success: false, error: 'فشل في حذف المستخدم' }
  }
}

// المصادقة (تسجيل الدخول)
export async function authenticateUser(username, password) {
  const { db } = await getCloudflareContext()
  
  try {
    // البحث عن المستخدم باسم المستخدم أو البريد الإلكتروني
    const user = await db.prepare(`
      SELECT u.id, u.username, u.email, u.password_hash, u.full_name, u.is_active, r.name as role
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      WHERE (u.username = ? OR u.email = ?)
    `).bind(username, username).first()
    
    if (!user) {
      return { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }
    }
    
    if (!user.is_active) {
      return { success: false, error: 'الحساب غير نشط' }
    }
    
    // التحقق من كلمة المرور (يجب استخدام مكتبة لمقارنة كلمة المرور المشفرة)
    // هذا مثال مبسط، في التطبيق الحقيقي يجب استخدام bcrypt أو مكتبة مماثلة
    if (user.password_hash !== password) {
      return { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }
    }
    
    // إنشاء جلسة للمستخدم
    const sessionId = Math.random().toString(36).substring(2, 15)
    
    // تخزين معرف الجلسة في ملفات تعريف الارتباط
    cookies().set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // أسبوع واحد
      path: '/'
    })
    
    // تخزين بيانات المستخدم في ملفات تعريف الارتباط
    cookies().set('user_id', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })
    
    cookies().set('user_role', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })
    
    return { 
      success: true, 
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    }
  } catch (error) {
    console.error('Error authenticating user:', error)
    return { success: false, error: 'فشل في تسجيل الدخول' }
  }
}

// تسجيل الخروج
export async function logoutUser() {
  // حذف ملفات تعريف الارتباط
  cookies().delete('session_id')
  cookies().delete('user_id')
  cookies().delete('user_role')
  
  return { success: true }
}

// التحقق من حالة المصادقة
export async function checkAuthStatus() {
  const userId = cookies().get('user_id')?.value
  const userRole = cookies().get('user_role')?.value
  
  if (!userId || !userRole) {
    return { authenticated: false }
  }
  
  return { 
    authenticated: true,
    userId: parseInt(userId),
    role: userRole
  }
}
