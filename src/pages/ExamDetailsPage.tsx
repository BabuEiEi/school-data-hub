import React, { useState } from 'react';
import { ClipboardList, Calendar, Users, DoorOpen, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockExamDetails } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ExamDetailsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const examDetails = mockExamDetails;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'อัปเดตข้อมูลสำเร็จ',
      description: 'ข้อมูลรายละเอียดสนามสอบได้รับการอัปเดตแล้ว',
    });
    setIsRefreshing(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    return timeStr.substring(0, 5);
  };

  return (
    <div>
      <PageHeader
        title="รายละเอียดสนามสอบ"
        subtitle="ข้อมูลการจัดสอบและกรรมการคุมสอบ"
        icon={<ClipboardList className="w-6 h-6" />}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">วันสอบ</p>
              <p className="text-lg font-bold">22-23 ก.พ. 68</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ผู้ลงทะเบียนทั้งหมด</p>
              <p className="text-lg font-bold">{examDetails.reduce((acc, e) => acc + e.registered, 0).toLocaleString()} คน</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ความจุทั้งหมด</p>
              <p className="text-lg font-bold">{examDetails.reduce((acc, e) => acc + e.capacity, 0).toLocaleString()} คน</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">จำนวนรายวิชา</p>
              <p className="text-lg font-bold">{examDetails.length} รายการ</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Details Table */}
      <Card className="shadow-card">
        <CardHeader className="border-b border-border bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            ตารางรายละเอียดการสอบ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>รหัสสอบ</TableHead>
                  <TableHead>ชื่อการสอบ</TableHead>
                  <TableHead>วันสอบ</TableHead>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ระดับชั้น</TableHead>
                  <TableHead className="text-right">ความจุ</TableHead>
                  <TableHead className="text-right">ลงทะเบียน</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examDetails.map((exam) => (
                  <TableRow key={exam.examId} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm">{exam.examId}</TableCell>
                    <TableCell className="font-medium">{exam.examName}</TableCell>
                    <TableCell>{formatDate(exam.examDate)}</TableCell>
                    <TableCell>{formatTime(exam.startTime)} - {formatTime(exam.endTime)}</TableCell>
                    <TableCell>
                      <Badge variant={exam.level === 'ม.3' ? 'default' : 'secondary'}>
                        {exam.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{exam.capacity.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">{exam.registered.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamDetailsPage;
