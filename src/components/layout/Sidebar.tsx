import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  DollarSign, 
  FolderOpen, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const schoolMenuItems = [
    { icon: Home, label: 'ข้อมูลทั่วไป', path: '/dashboard' },
    { icon: ClipboardList, label: 'รายละเอียดสนามสอบ', path: '/exam-details' },
    { icon: DollarSign, label: 'ค่าใช้จ่ายสนามสอบ', path: '/budget' },
    { icon: FolderOpen, label: 'เอกสาร', path: '/documents' },
  ];

  const adminMenuItems = [
    { icon: Users, label: 'จัดการผู้ใช้', path: '/admin/users' },
    { icon: Settings, label: 'ตั้งค่าระบบ', path: '/admin/settings' },
  ];

  const supervisorMenuItems = [
    { icon: Home, label: 'ภาพรวมสนามสอบ', path: '/supervisor' },
    { icon: ClipboardList, label: 'รายละเอียดสนามสอบ', path: '/supervisor/exam-details' },
  ];

  const getMenuItems = () => {
    if (user?.role === 'admin') return [...schoolMenuItems, ...adminMenuItems];
    if (user?.role === 'supervisor') return [...supervisorMenuItems, ...schoolMenuItems.slice(3)];
    return schoolMenuItems;
  };

  const menuItems = getMenuItems();

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'admin':
        return { label: 'ผู้ดูแลระบบ', className: 'bg-secondary text-secondary-foreground' };
      case 'supervisor':
        return { label: 'ศึกษานิเทศก์', className: 'bg-primary/80 text-primary-foreground' };
      default:
        return { label: 'สถานศึกษา', className: 'bg-accent text-accent-foreground' };
    }
  };

  const roleBadge = getRoleBadge();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 gradient-primary text-sidebar-foreground transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <FileText className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">ระบบสนามสอบ</h1>
                <p className="text-xs opacity-80">O-NET 2567</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="mt-4 p-3 rounded-lg bg-sidebar-accent/50">
            <p className="font-medium text-sm truncate">{user?.username}</p>
            <span className={cn("inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium", roleBadge.className)}>
              {roleBadge.label}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive 
                        ? "bg-secondary text-secondary-foreground shadow-glow" 
                        : "hover:bg-sidebar-accent text-sidebar-foreground"
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            <span>ออกจากระบบ</span>
          </Button>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <Button
        variant="default"
        size="icon"
        className="fixed top-4 left-4 z-30 lg:hidden shadow-elevated"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
};

export default Sidebar;
