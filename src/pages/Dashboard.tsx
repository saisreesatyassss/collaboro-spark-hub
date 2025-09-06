import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FolderKanban, 
  CheckSquare, 
  AlertTriangle, 
  TrendingUp,
  Plus,
  Users,
  Calendar,
  Target
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { CreateProjectModal } from "@/components/modals/CreateProjectModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-collaboration.jpg";

// Mock data
const stats = [
  {
    title: "Active Projects",
    value: 12,
    icon: FolderKanban,
    trend: { value: 8, type: 'increase' as const },
    description: "vs last month"
  },
  {
    title: "Open Tasks",
    value: 47,
    icon: CheckSquare,
    trend: { value: 12, type: 'decrease' as const },
    description: "vs last week"
  },
  {
    title: "Overdue Items",
    value: 3,
    icon: AlertTriangle,
    trend: { value: 50, type: 'decrease' as const },
    description: "vs last week"
  },
  {
    title: "Completion Rate",
    value: "94%",
    icon: TrendingUp,
    trend: { value: 6, type: 'increase' as const },
    description: "this month"
  }
];

const projects = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'Revolutionary product launch with AI-powered features and enhanced user experience.',
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
    overdueTasks: 2,
    members: [
      { id: '1', name: 'Alice Johnson', avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c3?w=32&h=32&fit=crop&crop=face' },
      { id: '2', name: 'Bob Smith', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
      { id: '3', name: 'Carol Davis', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' }
    ],
    dueDate: 'Dec 15, 2024',
    priority: 'high' as const,
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    name: 'Project Nova',
    description: 'Next-generation mobile app with seamless integration and real-time collaboration.',
    progress: 45,
    totalTasks: 18,
    completedTasks: 8,
    overdueTasks: 1,
    members: [
      { id: '4', name: 'David Wilson', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
      { id: '5', name: 'Eva Martinez', avatarUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face' }
    ],
    dueDate: 'Jan 30, 2025',
    priority: 'medium' as const,
    lastActivity: '1 day ago'
  },
  {
    id: '3',
    name: 'Project Orion',
    description: 'Enterprise platform redesign with focus on performance and scalability.',
    progress: 90,
    totalTasks: 15,
    completedTasks: 13,
    overdueTasks: 0,
    members: [
      { id: '6', name: 'Frank Brown', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
      { id: '7', name: 'Grace Lee', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' },
      { id: '8', name: 'Henry Kim', avatarUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=32&h=32&fit=crop&crop=face' },
      { id: '9', name: 'Ivy Chen', avatarUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=32&h=32&fit=crop&crop=face' }
    ],
    dueDate: 'Nov 28, 2024',
    priority: 'urgent' as const,
    lastActivity: '30 minutes ago'
  }
];

const activities = [
  {
    id: '1',
    type: 'task_completed',
    user: 'Alice Johnson',
    action: 'completed task "API Integration"',
    project: 'Project Alpha',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'project_updated',
    user: 'Bob Smith',
    action: 'updated project timeline',
    project: 'Project Nova',
    time: '4 hours ago'
  },
  {
    id: '3',
    type: 'task_assigned',
    user: 'Carol Davis',
    action: 'assigned task to David Wilson',
    project: 'Project Orion',
    time: '1 day ago'
  }
];

export default function Dashboard() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateProject = (data: any) => {
    // In a real app, this would make an API call
    console.log('Creating project:', data);
    toast({
      title: "Project Created",
      description: `${data.name} has been created successfully.`,
    });
  };

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-white"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back to CollaboroX 👋
          </h1>
          <p className="text-lg opacity-90 mb-6">
            You have 3 pending tasks and 2 upcoming deadlines. Let's get productive!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="lg" onClick={() => setIsCreateProjectOpen(true)}>
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Target className="h-5 w-5 mr-2" />
              View Goals
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
          <img 
            src={heroImage} 
            alt="Team collaboration" 
            className="h-full w-full object-cover object-left"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            className="animate-fade-in"
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Projects Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Active Projects</h2>
            <Button variant="outline" onClick={() => setIsCreateProjectOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
          
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
          
          <Card className="p-6 bg-gradient-surface border border-border/50">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-3 pb-4 border-b border-border last:border-b-0 last:pb-0"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.project}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-surface border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-3" />
                Create New Task
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-3" />
                Schedule Meeting
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="h-4 w-4 mr-3" />
                Invite Team Member
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <CreateProjectModal 
        open={isCreateProjectOpen} 
        onOpenChange={setIsCreateProjectOpen}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}