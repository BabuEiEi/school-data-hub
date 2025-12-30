import React, { useState } from 'react';
import { Settings, Image, FileSpreadsheet } from 'lucide-react';
import { mockSettings } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

const AdminSettingsPage: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState(mockSettings.logoUrl);
  const [activeSheets, setActiveSheets] = useState(mockSettings.activeSheets);

  const availableSheets = ['Data', 'ExamDetails', 'Budget', 'Documents', 'Users', 'Settings'];

  const handleSave = () => {
    Swal.fire({ icon: 'success', title: 'บันทึกการตั้งค่าสำเร็จ', timer: 1500, showConfirmButton: false });
  };

  const toggleSheet = (sheet: string) => {
    if (activeSheets.includes(sheet)) {
      setActiveSheets(activeSheets.filter(s => s !== sheet));
    } else {
      setActiveSheets([...activeSheets, sheet]);
    }
  };

  return (
    <div>
      <PageHeader title="ตั้งค่าระบบ" subtitle="กำหนดค่าต่างๆ ของระบบ" icon={<Settings className="w-6 h-6" />} />

      <div className="grid gap-6">
        <Card className="shadow-card">
          <CardHeader className="border-b border-border bg-muted/30">
            <CardTitle className="flex items-center gap-2"><Image className="w-5 h-5 text-primary" />โลโก้ระบบ</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Label>ลิงค์รูปโลโก้</Label>
            <Input 
              placeholder="https://..." 
              className="mt-2" 
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="border-b border-border bg-muted/30">
            <CardTitle className="flex items-center gap-2"><FileSpreadsheet className="w-5 h-5 text-primary" />Active ชีต</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {availableSheets.map((sheet, i) => (
              <div key={sheet} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span>{i + 1}. {sheet}</span>
                <Switch 
                  checked={activeSheets.includes(sheet)} 
                  onCheckedChange={() => toggleSheet(sheet)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button onClick={handleSave} size="lg" className="w-full md:w-auto md:self-end">บันทึกการตั้งค่า</Button>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
