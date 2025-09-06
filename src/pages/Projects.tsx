import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  SortAsc,
  Users,
  Calendar,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock projects data
const allProjects = [
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
    lastActivity: '2 hours ago',
    status: 'active'
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
    lastActivity: '1 day ago',
    status: 'active'
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
    lastActivity: '30 minutes ago',
    status: 'active'
  },
  {
    id: '4',
    name: 'Project Zenith',
    description: 'Customer analytics dashboard with advanced reporting capabilities.',
    progress: 30,
    totalTasks: 20,
    completedTasks: 6,
    overdueTasks: 0,
    members: [
      { id: '10', name: 'Jack Wilson', avatarUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=32&h=32&fit=crop&crop=face' },
      { id: '11', name: 'Kate Johnson', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face' }
    ],
    dueDate: 'Feb 28, 2025',
    priority: 'low' as const,
    lastActivity: '3 days ago',
    status: 'planning'
  },
  {
    id: '5',
    name: 'Project Cosmos',
    description: 'API integration platform for third-party services.',
    progress: 100,
    totalTasks: 12,
    completedTasks: 12,
    overdueTasks: 0,
    members: [
      { id: '12', name: 'Leo Garcia', avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=32&h=32&fit=crop&crop=face' }
    ],
    dueDate: 'Oct 15, 2024',
    priority: 'medium' as const,
    lastActivity: '1 week ago',
    status: 'completed'
  }
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort projects
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'progress':
        return b.progress - a.progress;
      case 'due':
        return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
      case 'recent':
      default:
        return 0; // Keep original order for recent
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your team's projects
          </p>
        </div>
        
        <Button variant="hero" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </Button>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="due">Due Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Active Filters */}
      {(filterStatus !== 'all' || filterPriority !== 'all' || searchQuery) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-wrap gap-2"
        >
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-foreground">
                ×
              </button>
            </Badge>
          )}
          {filterStatus !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Status: {filterStatus}
              <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-foreground">
                ×
              </button>
            </Badge>
          )}
          {filterPriority !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Priority: {filterPriority}
              <button onClick={() => setFilterPriority('all')} className="ml-1 hover:text-foreground">
                ×
              </button>
            </Badge>
          )}
        </motion.div>
      )}

      {/* Projects Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {sortedProjects.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || filterStatus !== 'all' || filterPriority !== 'all'
                ? "Try adjusting your search or filters"
                : "Get started by creating your first project"
              }
            </p>
            {(!searchQuery && filterStatus === 'all' && filterPriority === 'all') && (
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}