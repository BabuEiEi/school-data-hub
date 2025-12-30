import React, { useState } from 'react';
import { Home, Building2, MapPin, Phone, User, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockSchools } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import DataCard from '@/components/ui/DataCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // For school role, find their school; otherwise show first school
  const schoolData = mockSchools[0];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'อัปเดตข้อมูลสำเร็จ',
      description: 'ข้อมูลได้รับการอัปเดตเรียบร้อยแล้ว',
    });
    setIsRefreshing(false);
  };

  return (
    <div>
      <PageHeader
        title="ข้อมูลทั่วไป"
        subtitle="ข้อมูลสนามสอบและรายละเอียดสถานศึกษา"
        icon={<Home className="w-6 h-6" />}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <div className="grid gap-6">
        {/* School Info Card */}
        <Card className="shadow-card">
          <CardHeader className="border-b border-border bg-muted/30">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Building2 className="w-6 h-6 text-primary" />
              {schoolData.schoolName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ที่อยู่</p>
                    <p className="text-foreground">{schoolData.address}</p>
                    <p className="text-foreground">จ.{schoolData.province}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ผู้อำนวยการโรงเรียน</p>
                    <p className="text-foreground font-medium">{schoolData.principalName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">โทรศัพท์</p>
                    <p className="text-foreground">{schoolData.contactNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ประเภท / สถานะ</p>
                    <p className="text-foreground">{schoolData.schoolType} - {schoolData.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DataCard
            title="รหัสสนามสอบ"
            value={schoolData.schoolId}
            icon={<Building2 className="w-6 h-6" />}
          />
          <DataCard
            title="จำนวนผู้เข้าสอบ"
            value="830"
            subtitle="ม.3 + ม.6"
            icon={<User className="w-6 h-6" />}
          />
          <DataCard
            title="จำนวนห้องสอบ"
            value="28"
            subtitle="รวมทุกระดับชั้น"
            icon={<Home className="w-6 h-6" />}
          />
          <DataCard
            title="กรรมการคุมสอบ"
            value="56"
            subtitle="+ สำรอง 9 คน"
            icon={<User className="w-6 h-6" />}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
