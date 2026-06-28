import { ClipboardList, CheckCircle2, Clock, Loader2 } from 'lucide-react';

const VARIANTS = {
    total: {
        label: 'Total Tasks',
        color: 'text-accent',
        bg: 'bg-[rgba(108,99,255,0.12)]',
        border: 'border-[rgba(108,99,255,0.2)]',
        Icon: ClipboardList,
    },
    completed: {
        label: 'Completed',
        color: 'text-completed',
        bg: 'bg-[rgba(16,185,129,0.12)]',
        border: 'border-[rgba(16,185,129,0.2)]',
        Icon: CheckCircle2,
    },
    pending: {
        label: 'Pending',
        color: 'text-pending',
        bg: 'bg-[rgba(245,158,11,0.12)]',
        border: 'border-[rgba(245,158,11,0.2)]',
        Icon: Clock,
    },
    inProgress: {
        label: 'In Progress',
        color: 'text-inprogress',
        bg: 'bg-[rgba(59,130,246,0.12)]',
        border: 'border-[rgba(59,130,246,0.2)]',
        Icon: Loader2,
    },
};

export default function StatsCard({ variant, count }) {
    const { label, color, bg, border, Icon } = VARIANTS[variant];

    return (
        <article
            className="flex items-center gap-5 bg-surface border border-border rounded-xl px-6 py-5 hover:border-border-hover transition-colors duration-200"
            aria-label={`${label}: ${count}`}
        >
            <div className={`${bg} ${border} ${color} border rounded-xl p-3.5 shrink-0`} aria-hidden="true">
                <Icon size={22} strokeWidth={1.8} />
            </div>
            <div className="flex flex-col gap-0.5">
                <span className={`text-3xl font-bold leading-none ${color}`}>{count}</span>
                <span className="text-sm text-text-secondary mt-1">{label}</span>
            </div>
        </article>
    );
}
