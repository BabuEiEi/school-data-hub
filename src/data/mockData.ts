import { User, SchoolData, ExamDetail, BudgetItem, Document, Settings } from '@/types';

export const mockUsers: User[] = [
  {
    userId: 'user001',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    isActive: true,
  },
  {
    userId: 'user002',
    username: 'supervisor01',
    password: 'sup123',
    role: 'supervisor',
    isActive: true,
  },
  {
    userId: 'user003',
    username: 'school01',
    password: 'school123',
    role: 'school',
    isActive: true,
  },
  {
    userId: 'user004',
    username: 'school02',
    password: 'school123',
    role: 'school',
    isActive: true,
  },
];

export const mockSchools: SchoolData[] = [
  {
    schoolId: 'SCH001',
    schoolName: 'โรงเรียนพิษณุโลกพิทยาคม',
    principalName: 'นายวิเชียร อินทะนัก',
    contactNumber: '055-258456',
    address: '1 ถ.บรมไตรโลกนาถ ต.ในเมือง อ.เมือง',
    province: 'พิษณุโลก',
    latitude: 16.8234,
    longitude: 100.2734,
    schoolType: 'Public',
    status: 'Active',
  },
  {
    schoolId: 'SCH002',
    schoolName: 'โรงเรียนเฉลิมขวัญสตรี',
    principalName: 'นางสาวสุภาพร วิชัยดิษฐ',
    contactNumber: '055-258789',
    address: '28 ถ.พุทธบูชา ต.ในเมือง อ.เมือง',
    province: 'พิษณุโลก',
    latitude: 16.8156,
    longitude: 100.2612,
    schoolType: 'Public',
    status: 'Active',
  },
  {
    schoolId: 'SCH003',
    schoolName: 'โรงเรียนอุตรดิตถ์',
    principalName: 'นายประสิทธิ์ สุวรรณชัย',
    contactNumber: '055-411234',
    address: '15 ถ.ประชานิยม ต.ท่าอิฐ อ.เมือง',
    province: 'อุตรดิตถ์',
    latitude: 17.6256,
    longitude: 100.0993,
    schoolType: 'Public',
    status: 'Active',
  },
];

export const mockExamDetails: ExamDetail[] = [
  {
    examId: 'EXAM001',
    schoolId: 'SCH001',
    examName: 'O-NET ม.3',
    examDate: '2025-02-22',
    startTime: '08:30:00',
    endTime: '16:30:00',
    capacity: 500,
    registered: 450,
    level: 'ม.3',
  },
  {
    examId: 'EXAM002',
    schoolId: 'SCH001',
    examName: 'O-NET ม.6',
    examDate: '2025-02-23',
    startTime: '08:30:00',
    endTime: '16:30:00',
    capacity: 400,
    registered: 380,
    level: 'ม.6',
  },
  {
    examId: 'EXAM003',
    schoolId: 'SCH002',
    examName: 'O-NET ม.3',
    examDate: '2025-02-22',
    startTime: '08:30:00',
    endTime: '16:30:00',
    capacity: 350,
    registered: 320,
    level: 'ม.3',
  },
];

export const mockBudgetItems: BudgetItem[] = [
  {
    budgetId: 'BUD001',
    schoolId: 'SCH001',
    examId: 'EXAM001',
    item: 'ค่าอาหารกลางวันกรรมการคุมสอบ',
    estimatedCost: 7000,
    actualCost: 6800,
    variance: -200,
  },
  {
    budgetId: 'BUD002',
    schoolId: 'SCH001',
    examId: 'EXAM001',
    item: 'ค่าอาหารว่าง',
    estimatedCost: 9800,
    actualCost: 9800,
    variance: 0,
  },
  {
    budgetId: 'BUD003',
    schoolId: 'SCH001',
    examId: 'EXAM001',
    item: 'ค่าตอบแทนกรรมการคุมสอบ',
    estimatedCost: 18000,
    actualCost: 18000,
    variance: 0,
  },
  {
    budgetId: 'BUD004',
    schoolId: 'SCH001',
    examId: 'EXAM001',
    item: 'ค่าวัสดุอุปกรณ์',
    estimatedCost: 1500,
    actualCost: 1450,
    variance: -50,
  },
];

export const mockDocuments: Document[] = [
  {
    docId: 'DOC001',
    schoolId: 'SCH001',
    examId: 'EXAM001',
    docName: 'คำสั่งแต่งตั้งคณะกรรมการดำเนินการสอบ O-NET ปีการศึกษา 2567',
    docUrl: 'https://drive.google.com/file/d/example1',
    uploadDate: '2025-01-15',
  },
  {
    docId: 'DOC002',
    schoolId: 'SCH001',
    examId: 'EXAM001',
    docName: 'คู่มือการจัดสอบ O-NET ปีการศึกษา 2567',
    docUrl: 'https://drive.google.com/file/d/example2',
    uploadDate: '2025-01-10',
  },
  {
    docId: 'DOC003',
    schoolId: 'SCH001',
    examId: 'EXAM001',
    docName: 'หนังสือแจ้งสถานศึกษา เรื่อง การจัดสอบ O-NET',
    docUrl: 'https://drive.google.com/file/d/example3',
    uploadDate: '2025-01-05',
  },
  {
    docId: 'DOC004',
    schoolId: 'SCH001',
    examId: 'EXAM001',
    docName: 'แบบฟอร์มรายงานผลการจัดสอบ',
    docUrl: 'https://drive.google.com/file/d/example4',
    uploadDate: '2025-01-20',
  },
];

export const mockSettings: Settings = {
  settingId: 'SET001',
  logoUrl: 'https://example.com/logo.png',
  activeSheets: ['Data', 'ExamDetails', 'Budget', 'Documents'],
  lastUpdated: '2025-01-10T10:00:00',
};
