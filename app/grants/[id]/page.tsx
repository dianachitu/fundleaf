import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bookmark, ExternalLink, Check, X, Clock, MapPin, Globe, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { formatAmount, deadlineLabel, deadlineColor, TOPIC_META } from "@/lib/utils";
import { getGrant as fetchGrant } from "@/lib/api";

export default async function GrantPage({ params }: { params: { id: string } }) {
  let grant;
  try { grant = await fetchGrant(params.id); }
  catch { notFound(); }

  const days = grant.days_until_deadline;
  const primarySlug = grant.topic_slugs?.[0];
  const meta = primarySlug ? TOPIC_META[primarySlug] : null;

  return (
    <div className="min-h-screen bg-bark-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-bark-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-bark-400">
          <Link href="/discover" className="flex items-center gap-1 hover:text-bark-700 transition-colors">
            <ArrowLeft size={12} /> Descoperă
          </Link>
          <span>/</span>
          {grant.topic_labels?.[0] && <span>{grant.topic_labels[0]}</span>}
          <span>/</span>
          <span className="text-bark-600 truncate max-w-xs">{grant.title}</span>
        </div>
      </div>

      {/* Hero banner */}
      <div className="border-b border-bark-100" style={{ background: meta?.bg ?? "#F1EFE8" }}>
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-0 flex items-end gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-4 border-white -mb-8 bg-white shadow-sm z-10 shrink-0">
            {primarySlug === "impaduriri" ? "🌳" :
             primarySlug === "schimbari-climatice" ? "⛈️" :
             primarySlug === "educatie-mediu" ? "📚" :
             primarySlug === "economie-circulara" ? "♻️" :
             primarySlug === "eficienta-energetica" ? "⚡" :
             primarySlug === "risipa-alimentara" ? "🧺" :
             primarySlug === "calitatea-aerului" ? "💨" : "🌿"}
          </div>
          <div className="pb-6">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {grant.topic_labels?.slice(0, 2).map((label, i) => (
                <span key={i} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.7)", color: meta?.text ?? "#444" }}>
                  {label}
                </span>
              ))}
              {days !== null && days >= 0 && (
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                  days <= 14 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                }`}>
                  <Clock size={10} className="inline mr-0.5" />{days} zile rămase
                </span>
              )}
            </div>
            <h1 className="font-display font-extrabold text-xl text-bark-900 leading-snug mb-1.5">
              {grant.title}
            </h1>
            <div className="flex items-center gap-1.5 text-sm" style={{ color: meta?.text ?? "#444" }}>
              <span className="w-5 h-5 rounded-full bg-white/70 flex items-center justify-center text-[9px] font-bold">
                {grant.funder_name.slice(0, 2).toUpperCase()}
              </span>
              {grant.funder_name}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-16 flex gap-8 items-start">
        {/* Main */}
        <div className="flex-1 min-w-0 space-y-5">
          <div className="bg-white rounded-2xl border border-bark-100 p-6">
            <h2 className="font-display font-bold text-[15px] text-bark-900 mb-3">Despre acest grant</h2>
            <p className="text-sm text-bark-600 leading-relaxed">{grant.description}</p>
          </div>

          <div className="bg-white rounded-2xl border border-bark-100 p-6">
            <h2 className="font-display font-bold text-[15px] text-bark-900 mb-3">Cine poate aplica</h2>
            <div className="space-y-2">
              {["ONG-uri de mediu înregistrate în UE", "Autorități publice locale și regionale", "Institute de cercetare și universități", "Consorții internaționale (min. 2 entități)"].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-bark-600">
                  <Check size={14} className="text-leaf-400 shrink-0" />{item}
                </div>
              ))}
              <div className="flex items-center gap-2.5 text-sm text-bark-400">
                <X size={14} className="text-red-400 shrink-0" />Entități comerciale ca aplicant principal
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-bark-100 p-6">
            <h2 className="font-display font-bold text-[15px] text-bark-900 mb-3">Documente necesare</h2>
            <div className="space-y-2">
              {[["Formular de aplicare (eGrants)", "Obligatoriu"], ["Plan financiar detaliat (3 ani)", "Obligatoriu"], ["Statut ONG + dovadă înregistrare", "Obligatoriu"], ["Scrisori de parteneriat (dacă e consorțiu)", "Dacă e cazul"]].map(([doc, status]) => (
                <div key={doc} className="flex items-center justify-between py-2 px-3 rounded-xl bg-bark-50">
                  <span className="text-sm text-bark-700">{doc}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                    status === "Obligatoriu" ? "bg-leaf-50 text-leaf-700 border border-leaf-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 shrink-0 space-y-4">
          {/* Deadline + CTA */}
          <div className="bg-white rounded-2xl border border-bark-100 p-5">
            {days !== null && days >= 0 && (
              <div className={`rounded-xl p-3 text-center mb-3 ${days <= 14 ? "bg-red-50" : "bg-amber-50"}`}>
                <div className={`font-display font-extrabold text-3xl ${days <= 14 ? "text-red-600" : "text-amber-600"}`}>{days}</div>
                <div className={`text-xs mt-0.5 ${days <= 14 ? "text-red-500" : "text-amber-500"}`}>zile rămase</div>
              </div>
            )}
            {grant.deadline && (
              <p className="text-xs text-bark-400 text-center mb-4">
                Deadline: <strong className="text-bark-700">{new Date(grant.deadline).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}</strong>
              </p>
            )}
            <a href={grant.apply_url} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-leaf-400 text-white text-sm font-medium py-2.5 rounded-full hover:bg-leaf-600 transition-colors mb-2">
              <ExternalLink size={14} /> Aplică acum
            </a>
            <button className="w-full flex items-center justify-center gap-2 border border-bark-200 text-bark-600 text-sm py-2.5 rounded-full hover:bg-bark-50 transition-colors">
              <Bookmark size={14} /> Salvează
            </button>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-bark-100 p-5">
            <h3 className="font-display font-bold text-[13px] text-bark-900 mb-3">Detalii financiare</h3>
            <div className="space-y-2.5">
              {[
                ["Sumă", formatAmount(grant.amount_min, grant.amount_max)],
                ["Co-finanțare", grant.cofinancing_pct ? `${grant.cofinancing_pct}% UE` : "—"],
                ["Durată", grant.duration_months_min ? `${grant.duration_months_min}–${grant.duration_months_max ?? "?"} luni` : "—"],
                ["Eligibilitate", grant.eligible_countries?.join(", ") || "Global"],
                ["Limbă", grant.language?.join(", ") || "EN"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-bark-400">{label}</span>
                  <span className="font-medium text-bark-800 text-right max-w-[100px] truncate" title={String(value)}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
