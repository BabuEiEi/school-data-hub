import React, { useState } from 'react';
import { DollarSign, Calculator, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockBudgetItems } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import DataCard from '@/components/ui/DataCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const BudgetPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const budgetItems = mockBudgetItems.filter(b => 
    user?.role === 'school' ? b.school_code === user.school_code : true
  );

  const totalBudget = budgetItems.reduce((acc, item) => acc + item.total, 0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'อัปเดตข้อมูลสำเร็จ',
      description: 'ข้อมูลค่าใช้จ่ายได้รับการอัปเดตแล้ว',
    });
    setIsRefreshing(false);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div>
      <PageHeader
        title="ค่าใช้จ่ายระดับสนามสอบ"
        subtitle="รายละเอียดประมาณการค่าใช้จ่ายในการจัดสอบ"
        icon={<DollarSign className="w-6 h-6" />}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <DataCard
          title="งบประมาณรวม"
          value={`฿${formatCurrency(totalBudget)}`}
          icon={<DollarSign className="w-6 h-6" />}
          className="sm:col-span-1"
        />
        <DataCard
          title="จำนวนรายการ"
          value={budgetItems.length}
          subtitle="รายการค่าใช้จ่าย"
          icon={<FileText className="w-6 h-6" />}
        />
        <DataCard
          title="เฉลี่ยต่อรายการ"
          value={`฿${formatCurrency(totalBudget / budgetItems.length)}`}
          icon={<Calculator className="w-6 h-6" />}
        />
      </div>

      {/* Budget Table */}
      <Card className="shadow-card">
        <CardHeader className="border-b border-border bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            รายละเอียดค่าใช้จ่าย
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">ลำดับ</TableHead>
                  <TableHead>รายการ</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                  <TableHead className="text-right">ราคา/หน่วย</TableHead>
                  <TableHead className="text-right">จำนวน</TableHead>
                  <TableHead className="text-center">หน่วย</TableHead>
                  <TableHead className="text-right">รวม (บาท)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item, index) => (
                  <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.item_name}</TableCell>
                    <TableCell className="text-muted-foreground">{item.description}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.unit_price)}</TableCell>
                    <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-center">{item.unit}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">{formatCurrency(item.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-primary/5 font-bold">
                  <TableCell colSpan={6} className="text-right">
                    รวมทั้งสิ้น
                  </TableCell>
                  <TableCell className="text-right text-lg text-primary">
                    ฿{formatCurrency(totalBudget)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPage;
