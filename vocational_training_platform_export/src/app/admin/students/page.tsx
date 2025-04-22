'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { getStudents, getStudentById, updateEnrollmentStatus } from '@/app/api/students/students'
import { checkAuthStatus } from '@/app/api/auth/auth'
import { useRouter } from 'next/navigation'

export default function StudentManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [userRole, setUserRole] = useState('')
  
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
        
        // استرجاع قائمة المتدربين
        loadStudents()
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/auth')
      }
    }
    
    checkAuth()
  }, [router])
  
  // استرجاع قائمة المتدربين
  const loadStudents = async () => {
    setIsLoading(true)
    try {
      const result = await getStudents()
      if (result.success) {
        setStudents(result.students)
      } else {
        setError(result.error || 'فشل في استرجاع بيانات المتدربين')
      }
    } catch (error) {
      console.error('Error loading students:', error)
      setError('حدث خطأ أثناء استرجاع بيانات المتدربين')
    } finally {
      setIsLoading(false)
    }
  }
  
  // معالجة تغيير حقل البحث
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  
  // تصفية المتدربين حسب مصطلح البحث
  const filteredStudents = students.filter(student => 
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // معالجة عرض تفاصيل المتدرب
  const handleViewStudent = (studentId) => {
    router.push(`/admin/students/${studentId}`)
  }
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">إدارة المتدربين</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>المتدربون</CardTitle>
          <CardDescription>قائمة بالمتدربين المسجلين في المنصة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">بحث</Label>
            <Input
              id="search"
              placeholder="ابحث بالاسم أو البريد الإلكتروني"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert variant="success" className="mb-4 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="text-center py-4">جاري تحميل البيانات...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              {searchTerm ? 'لا توجد نتائج مطابقة لبحثك' : 'لا يوجد متدربون مسجلون حالياً'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>الدورات المسجلة</TableHead>
                  <TableHead>آخر نشاط</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.enrolled_courses_count || 0}</TableCell>
                    <TableCell>{student.last_activity ? new Date(student.last_activity).toLocaleDateString('ar-SA') : 'لا يوجد'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.is_active ? 'نشط' : 'غير نشط'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewStudent(student.id)}
                      >
                        عرض التفاصيل
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={loadStudents} disabled={isLoading}>
            تحديث القائمة
          </Button>
        </CardFooter>
      </Card>
      
      {userRole === 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات المتدربين</CardTitle>
            <CardDescription>نظرة عامة على أداء المتدربين في المنصة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">إجمالي المتدربين</h3>
                  <p className="text-3xl font-bold mt-2">{students.length}</p>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">المتدربون النشطون</h3>
                  <p className="text-3xl font-bold mt-2">
                    {students.filter(s => s.is_active).length}
                  </p>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">متوسط الدورات لكل متدرب</h3>
                  <p className="text-3xl font-bold mt-2">
                    {students.length > 0 
                      ? (students.reduce((sum, s) => sum + (s.enrolled_courses_count || 0), 0) / students.length).toFixed(1)
                      : '0'}
                  </p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
