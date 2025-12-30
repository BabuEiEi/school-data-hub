import React, { useState } from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import { mockUsers } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Swal from 'sweetalert2';

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleAddUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'เพิ่มผู้ใช้ใหม่',
      html: `
        <input id="swal-username" class="swal2-input" placeholder="ชื่อผู้ใช้">
        <input id="swal-password" class="swal2-input" placeholder="รหัสผ่าน" type="password">
        <select id="swal-role" class="swal2-select">
          <option value="school">สถานศึกษา</option>
          <option value="supervisor">ศึกษานิเทศก์</option>
          <option value="admin">ผู้ดูแลระบบ</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'เพิ่ม',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#1e40af',
    });

    if (formValues) {
      Swal.fire({ icon: 'success', title: 'เพิ่มผู้ใช้สำเร็จ', timer: 1500, showConfirmButton: false });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ?',
      text: 'คุณต้องการลบผู้ใช้นี้หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      setUsers(users.filter(u => u.userId !== userId));
      Swal.fire({ icon: 'success', title: 'ลบผู้ใช้สำเร็จ', timer: 1500, showConfirmButton: false });
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return <Badge className="bg-secondary text-secondary-foreground">ผู้ดูแลระบบ</Badge>;
      case 'supervisor': return <Badge variant="default">ศึกษานิเทศก์</Badge>;
      default: return <Badge variant="outline">สถานศึกษา</Badge>;
    }
  };

  return (
    <div>
      <PageHeader
        title="จัดการผู้ใช้"
        subtitle="เพิ่ม ลบ และจัดการสิทธิ์ผู้ใช้งาน"
        icon={<Users className="w-6 h-6" />}
        actions={
          <Button onClick={handleAddUser} className="gap-2">
            <Plus className="w-4 h-4" /> เพิ่มผู้ใช้
          </Button>
        }
      />

      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>รหัสผู้ใช้</TableHead>
                <TableHead>ชื่อผู้ใช้</TableHead>
                <TableHead>บทบาท</TableHead>
                <TableHead className="text-center">สถานะ</TableHead>
                <TableHead className="text-center">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell className="font-mono text-sm">{user.userId}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell className="text-center">
                    <Switch checked={user.isActive} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteUser(user.userId)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
