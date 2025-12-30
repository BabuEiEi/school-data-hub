import React from 'react';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  className,
  trend,
}) => {
  return (
    <div className={cn(
      "p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              "text-sm font-medium mt-2",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCard;
