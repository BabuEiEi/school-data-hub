import React, { useState } from 'react';
import { FolderOpen, FileText, Download, ExternalLink, Book, Mail, ClipboardList } from 'lucide-react';
import { mockDocuments } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const DocumentsPage: React.FC = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const documents = mockDocuments;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'อัปเดตข้อมูลสำเร็จ',
      description: 'รายการเอกสารได้รับการอัปเดตแล้ว',
    });
    setIsRefreshing(false);
  };

  const getDocIcon = (docName: string) => {
    if (docName.includes('คำสั่ง')) return <ClipboardList className="w-6 h-6" />;
    if (docName.includes('คู่มือ')) return <Book className="w-6 h-6" />;
    if (docName.includes('หนังสือ')) return <Mail className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  const getDocType = (docName: string) => {
    if (docName.includes('คำสั่ง')) return 'คำสั่ง';
    if (docName.includes('คู่มือ')) return 'คู่มือ';
    if (docName.includes('หนังสือ')) return 'หนังสือแจ้ง';
    return 'แบบฟอร์ม';
  };

  const getDocBadgeVariant = (docName: string) => {
    if (docName.includes('คำสั่ง')) return 'default';
    if (docName.includes('คู่มือ')) return 'secondary';
    return 'outline';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <PageHeader
        title="เอกสาร"
        subtitle="คำสั่ง คู่มือ และหนังสือแจ้งต่างๆ"
        icon={<FolderOpen className="w-6 h-6" />}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card 
            key={doc.docId} 
            className="shadow-card hover:shadow-elevated transition-all duration-300 group"
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {getDocIcon(doc.docName)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant={getDocBadgeVariant(doc.docName) as any}>
                      {getDocType(doc.docName)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(doc.uploadDate)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground line-clamp-2">{doc.docName}</h3>
                </div>

                <div className="flex gap-2 md:flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(doc.docUrl, '_blank')}
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    เปิด
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: 'กำลังดาวน์โหลด...',
                        description: doc.docName,
                      });
                    }}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    ดาวน์โหลด
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {documents.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">ไม่พบเอกสาร</h3>
              <p className="text-muted-foreground">ยังไม่มีเอกสารในระบบ</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
