import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Plus, 
  MoreVertical,
  Users,
  Calendar,
  Target,
  MessageSquare,
  FileText,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CreateTaskModal } from "@/components/modals/CreateTaskModal";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { useToast } from "@/hooks/use-toast";
import { Task, TaskStatus } from "@/types/task";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState("board");
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  // Initialize mock tasks data
  useState(() => {
    if (tasks.length === 0) {
      setTasks([
        {
          id: '1',
          projectId: projectId || '1',
          title: 'Design System Setup',
          description: 'Create the foundational design system components',
          assigneeId: '1',
          dueDate: '2024-12-20',
          priority: 'high',
          status: 'todo',
          tags: ['Frontend', 'Design'],
          createdAt: '2024-12-01',
        },
        {
          id: '2',
          projectId: projectId || '1',
          title: 'API Integration',
          description: 'Integrate with the backend API endpoints',
          assigneeId: '2',
          dueDate: '2024-12-25',
          priority: 'medium',
          status: 'in_progress',
          tags: ['Backend', 'API'],
          createdAt: '2024-12-02',
        },
        {
          id: '3',
          projectId: projectId || '1',
          title: 'User Testing',
          description: 'Conduct user testing sessions',
          assigneeId: '3',
          dueDate: '2024-12-15',
          priority: 'low',
          status: 'done',
          tags: ['Testing', 'Research'],
          createdAt: '2024-11-28',
        },
      ]);
    }
  });

  // Mock project data - in real app, fetch based on projectId
  const project = {
    id: projectId,
    name: 'Project Alpha',
    description: 'Revolutionary product launch with AI-powered features and enhanced user experience. This project involves multiple teams working together to deliver a cutting-edge solution.',
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
    overdueTasks: 2,
    members: [
      { id: '1', name: 'Alice Johnson', role: 'Project Manager', avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c3?w=32&h=32&fit=crop&crop=face' },
      { id: '2', name: 'Bob Smith', role: 'Developer', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
      { id: '3', name: 'Carol Davis', role: 'Designer', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
      { id: '4', name: 'David Wilson', role: 'QA Engineer', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' }
    ],
    dueDate: 'December 15, 2024',
    priority: 'high' as const,
    status: 'active',
    createdAt: 'November 1, 2024'
  };

  const handleCreateTask = (taskData: any) => {
    const newTask: Task = {
      id: Date.now().toString(),
      projectId: projectId || '1',
      title: taskData.name,
      description: taskData.description,
      assigneeId: taskData.assignee,
      dueDate: taskData.deadline?.toISOString(),
      priority: 'medium',
      status: 'todo',
      tags: taskData.tags,
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Task Created",
      description: `${taskData.name} has been added to the project.`,
    });
  };

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    toast({
      title: "Task Updated",
      description: "Task status has been updated.",
    });
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const priorityColors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-warning/20 text-warning border-warning/30",
    high: "bg-destructive/20 text-destructive border-destructive/30", 
    urgent: "bg-destructive text-destructive-foreground"
  };

  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border-b border-border p-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            {/* Project Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground truncate">
                  {project.name}
                </h1>
                <Badge className={priorityColors[project.priority]} variant="outline">
                  {project.priority} priority
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-4 text-lg">
                {project.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{project.progress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{project.totalTasks}</div>
                  <div className="text-sm text-muted-foreground">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{project.completedTasks}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{project.overdueTasks}</div>
                  <div className="text-sm text-muted-foreground">Overdue</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:w-80 space-y-6">
              {/* Project Details */}
              <Card className="p-4 bg-gradient-surface border border-border/50">
                <h3 className="font-semibold text-foreground mb-3">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <span className="text-sm font-medium text-foreground">{project.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium text-foreground">{project.createdAt}</span>
                  </div>
                </div>
              </Card>

              {/* Team Members */}
              <Card className="p-4 bg-gradient-surface border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Team Members</h3>
                  <Button variant="ghost" size="icon-sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {project.members.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatarUrl} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-4 bg-gradient-surface border border-border/50">
                <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setIsCreateTaskOpen(true)}>
                    <Plus className="h-4 w-4 mr-3" />
                    Add Task
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-3" />
                    Invite Member
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-3" />
                    Add File
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MoreVertical className="h-4 w-4 mr-3" />
                    Project Settings
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="board" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Board</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Files</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Insights</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="board" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Task Board</h3>
                    <p className="text-sm text-muted-foreground">Drag and drop tasks to update their status</p>
                  </div>
                  <Button onClick={() => setIsCreateTaskOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
                
                <KanbanBoard 
                  tasks={tasks}
                  onTaskMove={handleTaskMove}
                  onTaskUpdate={handleTaskUpdate}
                />
              </TabsContent>

              <TabsContent value="list" className="space-y-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Task List View
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    View all tasks in a detailed list format with sorting and filtering options.
                  </p>
                  <Button variant="hero" onClick={() => setIsCreateTaskOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="chat" className="space-y-6">
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Project Discussion
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Communicate with your team members about this project.
                  </p>
                  <Button variant="hero">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Conversation
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="files" className="space-y-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Files & Notes
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Upload files and add notes related to this project.
                  </p>
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Add File or Note
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Project Insights
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    View analytics and insights about project performance and team productivity.
                  </p>
                  <Button variant="hero">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>

      {/* Modals */}
      <CreateTaskModal 
        open={isCreateTaskOpen} 
        onOpenChange={setIsCreateTaskOpen}
        onSubmit={handleCreateTask}
        projectId={projectId}
        projectName={project.name}
      />
    </div>
  );
}