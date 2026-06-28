import { useState, useMemo } from 'react';
import { ClipboardX, Plus } from 'lucide-react';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import TaskFilters from '../components/TaskFilters';
import TaskModal from '../components/TaskModal';

function EmptyState({ hasFilters, onAddTask }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center" role="status">
            <div className="w-20 h-20 rounded-full bg-[rgba(108,99,255,0.08)] flex items-center justify-center" aria-hidden="true">
                <ClipboardX size={36} className="text-accent opacity-70" strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-text-primary font-semibold text-lg">
                    {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
                </h3>
                <p className="text-text-secondary text-sm mt-1 max-w-xs">
                    {hasFilters
                        ? 'No tasks match the current filters. Try adjusting or clearing your filters.'
                        : 'No tasks found. Create your first task.'}
                </p>
            </div>
            {!hasFilters && (
                <button
                    onClick={onAddTask}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-150 mt-2"
                >
                    <Plus size={15} aria-hidden="true" />
                    Create Task
                </button>
            )}
        </div>
    );
}

export default function Dashboard({ tasks, onAdd, onEdit, onDelete }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: 'All', priority: 'All', sortDue: 'none', sortCreated: 'none',
    });

    const visibleTasks = useMemo(() => {
        let result = [...tasks];
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(
                (t) => t.title.toLowerCase().includes(q) ||
                    (t.description && t.description.toLowerCase().includes(q))
            );
        }
        if (filters.status !== 'All') result = result.filter((t) => t.status === filters.status);
        if (filters.priority !== 'All') result = result.filter((t) => t.priority === filters.priority);
        if (filters.sortDue !== 'none') {
            result.sort((a, b) => {
                const da = new Date(a.dueDate), db = new Date(b.dueDate);
                return filters.sortDue === 'asc' ? da - db : db - da;
            });
        } else if (filters.sortCreated !== 'none') {
            result.sort((a, b) => {
                const da = new Date(a.createdAt), db = new Date(b.createdAt);
                return filters.sortCreated === 'asc' ? da - db : db - da;
            });
        }
        return result;
    }, [tasks, searchQuery, filters]);

    const stats = useMemo(() => ({
        total: tasks.length,
        completed: tasks.filter((t) => t.status === 'Completed').length,
        pending: tasks.filter((t) => t.status === 'Pending').length,
        inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    }), [tasks]);

    function openAddModal() { setEditingTask(null); setModalOpen(true); }
    function openEditModal(task) { setEditingTask(task); setModalOpen(true); }
    function closeModal() { setModalOpen(false); setEditingTask(null); }

    function handleFormSubmit(formData) {
        editingTask?.id ? onEdit({ ...editingTask, ...formData }) : onAdd(formData);
        closeModal();
    }

    const hasActiveFilters =
        filters.status !== 'All' || filters.priority !== 'All' ||
        filters.sortDue !== 'none' || filters.sortCreated !== 'none' ||
        Boolean(searchQuery.trim());

    return (
        <>
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onAddTask={openAddModal} />

            <main id="main-content" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 flex flex-col gap-8">
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" aria-label="Task statistics">
                    <StatsCard variant="total" count={stats.total} />
                    <StatsCard variant="completed" count={stats.completed} />
                    <StatsCard variant="pending" count={stats.pending} />
                    <StatsCard variant="inProgress" count={stats.inProgress} />
                </section>

                <TaskFilters filters={filters} onFilterChange={setFilters} taskCount={visibleTasks.length} />

                <section aria-label="Task list">
                    {visibleTasks.length === 0 ? (
                        <EmptyState hasFilters={hasActiveFilters} onAddTask={openAddModal} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {visibleTasks.map((task) => (
                                <TaskCard key={task.id} task={task} onEdit={openEditModal} onDelete={onDelete} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <TaskModal isOpen={modalOpen} editingTask={editingTask} onSubmit={handleFormSubmit} onClose={closeModal} />
        </>
    );
}
