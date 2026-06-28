import { Search, Plus } from 'lucide-react';

export default function Header({ searchQuery, onSearchChange, onAddTask }) {
    return (
        <header className="sticky top-0 z-50 bg-surface border-b border-border shadow-md" role="banner">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">

                {/* Brand */}
                <div className="flex items-center gap-2.5 shrink-0">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-linear-to-br from-accent to-[#a78bfa]" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8.5L6 11.5L13 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-text-primary font-semibold text-lg tracking-tight hidden sm:block">
                        Task Tracker
                    </span>
                </div>

                {/* Search + Add */}
                <div className="flex items-center gap-3 flex-1 max-w-2xl justify-end">
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            className="w-full bg-surface-2 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary placeholder-text-muted transition-colors duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                            placeholder="Search tasks…"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            aria-label="Search tasks"
                            maxLength={200}
                        />
                    </div>

                    <button
                        onClick={onAddTask}
                        aria-label="Add new task"
                        className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 shrink-0"
                    >
                        <Plus size={15} aria-hidden="true" />
                        <span>Add Task</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
