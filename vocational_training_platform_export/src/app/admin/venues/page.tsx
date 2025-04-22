'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getVenues, createVenue } from '@/app/api/venues/venues'
import { checkAuthStatus } from '@/app/api/auth/auth'
import { useRouter } from 'next/navigation'

export default function VenueManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [venues, setVenues] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  // حالة نموذج إنشاء موقع تدريب جديد
  const [venueData, setVenueData] = useState({
    name: '',
    address: '',
    capacity: '',
    type: 'واقعي',
    description: ''
  })
  
  // التحقق من حالة المصادقة عند تحميل الصفحة
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await checkAuthStatus()
        if (!auth.authenticated) {
          router.push('/auth')
          return
        }
        
        if (auth.role !== 'admin') {
          router.push('/dashboard')
          return
        }
        
        // استرجاع قائمة مواقع التدريب
        loadVenues()
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/auth')
      }
    }
    
    checkAuth()
  }, [router])
  
  // استرجاع قائمة مواقع التدريب
  const loadVenues = async () => {
    setIsLoading(true)
    try {
      const result = await getVenues()
      if (result.success) {
        setVenues(result.venues)
      } else {
        setError(result.error || 'فشل في استرجاع بيانات مواقع التدريب')
      }
    } catch (error) {
      console.error('Error loading venues:', error)
      setError('حدث خطأ أثناء استرجاع بيانات مواقع التدريب')
    } finally {
      setIsLoading(false)
    }
  }
  
  // معالجة تغيير حقول نموذج إنشاء موقع تدريب
  const handleVenueChange = (e) => {
    const { name, value } = e.target
    setVenueData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // معالجة تغيير القائمة المنسدلة
  const handleSelectChange = (name, value) => {
    setVenueData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // معالجة تغيير حقل البحث
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  
  // تصفية مواقع التدريب حسب مصطلح البحث
  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (venue.address && venue.address.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  
  // معالجة إنشاء موقع تدريب جديد
  const handleCreateVenue = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const result = await createVenue({
        ...venueData,
        capacity: venueData.capacity ? parseInt(venueData.capacity) : null
      })
      
      if (result.success) {
        setSuccess('تم إنشاء موقع التدريب بنجاح')
        setVenueData({
          name: '',
          address: '',
          capacity: '',
          type: 'واقعي',
          description: ''
        })
        loadVenues()
      } else {
        setError(result.error || 'فشل في إنشاء موقع التدريب')
      }
    } catch (error) {
      console.error('Create venue error:', error)
      setError('حدث خطأ أثناء إنشاء موقع التدريب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }
  
  // معالجة عرض تفاصيل موقع التدريب
  const handleViewVenue = (venueId) => {
    router.push(`/admin/venues/${venueId}`)
  }
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">إدارة مواقع التدريب</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* نموذج إنشاء موقع تدريب جديد */}
        <Card>
          <CardHeader>
            <CardTitle>إنشاء موقع تدريب جديد</CardTitle>
            <CardDescription>أدخل بيانات موقع التدريب الجديد</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateVenue}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">اسم الموقع</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="أدخل اسم موقع التدريب"
                    required
                    value={venueData.name}
                    onChange={handleVenueChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="أدخل عنوان موقع التدريب"
                    value={venueData.address}
                    onChange={handleVenueChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capacity">السعة</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    placeholder="أدخل سعة موقع التدريب"
                    value={venueData.capacity}
                    onChange={handleVenueChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">نوع الموقع</Label>
                  <Select
                    value={venueData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الموقع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="واقعي">واقعي</SelectItem>
                      <SelectItem value="افتراضي">افتراضي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">الوصف</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="أدخل وصفاً لموقع التدريب"
                    value={venueData.description}
                    onChange={handleVenueChange}
                  />
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {success && (
                  <Alert variant="success" className="bg-green-50 text-green-800 border-green-200">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
              </div>
              
              <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                {isLoading ? 'جاري إنشاء الموقع...' : 'إنشاء موقع التدريب'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* قائمة مواقع التدريب الحالية */}
        <Card>
          <CardHeader>
            <CardTitle>مواقع التدريب الحالية</CardTitle>
            <CardDescription>قائمة بمواقع التدريب المتاحة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="search">بحث</Label>
              <Input
                id="search"
                placeholder="ابحث باسم الموقع أو العنوان"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            {isLoading ? (
              <div className="text-center py-4">جاري تحميل البيانات...</div>
            ) : filteredVenues.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                {searchTerm ? 'لا توجد نتائج مطابقة لبحثك' : 'لا توجد مواقع تدريب مسجلة حالياً'}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الموقع</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>السعة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVenues.map((venue) => (
                    <TableRow key={venue.id}>
                      <TableCell className="font-medium">{venue.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          venue.type === 'واقعي' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {venue.type}
                        </span>
                      </TableCell>
                      <TableCell>{venue.capacity || 'غير محدد'}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewVenue(venue.id)}
                        >
                          عرض التفاصيل
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={loadVenues} disabled={isLoading}>
              تحديث القائمة
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
