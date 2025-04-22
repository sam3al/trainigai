'use client'

import { getCloudflareContext } from '@/lib/cloudflare'

// وظيفة مساعدة للحصول على سياق Cloudflare
export async function getCloudflareContext() {
  // في بيئة الإنتاج، سيتم استخدام سياق Cloudflare الحقيقي
  // في بيئة التطوير، نقوم بمحاكاة قاعدة البيانات باستخدام D1
  
  // تهيئة اتصال قاعدة البيانات
  const db = process.env.NODE_ENV === 'production'
    ? env.DB
    : await getLocalDb()
  
  return { db }
}

// وظيفة مساعدة للحصول على قاعدة بيانات محلية للتطوير
async function getLocalDb() {
  // استخدام Wrangler لتشغيل قاعدة بيانات D1 محلياً
  // هذه مجرد محاكاة مبسطة، في التطبيق الحقيقي سيتم استخدام Wrangler بشكل صحيح
  
  return {
    prepare: (query) => {
      return {
        bind: (...params) => {
          return {
            first: async () => {
              console.log('Mock DB query (first):', query, params)
              return null // محاكاة لعدم وجود نتائج
            },
            all: async () => {
              console.log('Mock DB query (all):', query, params)
              return { results: [] } // محاكاة لقائمة فارغة من النتائج
            },
            run: async () => {
              console.log('Mock DB query (run):', query, params)
              return { success: true, meta: { last_row_id: 1 } } // محاكاة لنجاح العملية
            }
          }
        },
        first: async () => {
          console.log('Mock DB query (first):', query)
          return null // محاكاة لعدم وجود نتائج
        },
        all: async () => {
          console.log('Mock DB query (all):', query)
          return { results: [] } // محاكاة لقائمة فارغة من النتائج
        },
        run: async () => {
          console.log('Mock DB query (run):', query)
          return { success: true, meta: { last_row_id: 1 } } // محاكاة لنجاح العملية
        }
      }
    }
  }
}
