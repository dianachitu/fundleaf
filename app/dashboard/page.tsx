"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, TrendingUp, Trophy, Clock, Bookmark, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { getStats, getApplications, getDeadlines, getSavedGrants, type OrgStats, type Application, type DeadlineItem } from "@/lib/api";
import { formatAmount, deadlineColor } from "@/lib/utils";

const STATUS_META: Record<string, { label: string; bg: string; text: string }> = {
  draft:     { label: "Ciornă",      bg: "#F1EFE8", text: "#5F5E5A" },
  applied:   { label: "Aplicat",     bg: "#E6F1FB", text: "#185FA5" },
  in_review: { label: "În evaluare", bg: "#FAEEDA", text: "#854F0B" },
  won:       { label: "Câștigat",    bg: "#E1F5EE", text: "#085041" },
  declined:  { label: "Respins",     bg: "#FCEBEB", text: "#A32D2D" },
  withdrawn: { label: "Retras",      bg: "#F1EFE8", text: "#888780" },
};

export default function DashboardPage() {
  const [stats, setStats]         = useState<OrgStats | null>(null);
  const [apps, setApps]           = useState<Application[]>([]);
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";

  useEffect(() => {
    if (!token) return;
    getStats(token).then(setStats).catch(() => {});
    getApplications(token).then(setApps).catch(() => {});
    getDeadlines(token).then(setDeadlines).catch(() => {});
  }, [token]);

  const mockStats = { total_applications: 8, won_applications: 3, active_applications: 2, total_funds_won: 284000, saved_grants_count: 7 };
  const s = stats ?? mockStats;

  return (
    <div className="min-h-screen bg-bark-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-bark-900">Bună dimineața</h1>
            <p className="text-sm text-bark-400 mt-0.5">Ai {deadlines.length || 2} deadline-uri în următoarele 30 de zile</p>
          </div>
          <Link href="/discover"
            className="flex items-center gap-2 bg-leaf-400 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-leaf-600 transition-colors">
            <Plus size={14} /> Găsește granturi noi
          </Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <TrendingUp size={16} />, label: "Aplicații totale", value: s.total_applications, sub: "+2 față de anul trecut", subColor: "text-leaf-600" },
            { icon: <Trophy size={16} />,     label: "Câștigate",         value: s.won_applications, sub: `Rată ${Math.round(s.won_applications / (s.total_applications || 1) * 100)}%`, subColor: "text-leaf-600" },
            { icon: <Leaf size={16} />,       label: "Fonduri atrase",    value: `€${Math.round(s.total_funds_won / 1000)}K`, sub: "+€120K în 2024", subColor: "text-leaf-600" },
            { icon: <Bookmark size={16} />,   label: "Granturi salvate",  value: s.saved_grants_count, sub: "3 cu deadline aproape", subColor: "text-bark-400" },
          ].map((m) => (
            <div key={m.label} className="bg-bark-100 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 text-xs text-bark-400 mb-2">
                {m.icon}{m.label}
              </div>
              <div className="font-display font-extrabold text-2xl text-bark-900">{m.value}</div>
              <div className={`text-xs mt-1 ${m.subColor}`}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Applications */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-bark-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-[15px] text-bark-900">Aplicații recente</h2>
              <Link href="/dashboard/applications" className="text-xs text-leaf-600 hover:text-leaf-800">Vezi toate</Link>
            </div>
            <div className="space-y-1">
              {[
                { title: "LIFE Programme – Nature & Biodiversity", org: "Comisia Europeană", amount: 2500000, status: "in_review", emoji: "🌳" },
                { title: "Lidl Sustainability Fund – Food Waste",  org: "Lidl International", amount: 150000,  status: "applied",   emoji: "🧺" },
                { title: "IKEA Foundation – Climate & Energy",    org: "IKEA Foundation",   amount: 500000,  status: "won",       emoji: "⚡" },
                { title: "European Climate Foundation – Core",    org: "ECF",               amount: 200000,  status: "draft",     emoji: "⛈️" },
                { title: "UNEP / GEF – Air Quality",              org: "UNEP",              amount: 50000,   status: "declined",  emoji: "💨" },
              ].map((a) => {
                const sm = STATUS_META[a.status] ?? STATUS_META.draft;
                return (
                  <div key={a.title} className="flex items-center gap-3 py-2.5 border-b border-bark-50 last:border-0">
                    <span className="w-8 h-8 rounded-lg bg-bark-50 flex items-center justify-center text-base shrink-0">{a.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-bark-900 truncate">{a.title}</p>
                      <p className="text-xs text-bark-400">{a.org}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-leaf-600">{formatAmount(null, a.amount)}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium mt-0.5 inline-block"
                        style={{ background: sm.bg, color: sm.text }}>{sm.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Deadlines */}
            <div className="bg-white rounded-2xl border border-bark-100 p-5">
              <h2 className="font-display font-bold text-[15px] text-bark-900 mb-3 flex items-center gap-1.5">
                <Clock size={14} className="text-red-400" /> Deadline-uri
              </h2>
              <div className="space-y-2.5">
                {[
                  { title: "LIFE Programme",       days: 18, color: "bg-red-400" },
                  { title: "ECF Core Grants",       days: 24, color: "bg-amber-400" },
                  { title: "EEA Grants – Climate",  days: 31, color: "bg-amber-300" },
                  { title: "Lidl Sustainability",   days: 54, color: "bg-leaf-400" },
                ].map((d) => (
                  <div key={d.title} className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${d.color} shrink-0`} />
                    <span className="text-xs text-bark-700 flex-1 truncate">{d.title}</span>
                    <span className={`text-xs font-semibold shrink-0 ${
                      d.days <= 14 ? "text-red-600" : d.days <= 30 ? "text-amber-600" : "text-leaf-600"
                    }`}>{d.days}z</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-bark-100 p-5">
              <h2 className="font-display font-bold text-[15px] text-bark-900 mb-3">Notificări</h2>
              <div className="space-y-3">
                {[
                  { icon: "✨", text: "3 granturi noi pe tema împăduririlor", time: "acum 2h", bg: "#E1F5EE" },
                  { icon: "⏰", text: "LIFE Programme — 18 zile rămase", time: "ieri", bg: "#FAEEDA" },
                  { icon: "📩", text: "Aplicația la IKEA Foundation aprobată!", time: "acum 3 zile", bg: "#EEEDFE" },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5"
                      style={{ background: n.bg }}>{n.icon}</span>
                    <div>
                      <p className="text-xs text-bark-700 leading-snug">{n.text}</p>
                      <p className="text-[10px] text-bark-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
