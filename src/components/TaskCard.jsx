import { Calendar, Pencil, Trash2 } from 'lucide-react';

const STATUS_CONFIG = {
    'Pending': { badge: 'bg-[rgba(245,158,11,0.15)] text-pending border border-[rgba(245,158,11,0.3)]' },
    'In Progress': { badge: 'bg-[rgba(59,130,246,0.15)] text-inprogress border border-[rgba(59,130,246,0.3)]' },
    'Completed': { badge: 'bg-[rgba(16,185,129,0.15)] text-completed border border-[rgba(16,185,129,0.3)]' },
};

const PRIORITY_CONFIG = {
    'Low': { dot: 'bg-low', text: 'text-low' },
    'Medium': { dot: 'bg-medium', text: 'text-medium' },
    'High': { dot: 'bg-high', text: 'text-high' },
};

function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });
}

function isOverdue(dateStr, status) {
    if (!dateStr || status === 'Completed') return false;
    return new Date(dateStr + 'T00:00:00') < new Date(new Date().toDateString());
}

export default function TaskCard({ task, onEdit, onDelete }) {
    const statusCfg = STATUS_CONFIG[task.status] || STATUS_CONFIG['Pending'];
    const priorityCfg = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG['Low'];
    const overdue = isOverdue(task.dueDate, task.status);

    return (
        <article
            className="flex flex-col gap-3.5 bg-surface border border-border rounded-xl p-6 hover:border-border-hover hover:shadow-lg transition-all duration-200"
            aria-label={`Task: ${task.title}`}
        >
            {/* Status + Priority */}
            <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusCfg.badge}`}>
                    {task.status}
                </span>
                <span className={`flex items-center gap-1.5 text-xs font-medium ${priorityCfg.text}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${priorityCfg.dot}`} aria-hidden="true" />
                    {task.priority}
                </span>
            </div>

            {/* Title */}
            <h3 className={`text-text-primary font-semibold leading-snug ${task.status === 'Completed' ? 'line-through opacity-60' : ''}`}>
                {task.title}
            </h3>

            {/* Description */}
            {task.description && (
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {task.description}
                </p>
            )}

            {/* Due date */}
            <div className={`flex items-center gap-1.5 text-xs mt-auto ${overdue ? 'text-high' : 'text-text-muted'}`}>
                <Calendar size={13} aria-hidden="true" />
                <span>{overdue ? 'Overdue · ' : 'Due '}{formatDate(task.dueDate)}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-border">
                <button
                    onClick={() => onEdit(task)}
                    aria-label={`Edit task: ${task.title}`}
                    className="flex items-center gap-1.5 flex-1 justify-center text-sm text-text-secondary hover:text-accent hover:bg-[rgba(108,99,255,0.08)] py-1.5 rounded-lg transition-colors duration-150"
                >
                    <Pencil size={14} aria-hidden="true" />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    aria-label={`Delete task: ${task.title}`}
                    className="flex items-center gap-1.5 flex-1 justify-center text-sm text-text-secondary hover:text-high hover:bg-[rgba(239,68,68,0.08)] py-1.5 rounded-lg transition-colors duration-150"
                >
                    <Trash2 size={14} aria-hidden="true" />
                    Delete
                </button>
            </div>
        </article>
    );
}
