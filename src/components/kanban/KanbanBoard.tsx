import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { Task, TaskStatus } from "@/types/task";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: "todo", title: "Not Started", color: "bg-muted" },
  { id: "in_progress", title: "In Progress", color: "bg-warning/20" },
  { id: "done", title: "Completed", color: "bg-success/20" },
];

export function KanbanBoard({ tasks, onTaskMove, onTaskUpdate }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    
    // Check if we're dropping on a column or another task
    const targetColumn = columns.find(col => col.id === newStatus);
    if (targetColumn) {
      onTaskMove(taskId, newStatus);
    }
    
    setActiveTask(null);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full overflow-x-auto pb-6">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <SortableContext
              key={column.id}
              items={columnTasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                id={column.id}
                title={column.title}
                color={column.color}
                tasks={columnTasks}
                onTaskUpdate={onTaskUpdate}
              />
            </SortableContext>
          );
        })}
      </div>

      <DragOverlay>
        <AnimatePresence>
          {activeTask && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1.05, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <TaskCard
                task={activeTask}
                onUpdate={() => {}}
                isDragging
              />
            </motion.div>
          )}
        </AnimatePresence>
      </DragOverlay>
    </DndContext>
  );
}