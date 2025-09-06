import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Trash2, 
  Filter,
  User,
  Calendar,
  MessageSquare,
  Target,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'assignment' | 'due_reminder' | 'comment' | 'status_change' | 'mention';
  title: string;
  message: string;
  user?: {
    name: string;
    avatarUrl?: string;
  };
  project: string;
  createdAt: string;
  read: boolean;
  priority?: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'New Task Assigned',
    message: 'You have been assigned to "API Integration" in Project Alpha',
    user: {
      name: 'Alice Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c3?w=32&h=32&fit=crop&crop=face'
    },
    project: 'Project Alpha',
    createdAt: '2 hours ago',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'due_reminder',
    title: 'Task Due Soon',
    message: '"User Interface Design" is due tomorrow',
    project: 'Project Nova',
    createdAt: '4 hours ago',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'comment',
    title: 'New Comment',
    message: 'Bob Smith commented on "Database Schema" task',
    user: {
      name: 'Bob Smith',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    project: 'Project Orion',
    createdAt: '1 day ago',
    read: true
  },
  {
    id: '4',
    type: 'status_change',
    title: 'Status Updated',
    message: 'Task "Frontend Components" moved to Done',
    user: {
      name: 'Carol Davis',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    project: 'Project Alpha',
    createdAt: '1 day ago',
    read: true
  },
  {
    id: '5',
    type: 'mention',
    title: 'You were mentioned',
    message: 'David Wilson mentioned you in Project Nova discussion',
    user: {
      name: 'David Wilson',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    project: 'Project Nova',
    createdAt: '2 days ago',
    read: true
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'assignment':
      return Target;
    case 'due_reminder':
      return Calendar;
    case 'comment':
      return MessageSquare;
    case 'status_change':
      return CheckCheck;
    case 'mention':
      return User;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: Notification['type'], priority?: string) => {
  if (priority === 'high') return 'text-destructive bg-destructive/10';
  if (priority === 'medium') return 'text-warning bg-warning/10';
  
  switch (type) {
    case 'assignment':
      return 'text-primary bg-primary/10';
    case 'due_reminder':
      return 'text-warning bg-warning/10';
    case 'comment':
      return 'text-secondary bg-secondary/10';
    case 'status_change':
      return 'text-success bg-success/10';
    case 'mention':
      return 'text-purple-500 bg-purple-500/10';
    default:
      return 'text-muted-foreground bg-muted';
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | Notification['type']>('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesReadFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === 'read' && notification.read);
    
    const matchesTypeFilter = typeFilter === 'all' || notification.type === typeFilter;
    
    return matchesReadFilter && matchesTypeFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bell className="h-8 w-8" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your team's activity
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread ({unreadCount})</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="assignment">Assignments</SelectItem>
            <SelectItem value="due_reminder">Due Reminders</SelectItem>
            <SelectItem value="comment">Comments</SelectItem>
            <SelectItem value="status_change">Status Changes</SelectItem>
            <SelectItem value="mention">Mentions</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => {
            const IconComponent = getNotificationIcon(notification.type);
            const colorClasses = getNotificationColor(notification.type, notification.priority);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={cn(
                  "p-4 hover:bg-accent/50 transition-colors cursor-pointer border-l-4",
                  !notification.read && "bg-primary/5 border-l-primary shadow-md",
                  notification.read && "border-l-transparent"
                )}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1 min-w-0">
                      {/* Icon */}
                      <div className={cn("p-2 rounded-full", colorClasses)}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={cn(
                            "font-semibold truncate",
                            !notification.read ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                        
                        <p className={cn(
                          "text-sm mb-2",
                          !notification.read ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          {notification.user && (
                            <div className="flex items-center space-x-1">
                              <Avatar className="h-4 w-4">
                                <AvatarImage src={notification.user.avatarUrl} />
                                <AvatarFallback className="text-xs">
                                  {notification.user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{notification.user.name}</span>
                            </div>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {notification.project}
                          </Badge>
                          <span>{notification.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No notifications found
            </h3>
            <p className="text-muted-foreground">
              {filter === 'unread' ? "You're all caught up!" : "Try adjusting your filters"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}