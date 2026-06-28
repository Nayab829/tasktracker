import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import TaskForm from './TaskForm';

export default function TaskModal({ isOpen, editingTask, onSubmit, onClose }) {
    const dialogRef = useRef(null);
    const isEditing = Boolean(editingTask?.id);

    /* Focus trap */
    useEffect(() => {
        if (!isOpen) return;
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = dialog.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        firstEl?.focus();

        function handleKeyDown(e) {
            if (e.key === 'Escape') { onClose(); return; }
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstEl) { e.preventDefault(); lastEl?.focus(); }
                } else {
                    if (document.activeElement === lastEl) { e.preventDefault(); firstEl?.focus(); }
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    /* Lock body scroll */
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            role="presentation"
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                    <h2 id="modal-title" className="text-text-primary font-semibold text-lg">
                        {isEditing ? 'Edit Task' : 'Add New Task'}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-text-muted hover:text-text-primary hover:bg-surface-2 p-1.5 rounded-lg transition-colors duration-150"
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                </div>

                {/* Form */}
                <div className="px-6 py-5 overflow-y-auto">
                    <TaskForm
                        initialData={editingTask}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </div>
    );
}
