import { ChevronDown, X } from 'lucide-react';

const STATUS_OPTIONS = ['All', 'Pending', 'In Progress', 'Completed'];
const PRIORITY_OPTIONS = ['All', 'Low', 'Medium', 'High'];
const SORT_OPTIONS = [
    { value: 'none', label: 'None' },
    { value: 'asc', label: 'Earliest First' },
    { value: 'desc', label: 'Latest First' },
];

function SelectControl({ id, label, value, options, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-xs font-medium text-text-muted uppercase tracking-wide">
                {label}
            </label>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="appearance-none bg-surface-2 border border-border text-text-primary text-sm rounded-lg px-3 py-2 pr-8 transition-colors duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer min-w-[130px]"
                >
                    {options.map((o) =>
                        typeof o === 'string'
                            ? <option key={o} value={o}>{o}</option>
                            : <option key={o.value} value={o.value}>{o.label}</option>
                    )}
                </select>
                <ChevronDown
                    size={12}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}

export default function TaskFilters({ filters, onFilterChange, taskCount }) {
    const hasActiveFilters =
        filters.status !== 'All' ||
        filters.priority !== 'All' ||
        filters.sortDue !== 'none' ||
        filters.sortCreated !== 'none';

    function clearAll() {
        onFilterChange({ status: 'All', priority: 'All', sortDue: 'none', sortCreated: 'none' });
    }

    return (
        <section
            className="bg-surface border border-border rounded-xl px-6 py-5"
            aria-label="Task filters and sorting"
        >
            <div className="flex flex-wrap items-end gap-5 justify-between">
                <div className="flex flex-wrap items-end gap-5">
                    <SelectControl
                        id="filter-status"
                        label="Status"
                        value={filters.status}
                        options={STATUS_OPTIONS}
                        onChange={(v) => onFilterChange({ ...filters, status: v })}
                    />
                    <SelectControl
                        id="filter-priority"
                        label="Priority"
                        value={filters.priority}
                        options={PRIORITY_OPTIONS}
                        onChange={(v) => onFilterChange({ ...filters, priority: v })}
                    />
                    <SelectControl
                        id="sort-due"
                        label="Sort by Due Date"
                        value={filters.sortDue}
                        options={SORT_OPTIONS}
                        onChange={(v) => onFilterChange({ ...filters, sortDue: v, sortCreated: 'none' })}
                    />
                    <SelectControl
                        id="sort-created"
                        label="Sort by Created"
                        value={filters.sortCreated}
                        options={SORT_OPTIONS}
                        onChange={(v) => onFilterChange({ ...filters, sortCreated: v, sortDue: 'none' })}
                    />

                    {hasActiveFilters && (
                        <button
                            onClick={clearAll}
                            aria-label="Clear all filters"
                            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-high bg-surface-2 hover:bg-[rgba(239,68,68,0.08)] border border-border hover:border-[rgba(239,68,68,0.3)] px-3 py-2 rounded-lg transition-colors duration-150 self-end"
                        >
                            <X size={13} aria-hidden="true" />
                            Clear
                        </button>
                    )}
                </div>

                <span className="text-sm text-text-muted self-end pb-2">
                    {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
                </span>
            </div>
        </section>
    );
}
