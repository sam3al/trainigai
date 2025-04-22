// صورة توضيحية للوحة تحكم المدير
const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 rtl">
      {/* القائمة الجانبية */}
      <div className="w-64 bg-blue-900 text-white">
        <div className="p-4 border-b border-blue-800">
          <h2 className="text-xl font-bold">منصة التدريب الوظيفي</h2>
          <p className="text-sm text-blue-300">لوحة تحكم المدير</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li className="bg-blue-800 rounded-lg">
              <a href="#" className="block px-4 py-2">الرئيسية</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">الدورات التدريبية</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">المتدربين</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">المحاضرين</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">مواقع التدريب</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">الجداول الزمنية</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">التقارير</a>
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
              <span className="font-medium">أحمد المدير</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </header>
        
        {/* المحتوى */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">لوحة المعلومات</h1>
          
          {/* البطاقات الإحصائية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">المتدربين</h3>
                <span className="text-blue-500 text-2xl">👨‍🎓</span>
              </div>
              <p className="text-3xl font-bold">10,482</p>
              <p className="text-green-500 text-sm mt-2">+12% من الشهر الماضي</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">الدورات</h3>
                <span className="text-purple-500 text-2xl">📚</span>
              </div>
              <p className="text-3xl font-bold">542</p>
              <p className="text-green-500 text-sm mt-2">+8% من الشهر الماضي</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">المحاضرين</h3>
                <span className="text-yellow-500 text-2xl">👨‍🏫</span>
              </div>
              <p className="text-3xl font-bold">64</p>
              <p className="text-green-500 text-sm mt-2">+5% من الشهر الماضي</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">الإيرادات</h3>
                <span className="text-green-500 text-2xl">💰</span>
              </div>
              <p className="text-3xl font-bold">$128,450</p>
              <p className="text-green-500 text-sm mt-2">+15% من الشهر الماضي</p>
            </div>
          </div>
          
          {/* الرسم البياني */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-500 mb-4">نشاط المنصة</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-end justify-between p-4">
              {[40, 60, 45, 70, 85, 65, 75].map((height, i) => (
                <div key={i} className="w-12 flex flex-col items-center">
                  <div className={`bg-blue-500 rounded-t-lg w-8`} style={{height: `${height}%`}}></div>
                  <span className="text-xs mt-2">يوم {i+1}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* الجداول */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">أحدث المتدربين</h3>
                <a href="#" className="text-blue-500 text-sm">عرض الكل</a>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-2">الاسم</th>
                    <th className="text-right py-2">الدورة</th>
                    <th className="text-right py-2">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {name: 'محمد أحمد', course: 'تطوير الويب', date: '2025/04/10'},
                    {name: 'سارة علي', course: 'علوم البيانات', date: '2025/04/09'},
                    {name: 'خالد محمود', course: 'الذكاء الاصطناعي', date: '2025/04/08'},
                    {name: 'فاطمة حسن', course: 'إدارة المشاريع', date: '2025/04/07'},
                  ].map((student, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{student.name}</td>
                      <td className="py-2">{student.course}</td>
                      <td className="py-2">{student.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-500">أحدث الدورات</h3>
                <a href="#" className="text-blue-500 text-sm">عرض الكل</a>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-2">العنوان</th>
                    <th className="text-right py-2">المحاضر</th>
                    <th className="text-right py-2">المتدربين</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {title: 'أساسيات البرمجة', instructor: 'د. أحمد محمد', students: 120},
                    {title: 'تحليل البيانات', instructor: 'د. سمير علي', students: 85},
                    {title: 'تصميم واجهات المستخدم', instructor: 'م. ليلى حسن', students: 95},
                    {title: 'إدارة المشاريع الاحترافية', instructor: 'د. عمر خالد', students: 65},
                  ].map((course, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{course.title}</td>
                      <td className="py-2">{course.instructor}</td>
                      <td className="py-2">{course.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
