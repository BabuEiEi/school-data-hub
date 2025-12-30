import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    const redirectPath = user.role === 'admin' ? '/admin/users' : 
                         user.role === 'supervisor' ? '/supervisor' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!username.trim() || !password.trim()) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      setIsSubmitting(false);
      return;
    }

    const success = await login(username.trim(), password);
    
    if (success) {
      await Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        text: 'ยินดีต้อนรับเข้าสู่ระบบสนามสอบ',
        timer: 1500,
        showConfirmButton: false,
      });
      
      const redirectPath = username === 'admin' ? '/admin/users' : 
                           username.startsWith('supervisor') ? '/supervisor' : '/dashboard';
      navigate(redirectPath);
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      Swal.fire({
        icon: 'error',
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        text: 'กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน',
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary shadow-glow mb-4">
            <FileText className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">ระบบสนามสอบ</h1>
          <p className="text-primary-foreground/80 mt-2">O-NET ปีการศึกษา 2567</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-elevated border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">เข้าสู่ระบบ</CardTitle>
            <CardDescription>กรอกข้อมูลเพื่อเข้าใช้งานระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username">ชื่อผู้ใช้</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="กรอกชื่อผู้ใช้"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12"
                  autoComplete="username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">รหัสผ่าน</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="กรอกรหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    กำลังเข้าสู่ระบบ...
                  </div>
                ) : (
                  'เข้าสู่ระบบ'
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-3">บัญชีทดสอบ:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Admin:</span>
                  <code className="font-mono text-foreground">admin / admin123</code>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">ศน.:</span>
                  <code className="font-mono text-foreground">supervisor01 / sup123</code>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">โรงเรียน:</span>
                  <code className="font-mono text-foreground">school01 / school123</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-primary-foreground/60 text-sm mt-6">
          © 2025 พัฒนาโดย นายภัทรพล แก้วเสนา
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
