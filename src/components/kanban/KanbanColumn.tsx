import { motion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { Task, TaskStatus } from "@/types/task";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export function KanbanColumn({ id, title, color, tasks, onTaskUpdate }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col w-80 min-w-80">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn("h-3 w-3 rounded-full", color)} />
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <motion.div
        ref={setNodeRef}
        className={cn(
          "flex-1 p-4 rounded-2xl border-2 border-dashed transition-all duration-200 min-h-[500px]",
          isOver 
            ? "border-primary bg-primary/5" 
            : "border-border bg-surface-subtle"
        )}
        layout
      >
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <TaskCard
                  task={task}
                  onUpdate={(updates) => onTaskUpdate(task.id, updates)}
                />
              </motion.div>
            ))}
            
            {tasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No tasks yet</p>
                <p className="text-xs mt-1">Drag tasks here or create new ones</p>
              </div>
            )}
          </div>
        </SortableContext>
      </motion.div>
    </div>
  );
}