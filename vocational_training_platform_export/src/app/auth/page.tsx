'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { authenticateUser } from '@/app/api/auth/auth'

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // حالة نموذج تسجيل الدخول
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })
  
  // حالة نموذج التسجيل
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })
  
  // معالجة تغيير حقول نموذج تسجيل الدخول
  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }
  
  // معالجة تغيير حقول نموذج التسجيل
  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prev => ({ ...prev, [name]: value }))
  }
  
  // معالجة تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // في التطبيق الحقيقي، سيتم استدعاء API للمصادقة
      const result = await authenticateUser(loginData.username, loginData.password)
      
      if (result.success) {
        // تحديد الصفحة المناسبة بناءً على دور المستخدم
        if (result.user.role === 'admin') {
          router.push('/admin/dashboard')
        } else if (result.user.role === 'instructor') {
          router.push('/instructor/dashboard')
        } else {
          router.push('/student/dashboard')
        }
      } else {
        setError(result.error || 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }
  
  // معالجة التسجيل
  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // التحقق من تطابق كلمات المرور
    if (registerData.password !== registerData.confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      setIsLoading(false)
      return
    }
    
    try {
      // في التطبيق الحقيقي، سيتم استدعاء API للتسجيل
      // هنا نقوم بمحاكاة عملية التسجيل
      setTimeout(() => {
        // تحويل المستخدم إلى صفحة تسجيل الدخول بعد التسجيل الناجح
        setIsLoading(false)
        router.push('/auth?tab=login&registered=true')
      }, 1500)
    } catch (error) {
      console.error('Registration error:', error)
      setError('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.')
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">منصة التدريب الوظيفي</CardTitle>
          <CardDescription>
            سجل دخولك للوصول إلى الدورات التدريبية والمواد العلمية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="register">حساب جديد</TabsTrigger>
            </TabsList>
            
            {/* نموذج تسجيل الدخول */}
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">اسم المستخدم أو البريد الإلكتروني</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="أدخل اسم المستخدم أو البريد الإلكتروني"
                      required
                      value={loginData.username}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        نسيت كلمة المرور؟
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            {/* نموذج التسجيل */}
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="أدخل الاسم الكامل"
                      required
                      value={registerData.fullName}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">اسم المستخدم</Label>
                    <Input
                      id="reg-username"
                      name="username"
                      placeholder="أدخل اسم المستخدم"
                      required
                      value={registerData.username}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="أدخل البريد الإلكتروني"
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">كلمة المرور</Label>
                    <Input
                      id="reg-password"
                      name="password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      required
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="أعد إدخال كلمة المرور"
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'جاري التسجيل...' : 'إنشاء حساب'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            بالتسجيل، أنت توافق على <a href="#" className="underline">شروط الاستخدام</a> و <a href="#" className="underline">سياسة الخصوصية</a> الخاصة بنا.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
