import React, { useState } from 'react';
import { DollarSign, Calculator, FileText, TrendingDown, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockBudgetItems } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import DataCard from '@/components/ui/DataCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const BudgetPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const budgetItems = mockBudgetItems;

  const totalEstimated = budgetItems.reduce((acc, item) => acc + item.estimatedCost, 0);
  const totalActual = budgetItems.reduce((acc, item) => acc + item.actualCost, 0);
  const totalVariance = budgetItems.reduce((acc, item) => acc + item.variance, 0);

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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataCard
          title="งบประมาณ"
          value={`฿${formatCurrency(totalEstimated)}`}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <DataCard
          title="ค่าใช้จ่ายจริง"
          value={`฿${formatCurrency(totalActual)}`}
          icon={<Calculator className="w-6 h-6" />}
        />
        <DataCard
          title="ผลต่าง"
          value={`฿${formatCurrency(totalVariance)}`}
          subtitle={totalVariance < 0 ? 'ประหยัดงบ' : 'เกินงบ'}
          icon={totalVariance < 0 ? <TrendingDown className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
        />
        <DataCard
          title="จำนวนรายการ"
          value={budgetItems.length}
          subtitle="รายการค่าใช้จ่าย"
          icon={<FileText className="w-6 h-6" />}
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
                  <TableHead>รหัส</TableHead>
                  <TableHead>รายการ</TableHead>
                  <TableHead className="text-right">ประมาณการ</TableHead>
                  <TableHead className="text-right">ค่าใช้จ่ายจริง</TableHead>
                  <TableHead className="text-right">ผลต่าง</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item) => (
                  <TableRow key={item.budgetId} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm">{item.budgetId}</TableCell>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.estimatedCost)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.actualCost)}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={item.variance <= 0 ? 'default' : 'destructive'}>
                        {formatCurrency(item.variance)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-primary/5 font-bold">
                  <TableCell colSpan={2} className="text-right">
                    รวมทั้งสิ้น
                  </TableCell>
                  <TableCell className="text-right">
                    ฿{formatCurrency(totalEstimated)}
                  </TableCell>
                  <TableCell className="text-right">
                    ฿{formatCurrency(totalActual)}
                  </TableCell>
                  <TableCell className="text-right text-lg text-primary">
                    ฿{formatCurrency(totalVariance)}
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
