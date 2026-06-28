import { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

const EMPTY_FORM = {
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Low',
    dueDate: '',
};

function validate(fields) {
    const errors = {};
    if (!fields.title.trim()) errors.title = 'Task title is required.';
    if (!fields.dueDate) errors.dueDate = 'Due date is required.';
    return errors;
}

const inputBase = "w-full bg-surface-2 border border-border text-text-primary text-sm rounded-lg px-3 py-2.5 placeholder-text-muted transition-colors duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent";
const inputError = "border-high focus:border-high focus:ring-high";
const labelBase = "block text-sm font-medium text-text-secondary mb-1.5";
const selectBase = "w-full appearance-none bg-surface-2 border border-border text-text-primary text-sm rounded-lg px-3 py-2.5 pr-9 transition-colors duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer";

// Converts any date string (ISO or YYYY-MM-DD) to the YYYY-MM-DD format
// required by <input type="date">
function toDateInputValue(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toISOString().slice(0, 10);
}

export default function TaskForm({ initialData, onSubmit, onCancel }) {
    const [fields, setFields] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const isEditing = Boolean(initialData?._id);

    useEffect(() => {
        if (initialData) {
            setFields({
                ...EMPTY_FORM,
                ...initialData,
                dueDate: toDateInputValue(initialData.dueDate),
            });
        } else {
            setFields(EMPTY_FORM);
        }
        setErrors({});
        setTouched({});
    }, [initialData]);

    function handleChange(e) {
        const { name, value } = e.target;
        const next = { ...fields, [name]: value };
        setFields(next);
        if (touched[name]) setErrors(validate(next));
    }

    function handleBlur(e) {
        const { name } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
        setErrors(validate(fields));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setTouched({ title: true, dueDate: true });
        const errs = validate(fields);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;
        onSubmit(fields);
    }

    const hasErrors = Object.keys(validate(fields)).length > 0;
    const submitDisabled = hasErrors && Object.keys(touched).length > 0;

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            aria-label={isEditing ? 'Edit task form' : 'Add task form'}
            className="flex flex-col gap-5"
        >
            {/* Title */}
            <div>
                <label htmlFor="task-title" className={labelBase}>
                    Task Title <span className="text-high" aria-hidden="true">*</span>
                </label>
                <input
                    id="task-title" name="title" type="text" maxLength={100}
                    className={`${inputBase} ${errors.title && touched.title ? inputError : ''}`}
                    placeholder="e.g. Implement authentication flow"
                    value={fields.title}
                    onChange={handleChange} onBlur={handleBlur}
                    aria-required="true"
                    aria-describedby={errors.title && touched.title ? 'error-title' : undefined}
                    aria-invalid={Boolean(errors.title && touched.title)}
                    autoFocus
                />
                {errors.title && touched.title && (
                    <p id="error-title" className="mt-1.5 flex items-center gap-1.5 text-xs text-high" role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="task-description" className={labelBase}>Description</label>
                <textarea
                    id="task-description" name="description" rows={3} maxLength={500}
                    className={`${inputBase} resize-none`}
                    placeholder="Add a short description…"
                    value={fields.description}
                    onChange={handleChange}
                />
            </div>

            {/* Status + Priority */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="task-status" className={labelBase}>Status</label>
                    <div className="relative">
                        <select id="task-status" name="status" className={selectBase} value={fields.status} onChange={handleChange}>
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                    </div>
                </div>
                <div>
                    <label htmlFor="task-priority" className={labelBase}>Priority</label>
                    <div className="relative">
                        <select id="task-priority" name="priority" className={selectBase} value={fields.priority} onChange={handleChange}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                    </div>
                </div>
            </div>

            {/* Due Date */}
            <div>
                <label htmlFor="task-due" className={labelBase}>
                    Due Date <span className="text-high" aria-hidden="true">*</span>
                </label>
                <input
                    id="task-due" name="dueDate" type="date"
                    className={`${inputBase} ${errors.dueDate && touched.dueDate ? inputError : ''} scheme-dark`}
                    value={fields.dueDate}
                    onChange={handleChange} onBlur={handleBlur}
                    aria-required="true"
                    aria-describedby={errors.dueDate && touched.dueDate ? 'error-dueDate' : undefined}
                    aria-invalid={Boolean(errors.dueDate && touched.dueDate)}
                />
                {errors.dueDate && touched.dueDate && (
                    <p id="error-dueDate" className="mt-1.5 flex items-center gap-1.5 text-xs text-high" role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.dueDate}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
                <button
                    type="button" onClick={onCancel}
                    className="flex-1 text-sm text-text-secondary hover:text-text-primary bg-surface-2 hover:bg-border border border-border py-2.5 rounded-lg transition-colors duration-150"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitDisabled}
                    aria-disabled={submitDisabled}
                    className={`flex-1 text-sm font-medium py-2.5 rounded-lg transition-colors duration-150 ${submitDisabled
                        ? 'bg-accent/40 text-white/40 cursor-not-allowed'
                        : 'bg-accent hover:bg-accent-hover text-white cursor-pointer'
                        }`}
                >
                    {isEditing ? 'Save Changes' : 'Add Task'}
                </button>
            </div>
        </form>
    );
}
