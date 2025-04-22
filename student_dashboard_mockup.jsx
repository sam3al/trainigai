// صورة توضيحية للوحة تحكم المتدرب
const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 rtl">
      {/* القائمة الجانبية */}
      <div className="w-64 bg-blue-900 text-white">
        <div className="p-4 border-b border-blue-800">
          <h2 className="text-xl font-bold">منصة التدريب الوظيفي</h2>
          <p className="text-sm text-blue-300">لوحة تحكم المتدرب</p>
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
              <span className="font-medium">محمد أحمد</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </header>
        
        {/* المحتوى */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">مرحباً بك، محمد!</h1>
          
          {/* ملخص التقدم */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-500 mb-4">ملخص التقدم</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>الدورات المسجلة</span>
                  <span className="font-bold">5</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>الدورات المكتملة</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>الاختبارات المجتازة</span>
                  <span className="font-bold">8/12</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{width: '66%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* الدورات الجارية */}
          <h2 className="text-xl font-bold mb-4">الدورات الجارية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'تطوير تطبيقات الويب باستخدام React.js', instructor: 'د. أحمد محمد', progress: 75 },
              { title: 'أساسيات علم البيانات', instructor: 'د. سمير علي', progress: 45 },
              { title: 'الذكاء الاصطناعي للمبتدئين', instructor: 'د. ليلى حسن', progress: 20 },
            ].map((course, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{course.instructor}</p>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">التقدم</span>
                    <span className="text-sm font-bold">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{width: `${course.progress}%`}}></div>
                  </div>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 text-sm">متابعة التعلم</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* الاختبارات القادمة */}
          <h2 className="text-xl font-bold mb-4">الاختبارات القادمة</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-right py-3 px-4 font-medium">عنوان الاختبار</th>
                  <th className="text-right py-3 px-4 font-medium">الدورة</th>
                  <th className="text-right py-3 px-4 font-medium">التاريخ</th>
                  <th className="text-right py-3 px-4 font-medium">المدة</th>
                  <th className="text-right py-3 px-4 font-medium">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { title: 'اختبار منتصف الفصل', course: 'تطوير تطبيقات الويب', date: '2025/04/15', duration: '60 دقيقة' },
                  { title: 'اختبار الوحدة الثالثة', course: 'أساسيات علم البيانات', date: '2025/04/18', duration: '45 دقيقة' },
                  { title: 'الاختبار النهائي', course: 'الذكاء الاصطناعي للمبتدئين', date: '2025/04/25', duration: '90 دقيقة' },
                ].map((exam, i) => (
                  <tr key={i}>
                    <td className="py-3 px-4">{exam.title}</td>
                    <td className="py-3 px-4">{exam.course}</td>
                    <td className="py-3 px-4">{exam.date}</td>
                    <td className="py-3 px-4">{exam.duration}</td>
                    <td className="py-3 px-4">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">استعراض</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* الشهادات */}
          <h2 className="text-xl font-bold mb-4">الشهادات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'أساسيات البرمجة بلغة Python', date: '2025/03/10', instructor: 'د. أحمد محمد' },
              { title: 'مقدمة في تطوير تطبيقات الويب', date: '2025/02/15', instructor: 'د. سمير علي' },
            ].map((certificate, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold mb-1">{certificate.title}</h3>
                  <p className="text-gray-500 text-sm">تاريخ الإصدار: {certificate.date}</p>
                  <p className="text-gray-500 text-sm">المحاضر: {certificate.instructor}</p>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">عرض</button>
                  <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg text-sm">تنزيل</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
