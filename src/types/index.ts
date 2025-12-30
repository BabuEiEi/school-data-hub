export type UserRole = 'school' | 'supervisor' | 'admin';

export interface User {
  user_id: string;
  username: string;
  password: string;
  role: UserRole;
  school_code: string;
  full_name: string;
  is_active: boolean;
}

export interface SchoolData {
  school_code: string;
  school_name: string;
  address: string;
  district: string;
  province: string;
  director: string;
  phone: string;
  email: string;
  supervisor_id: string;
}

export interface ExamDetail {
  school_code: string;
  exam_date: string;
  exam_level: string;
  subject: string;
  total_students: number;
  total_rooms: number;
  proctors: number;
  backup_proctors: number;
}

export interface BudgetItem {
  school_code: string;
  item_name: string;
  description: string;
  unit_price: number;
  quantity: number;
  unit: string;
  total: number;
}

export interface Document {
  doc_id: string;
  doc_name: string;
  doc_type: string;
  doc_url: string;
  is_active: boolean;
  created_at: string;
}

export interface Settings {
  key: string;
  value: string;
  is_active: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
