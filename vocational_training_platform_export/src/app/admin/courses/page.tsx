'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createCourse, getCourses } from '@/app/api/courses/courses'
import { getInstructors } from '@/app/api/instructors/instructors'
import { checkAuthStatus } from '@/app/api/auth/auth'
import { useRouter } from 'next/navigation'

export default function CourseManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = useState([])
  const [userRole, setUserRole] = useState('')
  
  // حالة نموذج إنشاء دورة جديدة
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    instructor_id: '',
    level: 'مبتدئ',
    duration: '',
    price: 0,
    is_published: false
  })
  
  // التحقق من حالة المصادقة عند تحميل الصفحة
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await checkAuthStatus()
        if (!auth.authenticated) {
          router.push('/auth')
          return
        }
        
        if (auth.role !== 'admin' && auth.role !== 'instructor') {
          router.push('/student/dashboard')
          return
        }
        
        setUserRole(auth.role)
        
        // استرجاع قائمة الدورات
        loadCourses()
        
        // استرجاع قائمة المحاضرين إذا كان المستخدم مديراً
        if (auth.role === 'admin') {
          loadInstructors()
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/auth')
      }
    }
    
    checkAuth()
  }, [router])
  
  // استرجاع قائمة الدورات
  const loadCourses = async () => {
    try {
      const result = await getCourses()
      if (result.success) {
        setCourses(result.courses)
      }
    } catch (error) {
      console.error('Error loading courses:', error)
    }
  }
  
  // استرجاع قائمة المحاضرين
  const loadInstructors = async () => {
    try {
      const result = await getInstructors()
      if (result.success) {
        setInstructors(result.instructors)
      }
    } catch (error) {
      console.error('Error loading instructors:', error)
    }
  }
  
  // معالجة تغيير حقول نموذج إنشاء دورة
  const handleCourseChange = (e) => {
    const { name, value, type, checked } = e.target
    setCourseData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  // معالجة تغيير القائمة المنسدلة
  const handleSelectChange = (name, value) => {
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // معالجة إنشاء دورة جديدة
  const handleCreateCourse = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const result = await createCourse(courseData)
      
      if (result.success) {
        setSuccess('تم إنشاء الدورة بنجاح')
        setCourseData({
          title: '',
          description: '',
          instructor_id: '',
          level: 'مبتدئ',
          duration: '',
          price: 0,
          is_published: false
        })
        loadCourses()
      } else {
        setError(result.error || 'فشل في إنشاء الدورة')
      }
    } catch (error) {
      console.error('Create course error:', error)
      setError('حدث خطأ أثناء إنشاء الدورة. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">إدارة الدورات التدريبية</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* نموذج إنشاء دورة جديدة */}
        <Card>
          <CardHeader>
            <CardTitle>إنشاء دورة جديدة</CardTitle>
            <CardDescription>أدخل بيانات الدورة التدريبية الجديدة</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCourse}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الدورة</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="أدخل عنوان الدورة"
                    required
                    value={courseData.title}
                    onChange={handleCourseChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">وصف الدورة</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="أدخل وصفاً مفصلاً للدورة"
                    rows={4}
                    value={courseData.description}
                    onChange={handleCourseChange}
                  />
                </div>
                
                {userRole === 'admin' && (
                  <div className="space-y-2">
                    <Label htmlFor="instructor">المحاضر</Label>
                    <Select
                      value={courseData.instructor_id}
                      onValueChange={(value) => handleSelectChange('instructor_id', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المحاضر" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructors.map((instructor) => (
                          <SelectItem key={instructor.id} value={instructor.id.toString()}>
                            {instructor.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="level">مستوى الدورة</Label>
                  <Select
                    value={courseData.level}
                    onValueChange={(value) => handleSelectChange('level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مستوى الدورة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                      <SelectItem value="متوسط">متوسط</SelectItem>
                      <SelectItem value="متقدم">متقدم</SelectItem>
                      <SelectItem value="محترف">محترف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">مدة الدورة</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="مثال: 8 أسابيع، 24 ساعة"
                    value={courseData.duration}
                    onChange={handleCourseChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">سعر الدورة</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    placeholder="أدخل سعر الدورة"
                    value={courseData.price}
                    onChange={handleCourseChange}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    id="is_published"
                    name="is_published"
                    type="checkbox"
                    className="ml-2"
                    checked={courseData.is_published}
                    onChange={handleCourseChange}
                  />
                  <Label htmlFor="is_published">نشر الدورة</Label>
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {success && (
                  <Alert variant="success" className="bg-green-50 text-green-800 border-green-200">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
              </div>
              
              <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                {isLoading ? 'جاري إنشاء الدورة...' : 'إنشاء الدورة'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* قائمة الدورات الحالية */}
        <Card>
          <CardHeader>
            <CardTitle>الدورات الحالية</CardTitle>
            <CardDescription>قائمة بالدورات التدريبية المتاحة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.length === 0 ? (
                <p className="text-center text-muted-foreground">لا توجد دورات متاحة حالياً</p>
              ) : (
                courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {course.level}
                            </span>
                            {course.duration && (
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                {course.duration}
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              course.is_published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {course.is_published ? 'منشورة' : 'غير منشورة'}
                            </span>
                          </div>
                        </div>
                        <div className="text-left">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push(`/courses/${course.id}`)}
                          >
                            عرض
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={loadCourses}>
              تحديث القائمة
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
