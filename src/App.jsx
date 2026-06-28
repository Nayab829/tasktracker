import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import './index.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── Fetch all tasks on mount ── */
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTasks();
      setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load tasks.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  /* ── Create ── */
  async function handleAdd(formData) {
    const toastId = toast.loading('Creating task…');
    try {
      const res = await createTask(formData);
      setTasks((prev) => [res.data.task, ...prev]);
      toast.success('Task created!', { id: toastId });
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.[0]?.message
        || 'Failed to create task.';
      toast.error(msg, { id: toastId });
    }
  }

  /* ── Update (optimistic) ── */
  async function handleEdit(updatedTask) {
    const toastId = toast.loading('Saving changes…');
    const previous = tasks;
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
    try {
      const { _id, __v, createdAt, updatedAt, ...data } = updatedTask;
      const res = await updateTask(_id, data);
      setTasks((prev) =>
        prev.map((t) => (t._id === res.data.task._id ? res.data.task : t))
      );
      toast.success('Task updated!', { id: toastId });
    } catch (err) {
      setTasks(previous);
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.[0]?.message
        || 'Failed to update task.';
      toast.error(msg, { id: toastId });
    }
  }

  /* ── Delete (optimistic) ── */
  async function handleDelete(_id) {
    const toastId = toast.loading('Deleting task…');
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== _id));
    try {
      await deleteTask(_id);
      toast.success('Task deleted.', { id: toastId });
    } catch (err) {
      setTasks(previous);
      const msg = err.response?.data?.message || 'Failed to delete task.';
      toast.error(msg, { id: toastId });
    }
  }

  /* ── Loading screen ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center gap-3">
        <Loader2 size={28} className="text-accent animate-spin" />
        <span className="text-text-secondary text-sm">Loading tasks…</span>
      </div>
    );
  }

  /* ── Error screen ── */
  if (error && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-high font-medium">{error}</p>
        <button
          onClick={fetchTasks}
          className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-150"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div id="app" className="min-h-screen bg-bg">
      <a href="#main-content" className="sr-only">Skip to main content</a>

      <Dashboard
        tasks={tasks}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#22263a',
            color: '#e8eaf0',
            border: '1px solid #2e3350',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#22263a' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#22263a' } },
        }}
      />
    </div>
  );
}
