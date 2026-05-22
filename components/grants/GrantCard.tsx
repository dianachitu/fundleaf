import Link from "next/link";
import { Bookmark, MapPin, Calendar } from "lucide-react";
import { Grant, formatAmount, deadlineLabel, deadlineColor, TOPIC_META } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Grant as GrantType } from "@/lib/api";

interface Props { grant: GrantType; }

export default function GrantCard({ grant }: Props) {
  const primarySlug = grant.topic_slugs?.[0];
  const meta = primarySlug ? TOPIC_META[primarySlug] : null;
  const days = grant.days_until_deadline;

  return (
    <Link href={`/grants/${grant.id}`} className="group block">
      <article className="bg-white rounded-2xl border border-bark-100 overflow-hidden hover:border-bark-200 transition-all duration-200 hover:-translate-y-0.5">

        {/* Header banner */}
        <div
          className="h-28 flex items-center justify-center relative"
          style={{ background: meta?.bg ?? "#F1EFE8" }}
        >
          {/* Topic icon placeholder — big centered */}
          <span className="text-4xl opacity-20 select-none">
            {primarySlug === "impaduriri" ? "🌳" :
             primarySlug === "schimbari-climatice" ? "⛈️" :
             primarySlug === "educatie-mediu" ? "📚" :
             primarySlug === "economie-circulara" ? "♻️" :
             primarySlug === "eficienta-energetica" ? "⚡" :
             primarySlug === "risipa-alimentara" ? "🧺" :
             primarySlug === "calitatea-aerului" ? "💨" : "🌿"}
          </span>

          {/* Org pill */}
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 bg-white/85 rounded-full px-2.5 py-1">
            <span className="w-4 h-4 rounded-full bg-bark-100 flex items-center justify-center text-[9px] font-bold text-bark-600">
              {grant.funder_name.slice(0, 2).toUpperCase()}
            </span>
            <span className="text-[11px] font-medium text-bark-800 max-w-[120px] truncate">
              {grant.funder_name}
            </span>
          </div>

          {/* Deadline badge */}
          {days !== null && (
            <div className={cn(
              "absolute top-2.5 right-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full",
              days <= 14 ? "bg-red-100 text-red-700" :
              days <= 30 ? "bg-amber-100 text-amber-700" :
              "bg-leaf-50 text-leaf-800"
            )}>
              {deadlineLabel(days)}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap mb-2.5">
            {grant.topic_labels?.slice(0, 2).map((label, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: TOPIC_META[grant.topic_slugs?.[i]]?.bg ?? "#F1EFE8",
                  color: TOPIC_META[grant.topic_slugs?.[i]]?.text ?? "#444",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <h3 className="font-display font-bold text-[13px] text-bark-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-leaf-600 transition-colors">
            {grant.title}
          </h3>
          <p className="text-[12px] text-bark-500 line-clamp-2 leading-relaxed mb-3">
            {grant.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[11px] text-bark-400">
              {grant.eligible_countries?.length > 0 && (
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {grant.eligible_countries.slice(0, 2).join(", ")}
                  {grant.eligible_countries.length > 2 && " +"}
                </span>
              )}
              {grant.deadline && (
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {new Date(grant.deadline).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}
                </span>
              )}
            </div>
            <span className="text-[13px] font-semibold text-leaf-600">
              {formatAmount(grant.amount_min, grant.amount_max)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
