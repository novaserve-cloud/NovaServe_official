import { Info, Lightbulb, AlertTriangle, AlertOctagon, FlaskConical, CircleSlash } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CalloutType = "note" | "tip" | "warning" | "important" | "experimental" | "deprecated";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Styles per type                                                    */
/* ------------------------------------------------------------------ */

const STYLES: Record<CalloutType, { bg: string; border: string; icon: React.ReactNode; label: string }> = {
  note: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800 border-l-blue-500",
    icon: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
    label: "Note",
  },
  tip: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800 border-l-emerald-500",
    icon: <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
    label: "Tip",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800 border-l-amber-500",
    icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
    label: "Warning",
  },
  important: {
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800 border-l-red-500",
    icon: <AlertOctagon className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />,
    label: "Important",
  },
  experimental: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-200 dark:border-purple-800 border-l-purple-500",
    icon: <FlaskConical className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />,
    label: "Experimental",
  },
  deprecated: {
    bg: "bg-gray-100 dark:bg-gray-800/60",
    border: "border-gray-300 dark:border-gray-700 border-l-gray-500",
    icon: <CircleSlash className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />,
    label: "Deprecated",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Callout({ type = "note", title, children }: CalloutProps) {
  const s = STYLES[type];

  return (
    <div className={`rounded-xl border border-l-4 p-4 ${s.bg} ${s.border}`}>
      <div className="flex items-start gap-2.5">
        {s.icon}
        <div className="space-y-1 min-w-0">
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {title || s.label}
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
