// صورة توضيحية لصفحة تفاصيل الدورة
const CourseDetails = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 rtl">
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">منصة التدريب الوظيفي</h1>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="font-medium">محمد أحمد</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* صورة الدورة */}
          <div className="h-64 bg-gradient-to-r from-blue-400 to-indigo-400 relative">
            <div className="absolute bottom-0 right-0 bg-blue-900 text-white px-4 py-2 m-4 rounded-lg">
              مستوى: متوسط
            </div>
          </div>
          
          {/* معلومات الدورة */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">تطوير تطبيقات الويب باستخدام React.js</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="ml-4">المحاضر: د. أحمد محمد</span>
                  <span className="ml-4">المدة: 12 أسبوع</span>
                  <span className="flex items-center">
                    <span className="ml-1">4.8</span>
                    <span className="text-yellow-500">★</span>
                    <span className="text-gray-500">(120 تقييم)</span>
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1200 ريال</div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 w-full mb-2">
                  التسجيل في الدورة
                </button>
                <p className="text-sm text-gray-500">ضمان استرداد المال خلال 30 يوم</p>
              </div>
            </div>
            
            {/* وصف الدورة */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">وصف الدورة</h2>
              <p className="text-gray-700 leading-relaxed">
                تعلم كيفية بناء تطبيقات ويب تفاعلية وحديثة باستخدام مكتبة React.js، أحد أشهر مكتبات JavaScript لبناء واجهات المستخدم. ستتعلم في هذه الدورة المفاهيم الأساسية لـ React مثل المكونات، والحالة، والخصائص، ودورة حياة المكونات، بالإضافة إلى المفاهيم المتقدمة مثل استخدام Redux لإدارة حالة التطبيق، والتعامل مع واجهات برمجة التطبيقات (APIs)، وتطبيق أفضل الممارسات في تطوير تطبيقات الويب الحديثة.
              </p>
            </div>
            
            {/* ما ستتعلمه */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">ما ستتعلمه</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'أساسيات React.js وكيفية إنشاء المكونات',
                  'إدارة حالة التطبيق باستخدام Hooks',
                  'التعامل مع النماذج والمدخلات',
                  'إنشاء تطبيقات أحادية الصفحة (SPA)',
                  'استخدام Redux لإدارة حالة التطبيق',
                  'التعامل مع واجهات برمجة التطبيقات (APIs)',
                  'تطبيق أفضل الممارسات في هيكلة المشروع',
                  'نشر التطبيق على بيئة الإنتاج',
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-green-500 ml-2">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* المتطلبات */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">المتطلبات</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>معرفة أساسية بـ HTML, CSS, JavaScript</li>
                <li>فهم أساسيات البرمجة والمفاهيم الكائنية</li>
                <li>جهاز كمبيوتر مع متصفح حديث ومحرر نصوص</li>
                <li>الرغبة في التعلم وتطبيق المفاهيم الجديدة</li>
              </ul>
            </div>
            
            {/* محتوى الدورة */}
            <div>
              <h2 className="text-xl font-bold mb-4">محتوى الدورة</h2>
              <div className="border rounded-lg divide-y">
                {[
                  { title: 'مقدمة في React.js', lessons: 5, duration: '2:30:00' },
                  { title: 'إنشاء المكونات والتعامل معها', lessons: 8, duration: '4:15:00' },
                  { title: 'إدارة الحالة باستخدام Hooks', lessons: 6, duration: '3:45:00' },
                  { title: 'التعامل مع النماذج والمدخلات', lessons: 4, duration: '2:20:00' },
                  { title: 'إدارة حالة التطبيق باستخدام Redux', lessons: 7, duration: '5:10:00' },
                  { title: 'التعامل مع واجهات برمجة التطبيقات', lessons: 5, duration: '3:30:00' },
                  { title: 'تطبيق عملي: بناء متجر إلكتروني', lessons: 10, duration: '8:00:00' },
                  { title: 'نشر التطبيق على بيئة الإنتاج', lessons: 3, duration: '1:45:00' },
                ].map((section, i) => (
                  <div key={i} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{section.title}</h3>
                        <div className="text-sm text-gray-500">
                          {section.lessons} دروس • {section.duration}
                        </div>
                      </div>
                      <button className="text-blue-600">
                        <span>▼</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
