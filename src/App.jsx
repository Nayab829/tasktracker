import { useState } from 'react';
import { mockTasks } from './data/mockTasks';
import Dashboard from './pages/Dashboard';
import './index.css';

export default function App() {
  const [tasks, setTasks] = useState(mockTasks);

  function handleAdd(formData) {
    const newTask = {
      ...formData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function handleEdit(updatedTask) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
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
    </div>
  );
}
