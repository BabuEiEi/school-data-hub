import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-6 border-t border-border bg-muted/30">
      <p className="text-center text-sm text-muted-foreground">
        © 2025 Copyright | พัฒนาโดย{' '}
        <span className="font-medium text-primary">นายภัทรพล แก้วเสนา</span>{' '}
        ศึกษานิเทศก์ สพม.พิษณุโลก อุตรดิตถ์
      </p>
    </footer>
  );
};

export default Footer;
