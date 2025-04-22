// صورة توضيحية للصفحة الرئيسية
const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 min-h-screen text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">منصة التدريب الوظيفي</h1>
          <div className="flex space-x-4 space-x-reverse">
            <button className="bg-white text-blue-900 px-4 py-2 rounded-lg">تسجيل الدخول</button>
            <button className="border border-white px-4 py-2 rounded-lg">إنشاء حساب</button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-10 px-4">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">ابدأ رحلتك التدريبية اليوم</h2>
          <p className="text-xl mb-8">آلاف الدورات التدريبية في مختلف المجالات بانتظارك</p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full flex">
              <input type="text" placeholder="ابحث عن دورة..." className="bg-transparent flex-grow px-4 outline-none" />
              <button className="bg-white text-blue-900 px-6 py-2 rounded-full">بحث</button>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">الدورات المميزة</h3>
            <a href="#" className="text-blue-300">عرض الكل</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-500 text-xs px-2 py-1 rounded">مبتدئ</span>
                    <span className="text-yellow-400 flex items-center">
                      <span>4.8</span>
                      <span>★</span>
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">أساسيات البرمجة بلغة Python</h4>
                  <p className="text-gray-300 mb-4">تعلم أساسيات البرمجة باستخدام لغة Python من الصفر إلى الاحتراف</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">د. أحمد محمد</span>
                    <span className="font-bold">مجاناً</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">المسارات التعليمية</h3>
            <a href="#" className="text-blue-300">عرض الكل</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['تطوير الويب', 'علوم البيانات', 'الذكاء الاصطناعي', 'إدارة المشاريع'].map(category => (
              <div key={category} className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="text-xl font-bold mb-2">{category}</h4>
                <p className="text-sm text-gray-200 mb-4">10+ دورات تدريبية</p>
                <button className="bg-white/10 hover:bg-white/20 w-full py-2 rounded-lg">استكشاف</button>
              </div>
            ))}
          </div>
        </section>
        
        <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-gray-300">متدرب</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-300">دورة تدريبية</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-300">محاضر معتمد</div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-blue-950 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>جميع الحقوق محفوظة © 2025 منصة التدريب الوظيفي</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
