'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  CheckCircle,
  FileText,
  Video
} from 'lucide-react'
import { Sidebar } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { Progress } from '@/components/ui/progress'

// بيانات وهمية للدورة
const courseData = {
  id: 1,
  title: 'أساسيات البرمجة بلغة بايثون',
  instructor: 'د. أحمد محمد',
  level: 'مبتدئ',
  duration: '8 أسابيع',
  enrollments: 1250,
  rating: 4.8,
  description: 'دورة شاملة في أساسيات البرمجة باستخدام لغة بايثون. تبدأ من الصفر وتنتهي بتطوير تطبيقات بسيطة. مناسبة للمبتدئين الذين ليس لديهم خبرة سابقة في البرمجة.',
  objectives: [
    'فهم المفاهيم الأساسية للبرمجة',
    'إتقان أساسيات لغة بايثون',
    'تطوير تطبيقات بسيطة باستخدام بايثون',
    'حل المشكلات البرمجية بكفاءة'
  ],
  requirements: [
    'لا يشترط خبرة سابقة في البرمجة',
    'جهاز كمبيوتر مع نظام تشغيل حديث',
    'اتصال بالإنترنت للوصول إلى المواد التعليمية'
  ],
  modules: [
    {
      id: 1,
      title: 'مقدمة في البرمجة ولغة بايثون',
      lessons: [
        { id: 1, title: 'مفاهيم البرمجة الأساسية', duration: '45 دقيقة', type: 'video' },
        { id: 2, title: 'تثبيت بايثون وبيئة التطوير', duration: '30 دقيقة', type: 'video' },
        { id: 3, title: 'أول برنامج بايثون', duration: '60 دقيقة', type: 'video' },
        { id: 4, title: 'اختبار قصير: المفاهيم الأساسية', duration: '15 دقيقة', type: 'quiz' }
      ]
    },
    {
      id: 2,
      title: 'المتغيرات وأنواع البيانات',
      lessons: [
        { id: 5, title: 'المتغيرات وتعريفها', duration: '40 دقيقة', type: 'video' },
        { id: 6, title: 'أنواع البيانات الأساسية', duration: '50 دقيقة', type: 'video' },
        { id: 7, title: 'العمليات الحسابية والمنطقية', duration: '55 دقيقة', type: 'video' },
        { id: 8, title: 'تمارين عملية: المتغيرات والعمليات', duration: '60 دقيقة', type: 'exercise' }
      ]
    },
    {
      id: 3,
      title: 'هياكل التحكم في البرمجة',
      lessons: [
        { id: 9, title: 'جمل الشرط if-else', duration: '45 دقيقة', type: 'video' },
        { id: 10, title: 'حلقات التكرار for و while', duration: '60 دقيقة', type: 'video' },
        { id: 11, title: 'تمارين عملية: هياكل التحكم', duration: '90 دقيقة', type: 'exercise' },
        { id: 12, title: 'اختبار نصفي', duration: '30 دقيقة', type: 'quiz' }
      ]
    }
  ]
}

export default function CoursePage() {
  return (
    <div className="flex min-h-screen">
      {/* الشريط الجانبي */}
      <Sidebar className="hidden md:flex">
        <div className="py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold">منصة التدريب الوظيفي</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="ml-2 h-4 w-4" />
              الدورات
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="ml-2 h-4 w-4" />
              المحاضرون
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="ml-2 h-4 w-4" />
              الجدول الزمني
            </Button>
          </div>
        </div>
      </Sidebar>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6">
        {/* شريط التنقل */}
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/courses">الدورات</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{courseData.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* معلومات الدورة */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <Users className="ml-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{courseData.enrollments} متدرب</span>
              </div>
              <div className="flex items-center">
                <Star className="ml-1 h-4 w-4 text-amber-500" />
                <span className="text-sm text-muted-foreground">{courseData.rating} تقييم</span>
              </div>
              <div className="flex items-center">
                <Clock className="ml-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{courseData.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="ml-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{courseData.level}</span>
              </div>
            </div>
            
            <p className="mb-6">{courseData.description}</p>
            
            <h2 className="text-xl font-semibold mb-3">أهداف الدورة</h2>
            <ul className="space-y-2 mb-6">
              {courseData.objectives.map((objective, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="ml-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
            
            <h2 className="text-xl font-semibold mb-3">المتطلبات</h2>
            <ul className="space-y-2 mb-6">
              {courseData.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="ml-2 h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <Card className="p-6">
              <div className="aspect-video bg-muted mb-4 rounded-md"></div>
              <h3 className="text-xl font-semibold mb-4">التسجيل في الدورة</h3>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>المقاعد المتاحة</span>
                  <span>23/50</span>
                </div>
                <Progress value={46} className="h-2" />
              </div>
              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span>تاريخ البدء</span>
                  <span>15 مايو 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>المحاضر</span>
                  <span>{courseData.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span>نوع التدريب</span>
                  <span>افتراضي + واقعي</span>
                </div>
              </div>
              <Button className="w-full mb-2">التسجيل في الدورة</Button>
              <Button variant="outline" className="w-full">إضافة إلى المفضلة</Button>
            </Card>
          </div>
        </div>

        {/* محتوى الدورة */}
        <h2 className="text-2xl font-semibold mb-4">محتوى الدورة</h2>
        <div className="space-y-4 mb-8">
          {courseData.modules.map((module) => (
            <Card key={module.id} className="p-4">
              <h3 className="text-lg font-medium mb-3">{module.title}</h3>
              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                    <div className="flex items-center">
                      {lesson.type === 'video' && <Video className="ml-2 h-4 w-4 text-blue-500" />}
                      {lesson.type === 'quiz' && <FileText className="ml-2 h-4 w-4 text-amber-500" />}
                      {lesson.type === 'exercise' && <CheckCircle className="ml-2 h-4 w-4 text-green-500" />}
                      <span>{lesson.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* التنقل بين الدورات */}
        <div className="flex justify-between">
          <Button variant="outline" className="flex items-center">
            <ChevronRight className="ml-2 h-4 w-4" />
            الدورة السابقة
          </Button>
          <Button variant="outline" className="flex items-center">
            الدورة التالية
            <ChevronLeft className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
