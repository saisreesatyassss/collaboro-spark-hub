import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  description?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  className 
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={className}
    >
      <Card className="p-6 hover-lift bg-gradient-surface border border-border/50 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {title}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {value}
              </div>
              
              {trend && (
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={trend.type === 'increase' ? 'default' : 'secondary'}
                    className={cn(
                      "text-xs px-2 py-1",
                      trend.type === 'increase' 
                        ? "bg-success/10 text-success border-success/20" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {trend.type === 'increase' ? '+' : ''}{trend.value}%
                  </Badge>
                  {description && (
                    <span className="text-xs text-muted-foreground">
                      {description}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}