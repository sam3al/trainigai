'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Settings, 
  BarChart, 
  Bell,
  User,
  LogOut,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react'
import { Sidebar } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// بيانات وهمية للدورات
const courses = [
  {
    id: 1,
    title: 'أساسيات البرمجة بلغة بايثون',
    enrollments: 1250,
    rating: 4.8,
    status: 'نشط',
    lastUpdated: '10 أبريل 2025'
  },
  {
    id: 2,
    title: 'إدارة المشاريع الاحترافية',
    enrollments: 980,
    rating: 4.7,
    status: 'نشط',
    lastUpdated: '8 أبريل 2025'
  },
  {
    id: 3,
    title: 'تطوير تطبيقات الويب المتقدمة',
    enrollments: 750,
    rating: 4.9,
    status: 'مسودة',
    lastUpdated: '5 أبريل 2025'
  },
  {
    id: 4,
    title: 'أساسيات التسويق الرقمي',
    enrollments: 1500,
    rating: 4.6,
    status: 'نشط',
    lastUpdated: '2 أبريل 2025'
  }
]

// بيانات وهمية للمتدربين
const students = [
  {
    id: 1,
    name: 'محمد أحمد',
    email: 'mohammed@example.com',
    enrolledCourses: 3,
    progress: 75,
    lastActive: '12 أبريل 2025'
  },
  {
    id: 2,
    name: 'سارة علي',
    email: 'sara@example.com',
    enrolledCourses: 2,
    progress: 90,
    lastActive: '11 أبريل 2025'
  },
  {
    id: 3,
    name: 'خالد محمود',
    email: 'khaled@example.com',
    enrolledCourses: 4,
    progress: 60,
    lastActive: '10 أبريل 2025'
  },
  {
    id: 4,
    name: 'فاطمة عمر',
    email: 'fatima@example.com',
    enrolledCourses: 1,
    progress: 30,
    lastActive: '9 أبريل 2025'
  }
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* الشريط الجانبي */}
      <Sidebar className="hidden md:flex">
        <div className="py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold">لوحة تحكم المدير</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart className="ml-2 h-4 w-4" />
              لوحة المعلومات
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="ml-2 h-4 w-4" />
              الدورات
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="ml-2 h-4 w-4" />
              المتدربون
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="ml-2 h-4 w-4" />
              المحاضرون
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="ml-2 h-4 w-4" />
              الجدول الزمني
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="ml-2 h-4 w-4" />
              الإعدادات
            </Button>
          </div>
        </div>
      </Sidebar>

      {/* المحتوى الرئيسي */}
      <main className="flex-1">
        {/* شريط العنوان */}
        <header className="border-b">
          <div className="flex h-16 items-center px-4 gap-4">
            <h1 className="text-lg font-semibold">لوحة تحكم المدير</h1>
            <div className="flex-1"></div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="المستخدم" />
                    <AvatarFallback>مد</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="ml-2 h-4 w-4" />
                  <span>الملف الشخصي</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="ml-2 h-4 w-4" />
                  <span>الإعدادات</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="ml-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* المحتوى */}
        <div className="p-6">
          {/* بطاقات الإحصائيات */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الدورات</p>
                  <h3 className="text-2xl font-bold">124</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="text-green-500 ml-1">+12%</span>
                  <span>منذ الشهر الماضي</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المتدربين</p>
                  <h3 className="text-2xl font-bold">8,652</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="text-green-500 ml-1">+8%</span>
                  <span>منذ الشهر الماضي</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">معدل إكمال الدورات</p>
                  <h3 className="text-2xl font-bold">68%</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="text-green-500 ml-1">+5%</span>
                  <span>منذ الشهر الماضي</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط التقييم</p>
                  <h3 className="text-2xl font-bold">4.7</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="text-green-500 ml-1">+0.2</span>
                  <span>منذ الشهر الماضي</span>
                </div>
              </div>
            </Card>
          </div>

          {/* تبويبات المحتوى */}
          <Tabs defaultValue="courses" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="courses">الدورات</TabsTrigger>
              <TabsTrigger value="students">المتدربون</TabsTrigger>
              <TabsTrigger value="instructors">المحاضرون</TabsTrigger>
              <TabsTrigger value="venues">مواقع التدريب</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <Card>
                <div className="p-4 flex justify-between items-center border-b">
                  <h3 className="text-lg font-semibold">إدارة الدورات</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="بحث..." className="pr-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button>
                      <Plus className="ml-2 h-4 w-4" />
                      إضافة دورة
                    </Button>
                  </div>
                </div>
                <div className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>اسم الدورة</TableHead>
                        <TableHead>عدد المتدربين</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>آخر تحديث</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.enrollments}</TableCell>
                          <TableCell>{course.rating}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              course.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {course.status}
                            </span>
                          </TableCell>
                          <TableCell>{course.lastUpdated}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>عرض</DropdownMenuItem>
                                <DropdownMenuItem>تعديل</DropdownMenuItem>
                                <DropdownMenuItem>حذف</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="students">
              <Card>
                <div className="p-4 flex justify-between items-center border-b">
                  <h3 className="text-lg font-semibold">إدارة المتدربين</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="بحث..." className="pr-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button>
                      <Plus className="ml-2 h-4 w-4" />
                      إضافة متدرب
                    </Button>
                  </div>
                </div>
                <div className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>اسم المتدرب</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>الدورات المسجلة</TableHead>
                        <TableHead>التقدم</TableHead>
                        <TableHead>آخر نشاط</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.enrolledCourses}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={student.progress} className="h-2 w-20" />
                              <span className="text-xs">{student.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.lastActive}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>عرض</DropdownMenuItem>
                                <DropdownMenuItem>تعديل</DropdownMenuItem>
                                <DropdownMenuItem>حذف</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="instructors">
              <div className="text-center py-8">
                <p className="text-muted-foreground">سيتم عرض إدارة المحاضرين هنا</p>
              </div>
            </TabsContent>
            
            <TabsContent value="venues">
              <div className="text-center py-8">
                <p className="text-muted-foreground">سيتم عرض إدارة مواقع التدريب هنا</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
