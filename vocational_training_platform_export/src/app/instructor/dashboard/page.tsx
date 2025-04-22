'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Settings, 
  Bell,
  User,
  LogOut,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Video,
  CheckCircle,
  Clock
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
    students: 1250,
    rating: 4.8,
    status: 'نشط',
    lastUpdated: '10 أبريل 2025'
  },
  {
    id: 2,
    title: 'تطوير تطبيقات الويب المتقدمة',
    students: 750,
    rating: 4.9,
    status: 'نشط',
    lastUpdated: '5 أبريل 2025'
  }
]

// بيانات وهمية للمتدربين
const students = [
  {
    id: 1,
    name: 'محمد أحمد',
    email: 'mohammed@example.com',
    progress: 75,
    lastActive: '12 أبريل 2025'
  },
  {
    id: 2,
    name: 'سارة علي',
    email: 'sara@example.com',
    progress: 90,
    lastActive: '11 أبريل 2025'
  },
  {
    id: 3,
    name: 'خالد محمود',
    email: 'khaled@example.com',
    progress: 60,
    lastActive: '10 أبريل 2025'
  },
  {
    id: 4,
    name: 'فاطمة عمر',
    email: 'fatima@example.com',
    progress: 30,
    lastActive: '9 أبريل 2025'
  }
]

// بيانات وهمية للمواد التعليمية
const materials = [
  {
    id: 1,
    title: 'مقدمة في البرمجة ولغة بايثون',
    type: 'فيديو',
    course: 'أساسيات البرمجة بلغة بايثون',
    uploadDate: '1 أبريل 2025'
  },
  {
    id: 2,
    title: 'المتغيرات وأنواع البيانات',
    type: 'فيديو',
    course: 'أساسيات البرمجة بلغة بايثون',
    uploadDate: '3 أبريل 2025'
  },
  {
    id: 3,
    title: 'اختبار المفاهيم الأساسية',
    type: 'اختبار',
    course: 'أساسيات البرمجة بلغة بايثون',
    uploadDate: '5 أبريل 2025'
  },
  {
    id: 4,
    title: 'تطوير واجهات المستخدم',
    type: 'فيديو',
    course: 'تطوير تطبيقات الويب المتقدمة',
    uploadDate: '2 أبريل 2025'
  }
]

export default function InstructorDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* الشريط الجانبي */}
      <Sidebar className="hidden md:flex">
        <div className="py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold">لوحة تحكم المحاضر</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="ml-2 h-4 w-4" />
              دوراتي
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="ml-2 h-4 w-4" />
              المتدربون
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="ml-2 h-4 w-4" />
              المواد التعليمية
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
            <h1 className="text-lg font-semibold">لوحة تحكم المحاضر</h1>
            <div className="flex-1"></div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-instructor.jpg" alt="المحاضر" />
                    <AvatarFallback>أح</AvatarFallback>
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
          {/* ترحيب */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">مرحباً، د. أحمد!</h2>
            <p className="text-muted-foreground">لديك دورتان نشطتان و 1250 متدرب.</p>
          </div>

          {/* بطاقات الإحصائيات */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الدورات النشطة</p>
                  <h3 className="text-2xl font-bold">2</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المتدربين</p>
                  <h3 className="text-2xl font-bold">1,250</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط التقييم</p>
                  <h3 className="text-2xl font-bold">4.8</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ساعات التدريس</p>
                  <h3 className="text-2xl font-bold">124</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* تبويبات المحتوى */}
          <Tabs defaultValue="courses" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="courses">الدورات</TabsTrigger>
              <TabsTrigger value="students">المتدربون</TabsTrigger>
              <TabsTrigger value="materials">المواد التعليمية</TabsTrigger>
              <TabsTrigger value="schedule">الجدول الزمني</TabsTrigger>
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
                          <TableCell>{course.students}</TableCell>
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
                                <DropdownMenuItem>إضافة محتوى</DropdownMenuItem>
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
                  <h3 className="text-lg font-semibold">المتدربون</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="بحث..." className="pr-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>اسم المتدرب</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
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
                                <DropdownMenuItem>عرض التقدم</DropdownMenuItem>
                                <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                                <DropdownMenuItem>تقييم</DropdownMenuItem>
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
            
            <TabsContent value="materials">
              <Card>
                <div className="p-4 flex justify-between items-center border-b">
                  <h3 className="text-lg font-semibold">المواد التعليمية</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="بحث..." className="pr-8" />
                    </div>
                    <Button>
                      <Plus className="ml-2 h-4 w-4" />
                      إضافة مادة تعليمية
                    </Button>
                  </div>
                </div>
                <div className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>عنوان المادة</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الدورة</TableHead>
                        <TableHead>تاريخ الرفع</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell className="font-medium">{material.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {material.type === 'فيديو' && <Video className="ml-2 h-4 w-4 text-blue-500" />}
                              {material.type === 'اختبار' && <FileText className="ml-2 h-4 w-4 text-amber-500" />}
                              <span>{material.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{material.course}</TableCell>
                          <TableCell>{material.uploadDate}</TableCell>
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
            
            <TabsContent value="schedule">
              <Card>
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">الجدول الزمني</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">اليوم: الأحد، 13 أبريل 2025</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                          <div>
                            <p className="font-medium">أساسيات البرمجة بلغة بايثون</p>
                            <p className="text-sm text-muted-foreground">المتغيرات وأنواع البيانات</p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm">10:00 صباحاً - 12:00 ظهراً</p>
                            <p className="text-sm text-muted-foreground">قاعة التدريب الرئيسية</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">اليوم: الثلاثاء، 15 أبريل 2025</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                          <div>
                            <p className="font-medium">تطوير تطبيقات الويب المتقدمة</p>
                            <p className="text-sm text-muted-foreground">تطوير واجهات المستخدم</p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm">2:00 مساءً - 4:00 مساءً</p>
                            <p className="text-sm text-muted-foreground">منصة التدريب الافتراضية</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
