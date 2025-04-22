'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  BookOpen, 
  Users, 
  Calendar, 
  GraduationCap, 
  Building, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { Sidebar } from '@/components/ui/sidebar'

// بيانات وهمية للدورات المميزة
const featuredCourses = [
  {
    id: 1,
    title: 'أساسيات البرمجة بلغة بايثون',
    instructor: 'د. أحمد محمد',
    level: 'مبتدئ',
    duration: '8 أسابيع',
    enrollments: 1250,
    rating: 4.8,
    image: '/placeholder-course-1.jpg'
  },
  {
    id: 2,
    title: 'إدارة المشاريع الاحترافية',
    instructor: 'م. سارة أحمد',
    level: 'متوسط',
    duration: '6 أسابيع',
    enrollments: 980,
    rating: 4.7,
    image: '/placeholder-course-2.jpg'
  },
  {
    id: 3,
    title: 'تطوير تطبيقات الويب المتقدمة',
    instructor: 'م. خالد العلي',
    level: 'متقدم',
    duration: '10 أسابيع',
    enrollments: 750,
    rating: 4.9,
    image: '/placeholder-course-3.jpg'
  },
  {
    id: 4,
    title: 'أساسيات التسويق الرقمي',
    instructor: 'أ. نورة السالم',
    level: 'مبتدئ',
    duration: '4 أسابيع',
    enrollments: 1500,
    rating: 4.6,
    image: '/placeholder-course-4.jpg'
  }
]

// بيانات وهمية للتصنيفات
const categories = [
  { id: 1, name: 'تقنية المعلومات', count: 120 },
  { id: 2, name: 'إدارة الأعمال', count: 85 },
  { id: 3, name: 'التسويق الرقمي', count: 64 },
  { id: 4, name: 'التصميم الجرافيكي', count: 42 },
  { id: 5, name: 'اللغات', count: 38 },
  { id: 6, name: 'المهارات الشخصية', count: 56 }
]

export default function Home() {
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
            <Button variant="ghost" className="w-full justify-start">
              <GraduationCap className="ml-2 h-4 w-4" />
              المسارات التعليمية
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Building className="ml-2 h-4 w-4" />
              مواقع التدريب
            </Button>
          </div>
        </div>
      </Sidebar>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6">
        {/* قسم البحث */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">ابحث عن دورتك المثالية</h1>
          <div className="flex gap-2">
            <Input 
              placeholder="ابحث عن دورة، محاضر، أو موضوع..." 
              className="flex-1"
            />
            <Button>
              <Search className="ml-2 h-4 w-4" />
              بحث
            </Button>
          </div>
        </div>

        {/* تبويبات التصنيفات */}
        <Tabs defaultValue="featured" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="featured">الدورات المميزة</TabsTrigger>
            <TabsTrigger value="newest">أحدث الدورات</TabsTrigger>
            <TabsTrigger value="popular">الأكثر شعبية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="space-y-4">
            {/* عرض الدورات المميزة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                    <div className="flex justify-between text-sm">
                      <span>{course.level}</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full">عرض التفاصيل</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* أزرار التنقل */}
            <div className="flex justify-center mt-6">
              <Button variant="outline" size="icon" className="ml-2">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="newest">
            <div className="text-center py-8">
              <p className="text-muted-foreground">سيتم عرض أحدث الدورات هنا</p>
            </div>
          </TabsContent>
          
          <TabsContent value="popular">
            <div className="text-center py-8">
              <p className="text-muted-foreground">سيتم عرض الدورات الأكثر شعبية هنا</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* قسم التصنيفات */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">تصفح حسب التصنيف</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="p-4 text-center hover:bg-accent cursor-pointer">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} دورة</p>
              </Card>
            ))}
          </div>
        </div>

        {/* قسم المسارات التعليمية */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">المسارات التعليمية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">مسار مطور الويب الشامل</h3>
              <p className="text-muted-foreground mb-4">تعلم تطوير الويب من الصفر حتى الاحتراف من خلال 5 دورات متسلسلة</p>
              <Button>استكشاف المسار</Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">مسار محترف إدارة المشاريع</h3>
              <p className="text-muted-foreground mb-4">أتقن مهارات إدارة المشاريع واحصل على شهادات معتمدة من خلال 4 دورات</p>
              <Button>استكشاف المسار</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
