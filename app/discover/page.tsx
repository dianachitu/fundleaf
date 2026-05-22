"use client";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import GrantCard from "@/components/grants/GrantCard";
import { getGrants, getTopics, type Grant, type Topic } from "@/lib/api";

const SORT_OPTIONS = [
  { value: "deadline", label: "Deadline: cel mai aproape" },
  { value: "amount",   label: "Sumă: descrescător" },
  { value: "created_at", label: "Adăugate recent" },
];

export default function DiscoverPage() {
  const [grants, setGrants]   = useState<Grant[]>([]);
  const [topics, setTopics]   = useState<Topic[]>([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ]             = useState("");
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [sort, setSort]       = useState("deadline");
  const [page, setPage]       = useState(1);

  useEffect(() => {
    getTopics().then(setTopics).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { sort, page: String(page), page_size: "12" };
    if (q) params.q = q;
    if (activeTopics.length) params.topics = activeTopics.join(",");
    getGrants(params)
      .then((r) => { setGrants(r.results); setTotal(r.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [q, activeTopics, sort, page]);

  const toggleTopic = (slug: string) =>
    setActiveTopics((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  return (
    <div className="min-h-screen bg-bark-50">
      <Navbar />

      {/* Hero search */}
      <div className="bg-white border-b border-bark-100 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display font-extrabold text-2xl text-bark-900 mb-1">Descoperă granturi</h1>
          <p className="text-bark-400 text-sm mb-5">
            {total > 0 ? `${total} granturi disponibile` : "Granturi pentru ONG-uri de mediu din Europa"}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2.5 bg-bark-50 border border-bark-200 rounded-full px-4 py-2.5 focus-within:border-leaf-400 transition-colors">
              <Search size={15} className="text-bark-400 shrink-0" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Caută granturi (ex: împăduriri, calitatea aerului...)"
                className="flex-1 bg-transparent text-sm text-bark-900 placeholder:text-bark-300 outline-none"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-bark-200 rounded-full px-3.5 py-2.5 bg-white text-bark-600 outline-none hover:border-bark-300 transition-colors"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Topic chips */}
          <div className="flex gap-2 flex-wrap mt-4">
            {topics.map((t) => (
              <button
                key={t.slug}
                onClick={() => { toggleTopic(t.slug); setPage(1); }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all"
                style={
                  activeTopics.includes(t.slug)
                    ? { background: t.color_bg, color: t.color_text, borderColor: t.color_text + "40" }
                    : { background: "white", color: "#888780", borderColor: "#D3D1C7" }
                }
              >
                {t.label}
                <span className="opacity-60">{t.grant_count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-bark-100 h-64 animate-pulse" />
            ))}
          </div>
        ) : grants.length === 0 ? (
          <div className="text-center py-20 text-bark-400">
            <p className="text-2xl mb-2">🌿</p>
            <p className="font-display font-bold text-bark-600">Niciun grant găsit</p>
            <p className="text-sm mt-1">Încearcă alte filtre sau caută alt termen</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {grants.map((g) => <GrantCard key={g.id} grant={g} />)}
            </div>
            {/* Pagination */}
            {total > 12 && (
              <div className="flex justify-center gap-2 mt-10">
                {page > 1 && (
                  <button onClick={() => setPage(p => p - 1)} className="px-4 py-2 rounded-full border border-bark-200 text-sm text-bark-600 hover:bg-white transition-colors">
                    ← Înapoi
                  </button>
                )}
                <span className="px-4 py-2 text-sm text-bark-400">
                  {page} / {Math.ceil(total / 12)}
                </span>
                {page < Math.ceil(total / 12) && (
                  <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 rounded-full border border-bark-200 text-sm text-bark-600 hover:bg-white transition-colors">
                    Înainte →
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
