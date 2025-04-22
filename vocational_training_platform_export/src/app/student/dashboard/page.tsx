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
  CheckCircle,
  Clock,
  FileText,
  Award,
  BookMarked
} from 'lucide-react'
import { Sidebar } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// بيانات وهمية للدورات المسجلة
const enrolledCourses = [
  {
    id: 1,
    title: 'أساسيات البرمجة بلغة بايثون',
    instructor: 'د. أحمد محمد',
    progress: 75,
    nextLesson: 'حلقات التكرار for و while',
    nextLessonDate: '15 أبريل 2025، 10:00 صباحاً'
  },
  {
    id: 2,
    title: 'إدارة المشاريع الاحترافية',
    instructor: 'م. سارة أحمد',
    progress: 40,
    nextLesson: 'إدارة المخاطر في المشاريع',
    nextLessonDate: '16 أبريل 2025، 2:00 مساءً'
  },
  {
    id: 3,
    title: 'أساسيات التسويق الرقمي',
    instructor: 'أ. نورة السالم',
    progress: 90,
    nextLesson: 'استراتيجيات السوشيال ميديا',
    nextLessonDate: '14 أبريل 2025، 4:00 مساءً'
  }
]

// بيانات وهمية للاختبارات القادمة
const upcomingQuizzes = [
  {
    id: 1,
    title: 'اختبار هياكل التحكم في البرمجة',
    course: 'أساسيات البرمجة بلغة بايثون',
    date: '18 أبريل 2025',
    duration: '30 دقيقة'
  },
  {
    id: 2,
    title: 'اختبار إدارة المخاطر',
    course: 'إدارة المشاريع الاحترافية',
    date: '20 أبريل 2025',
    duration: '45 دقيقة'
  }
]

// بيانات وهمية للشهادات
const certificates = [
  {
    id: 1,
    title: 'مقدمة في تطوير الويب',
    issueDate: '1 مارس 2025',
    grade: 'ممتاز'
  }
]

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* الشريط الجانبي */}
      <Sidebar className="hidden md:flex">
        <div className="py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold">لوحة تحكم المتدرب</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="ml-2 h-4 w-4" />
              دوراتي
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="ml-2 h-4 w-4" />
              الجدول الزمني
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="ml-2 h-4 w-4" />
              الاختبارات
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Award className="ml-2 h-4 w-4" />
              الشهادات
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
            <h1 className="text-lg font-semibold">لوحة تحكم المتدرب</h1>
            <div className="flex-1"></div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="المستخدم" />
                    <AvatarFallback>مح</AvatarFallback>
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
            <h2 className="text-2xl font-bold mb-2">مرحباً، محمد!</h2>
            <p className="text-muted-foreground">استمر في التعلم. لديك 3 دورات نشطة حالياً.</p>
          </div>

          {/* بطاقات الإحصائيات */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الدورات المسجلة</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الدورات المكتملة</p>
                  <h3 className="text-2xl font-bold">1</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ساعات التعلم</p>
                  <h3 className="text-2xl font-bold">42</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الشهادات</p>
                  <h3 className="text-2xl font-bold">1</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* الدورات المسجلة */}
          <h2 className="text-xl font-semibold mb-4">دوراتي</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video bg-muted"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>التقدم</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="text-sm mb-4">
                    <p className="font-medium">الدرس القادم:</p>
                    <p className="text-muted-foreground">{course.nextLesson}</p>
                    <p className="text-muted-foreground">{course.nextLessonDate}</p>
                  </div>
                  <Button className="w-full">متابعة التعلم</Button>
                </div>
              </Card>
            ))}
          </div>

          {/* تبويبات المحتوى */}
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">الاختبارات القادمة</TabsTrigger>
              <TabsTrigger value="certificates">الشهادات</TabsTrigger>
              <TabsTrigger value="recommended">دورات موصى بها</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <Card>
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">الاختبارات القادمة</h3>
                </div>
                <div className="p-4">
                  {upcomingQuizzes.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingQuizzes.map((quiz) => (
                        <div key={quiz.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <h4 className="font-medium">{quiz.title}</h4>
                            <p className="text-sm text-muted-foreground">{quiz.course}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm">{quiz.date}</p>
                            <p className="text-sm text-muted-foreground">{quiz.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">لا توجد اختبارات قادمة</p>
                  )}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="certificates">
              <Card>
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">الشهادات</h3>
                </div>
                <div className="p-4">
                  {certificates.length > 0 ? (
                    <div className="space-y-4">
                      {certificates.map((certificate) => (
                        <div key={certificate.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <h4 className="font-medium">{certificate.title}</h4>
                            <p className="text-sm text-muted-foreground">تاريخ الإصدار: {certificate.issueDate}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm">التقدير: {certificate.grade}</p>
                            <Button variant="outline" size="sm" className="mt-2">تحميل الشهادة</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">لا توجد شهادات</p>
                  )}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommended">
              <Card>
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">دورات موصى بها</h3>
                </div>
                <div className="p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex border rounded-md p-3">
                      <div className="w-16 h-16 bg-muted rounded-md shrink-0 ml-3"></div>
                      <div>
                        <h4 className="font-medium">تطوير تطبيقات الويب المتقدمة</h4>
                        <p className="text-sm text-muted-foreground mb-2">م. خالد العلي</p>
                        <Button variant="outline" size="sm">عرض التفاصيل</Button>
                      </div>
                    </div>
                    <div className="flex border rounded-md p-3">
                      <div className="w-16 h-16 bg-muted rounded-md shrink-0 ml-3"></div>
                      <div>
                        <h4 className="font-medium">تحليل البيانات باستخدام بايثون</h4>
                        <p className="text-sm text-muted-foreground mb-2">د. فاطمة الزهراء</p>
                        <Button variant="outline" size="sm">عرض التفاصيل</Button>
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
