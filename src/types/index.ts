export type UserRole = 'school' | 'supervisor' | 'admin';

export interface User {
  userId: string;
  username: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

export interface SchoolData {
  schoolId: string;
  schoolName: string;
  principalName: string;
  contactNumber: string;
  address: string;
  province: string;
  latitude: number;
  longitude: number;
  schoolType: string;
  status: string;
}

export interface ExamDetail {
  examId: string;
  schoolId: string;
  examName: string;
  examDate: string;
  startTime: string;
  endTime: string;
  capacity: number;
  registered: number;
  level: string;
}

export interface BudgetItem {
  budgetId: string;
  schoolId: string;
  examId: string;
  item: string;
  estimatedCost: number;
  actualCost: number;
  variance: number;
}

export interface Document {
  docId: string;
  schoolId: string;
  examId: string;
  docName: string;
  docUrl: string;
  uploadDate: string;
}

export interface Settings {
  settingId: string;
  logoUrl: string;
  activeSheets: string[];
  lastUpdated: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
