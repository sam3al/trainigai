// صورة توضيحية للوحة تحكم المحاضر
const InstructorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 rtl">
      {/* القائمة الجانبية */}
      <div className="w-64 bg-blue-900 text-white">
        <div className="p-4 border-b border-blue-800">
          <h2 className="text-xl font-bold">منصة التدريب الوظيفي</h2>
          <p className="text-sm text-blue-300">لوحة تحكم المحاضر</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li className="bg-blue-800 rounded-lg">
              <a href="#" className="block px-4 py-2">الرئيسية</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">دوراتي</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">المتدربين</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">الاختبارات</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">الشهادات</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">الجدول الزمني</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">الإعدادات</a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        {/* الشريط العلوي */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="text-gray-500">
              <span>🔍</span>
            </button>
            <input type="text" placeholder="بحث..." className="border rounded-lg px-3 py-1" />
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="text-gray-500">
              <span>🔔</span>
            </button>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="font-medium">د. أحمد محمد</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </header>
        
        {/* المحتوى */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">مرحباً بك، د. أحمد!</h1>
          
          {/* ملخص الإحصائيات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">الدورات</h3>
                <span className="text-purple-500 text-2xl">📚</span>
              </div>
              <p className="text-3xl font-bold">8</p>
              <p className="text-green-500 text-sm mt-2">+2 من الشهر الماضي</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">المتدربين</h3>
                <span className="text-blue-500 text-2xl">👨‍🎓</span>
              </div>
              <p className="text-3xl font-bold">245</p>
              <p className="text-green-500 text-sm mt-2">+18 من الشهر الماضي</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">الاختبارات</h3>
                <span className="text-yellow-500 text-2xl">📝</span>
              </div>
              <p className="text-3xl font-bold">24</p>
              <p className="text-green-500 text-sm mt-2">+5 من الشهر الماضي</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">التقييم</h3>
                <span className="text-yellow-500 text-2xl">⭐</span>
              </div>
              <p className="text-3xl font-bold">4.8/5</p>
              <p className="text-green-500 text-sm mt-2">+0.2 من الشهر الماضي</p>
            </div>
          </div>
          
          {/* الدورات */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">دوراتي</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">إنشاء دورة جديدة</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4 font-medium">عنوان الدورة</th>
                  <th className="text-right py-3 px-4 font-medium">المستوى</th>
                  <th className="text-right py-3 px-4 font-medium">المتدربين</th>
                  <th className="text-right py-3 px-4 font-medium">التقييم</th>
                  <th className="text-right py-3 px-4 font-medium">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { title: 'أساسيات البرمجة بلغة Python', level: 'مبتدئ', students: 85, rating: 4.9, status: 'نشط' },
                  { title: 'تطوير تطبيقات الويب باستخدام React.js', level: 'متوسط', students: 64, rating: 4.7, status: 'نشط' },
                  { title: 'الذكاء الاصطناعي للمبتدئين', level: 'مبتدئ', students: 42, rating: 4.8, status: 'نشط' },
                  { title: 'تطوير تطبيقات الهاتف باستخدام Flutter', level: 'متقدم', students: 38, rating: 4.6, status: 'نشط' },
                  { title: 'قواعد البيانات المتقدمة', level: 'متقدم', students: 16, rating: 4.5, status: 'قادم' },
                ].map((course, i) => (
                  <tr key={i}>
                    <td className="py-3 px-4">{course.title}</td>
                    <td className="py-3 px-4">{course.level}</td>
                    <td className="py-3 px-4">{course.students}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="ml-1">{course.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${course.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="text-blue-500">تعديل</button>
                        <button className="text-gray-500">عرض</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* المتدربين النشطين */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">المتدربين النشطين</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-3 px-4 font-medium">اسم المتدرب</th>
                    <th className="text-right py-3 px-4 font-medium">الدورة</th>
                    <th className="text-right py-3 px-4 font-medium">التقدم</th>
                    <th className="text-right py-3 px-4 font-medium">آخر نشاط</th>
                    <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { name: 'محمد أحمد', course: 'أساسيات البرمجة بلغة Python', progress: 85, lastActivity: 'منذ ساعة' },
                    { name: 'سارة علي', course: 'تطوير تطبيقات الويب باستخدام React.js', progress: 64, lastActivity: 'منذ 3 ساعات' },
                    { name: 'خالد محمود', course: 'الذكاء الاصطناعي للمبتدئين', progress: 42, lastActivity: 'منذ يوم' },
                    { name: 'فاطمة حسن', course: 'تطوير تطبيقات الهاتف باستخدام Flutter', progress: 38, lastActivity: 'منذ يومين' },
                    { name: 'أحمد سمير', course: 'أساسيات البرمجة بلغة Python', progress: 92, lastActivity: 'منذ 5 ساعات' },
                  ].map((student, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4">{student.name}</td>
                      <td className="py-3 px-4">{student.course}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 ml-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: `${student.progress}%`}}></div>
                          </div>
                          <span>{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{student.lastActivity}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-500">عرض التفاصيل</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* الاختبارات القادمة */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">الاختبارات القادمة</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">إنشاء اختبار جديد</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4 font-medium">عنوان الاختبار</th>
                  <th className="text-right py-3 px-4 font-medium">الدورة</th>
                  <th className="text-right py-3 px-4 font-medium">التاريخ</th>
                  <th className="text-right py-3 px-4 font-medium">المدة</th>
                  <th className="text-right py-3 px-4 font-medium">المتدربين</th>
                  <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { title: 'اختبار منتصف الفصل', course: 'أساسيات البرمجة بلغة Python', date: '2025/04/15', duration: '60 دقيقة', students: 85 },
                  { title: 'اختبار الوحدة الرابعة', course: 'تطوير تطبيقات الويب باستخدام React.js', date: '2025/04/18', duration: '45 دقيقة', students: 64 },
                  { title: 'الاختبار النهائي', course: 'الذكاء الاصطناعي للمبتدئين', date: '2025/04/25', duration: '90 دقيقة', students: 42 },
                ].map((exam, i) => (
                  <tr key={i}>
                    <td className="py-3 px-4">{exam.title}</td>
                    <td className="py-3 px-4">{exam.course}</td>
                    <td className="py-3 px-4">{exam.date}</td>
                    <td className="py-3 px-4">{exam.duration}</td>
                    <td className="py-3 px-4">{exam.students}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="text-blue-500">تعديل</button>
                        <button className="text-gray-500">عرض</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboard;
