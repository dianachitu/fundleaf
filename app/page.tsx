import Link from "next/link";
import { Leaf, ArrowRight, Zap, Bell, BarChart3, Check } from "lucide-react";

const TOPICS = [
  { slug: "schimbari-climatice", label: "Schimbări climatice", count: 74, emoji: "⛈️", bg: "#EEEDFE", text: "#26215C" },
  { slug: "impaduriri",          label: "Împăduriri",          count: 41, emoji: "🌳", bg: "#E1F5EE", text: "#04342C" },
  { slug: "educatie-mediu",      label: "Educație de mediu",   count: 38, emoji: "📚", bg: "#E6F1FB", text: "#042C53" },
  { slug: "economie-circulara",  label: "Economie circulară",  count: 33, emoji: "♻️", bg: "#E1F5EE", text: "#085041" },
  { slug: "eficienta-energetica",label: "Eficiență energetică",count: 29, emoji: "⚡", bg: "#EAF3DE", text: "#173404" },
  { slug: "risipa-alimentara",   label: "Risipă alimentară",   count: 22, emoji: "🧺", bg: "#FAEEDA", text: "#412402" },
  { slug: "calitatea-aerului",   label: "Calitatea aerului",   count: 17, emoji: "💨", bg: "#FBEAF0", text: "#4B1528" },
];

const STEPS = [
  { n: "01", icon: <Zap size={20} />, title: "Înregistrează-ți ONG-ul", desc: "Creează un cont gratuit și completează profilul organizației — tematici, țări, buget." },
  { n: "02", icon: <Bell size={20} />, title: "Primești alerte personalizate", desc: "AI-ul nostru scanează zilnic sute de surse și îți trimite notificări pentru granturile potrivite." },
  { n: "03", icon: <BarChart3 size={20} />, title: "Aplică și urmărește totul", desc: "Dashboard complet: checklist de documente, status aplicații, deadline-uri — totul într-un singur loc." },
];

const TESTIMONIALS = [
  { quote: "Am găsit în două ore granturi pe care le căutam de luni. Am câștigat primul grant european.", name: "Ana Mureșan", org: "Păduri Vii · Cluj-Napoca", initials: "AM", bg: "#E1F5EE", text: "#085041" },
  { quote: "Nu mai pierdem nicio oportunitate de finanțare. Alertele pe email sunt extraordinare.", name: "Radu Popescu", org: "AerCurat · București", initials: "RP", bg: "#EEEDFE", text: "#534AB7" },
  { quote: "Înainte petreceam 4 ore/săptămână căutând granturi pe zeci de site-uri. Acum totul e centralizat.", name: "Ioana Matei", org: "Circular RO · Timișoara", initials: "IM", bg: "#FAEEDA", text: "#633806" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar simplu pentru landing */}
      <header className="border-b border-bark-100 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-leaf-400 flex items-center justify-center">
              <Leaf size={14} className="text-white" />
            </span>
            <span className="font-display font-extrabold text-bark-900 text-[15px]">FundLeaf</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-bark-500">
            <Link href="/discover" className="hover:text-bark-900 transition-colors">Granturi</Link>
            <span className="hover:text-bark-900 transition-colors cursor-pointer">Cum funcționează</span>
            <span className="hover:text-bark-900 transition-colors cursor-pointer">Despre noi</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="text-sm text-bark-600 px-3 py-1.5 hover:text-bark-900 transition-colors">
              Autentificare
            </Link>
            <Link href="/auth/register" className="text-sm font-medium bg-leaf-400 text-white px-4 py-1.5 rounded-full hover:bg-leaf-600 transition-colors flex items-center gap-1.5">
              Înregistrare gratuită <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-leaf-50 text-leaf-800 text-xs font-medium px-3.5 py-1.5 rounded-full mb-6 border border-leaf-100">
          <span className="w-1.5 h-1.5 rounded-full bg-leaf-400 animate-pulse" />
          284 granturi active · actualizate zilnic prin AI
        </div>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl text-bark-900 leading-[1.1] mb-5 tracking-tight">
          The funding ecosystem<br />
          <span className="text-leaf-400">for environmental NGOs</span>
        </h1>
        <p className="text-bark-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Toate granturile europene și private pentru mediu, centralizate și actualizate automat. Gratuit pentru orice ONG.
        </p>
        <div className="flex items-center justify-center gap-3 mb-16">
          <Link href="/discover" className="flex items-center gap-2 bg-leaf-400 text-white px-6 py-3 rounded-full font-medium hover:bg-leaf-600 transition-colors">
            Explorează granturi <ArrowRight size={16} />
          </Link>
          <Link href="/auth/register" className="flex items-center gap-2 border border-bark-200 text-bark-700 px-6 py-3 rounded-full font-medium hover:bg-bark-50 transition-colors">
            Creează cont gratuit
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-16 text-center">
          {[["284", "granturi active"], ["€2.4 mld", "fonduri disponibile"], ["38", "țări eligibile"], ["100%", "gratuit"]].map(([val, lbl]) => (
            <div key={lbl}>
              <div className="font-display font-extrabold text-2xl text-bark-900">{val}</div>
              <div className="text-xs text-bark-400 mt-0.5">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="bg-bark-50 border-y border-bark-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold text-leaf-600 uppercase tracking-widest mb-2">Tematici acoperite</p>
          <h2 className="font-display font-extrabold text-3xl text-bark-900 mb-2">Orice cauză de mediu, finanțată</h2>
          <p className="text-bark-500 mb-8 text-sm">De la împăduriri până la economie circulară — acoperim toate temele relevante.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TOPICS.map((t) => (
              <Link key={t.slug} href={`/discover?topics=${t.slug}`}
                className="bg-white rounded-2xl border border-bark-100 p-4 hover:border-bark-200 hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: t.bg }}>
                  {t.emoji}
                </div>
                <div className="font-display font-bold text-[13px] text-bark-900 mb-0.5 group-hover:text-leaf-600 transition-colors">{t.label}</div>
                <div className="text-[11px] text-bark-400">{t.count} granturi</div>
              </Link>
            ))}
            <div className="bg-white rounded-2xl border border-dashed border-bark-200 p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-xl bg-bark-100 flex items-center justify-center text-xl mb-3">+</div>
              <div className="font-display font-bold text-[13px] text-bark-400">Mai multe</div>
              <div className="text-[11px] text-bark-300">în curând</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold text-leaf-600 uppercase tracking-widest mb-2">Cum funcționează</p>
        <h2 className="font-display font-extrabold text-3xl text-bark-900 mb-10">Simplu, rapid, gratuit</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-bark-50 rounded-2xl p-6 border border-bark-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-bark-300 font-display">{s.n}</span>
                <div className="w-9 h-9 rounded-xl bg-leaf-50 border border-leaf-100 flex items-center justify-center text-leaf-600">
                  {s.icon}
                </div>
              </div>
              <h3 className="font-display font-bold text-[15px] text-bark-900 mb-2">{s.title}</h3>
              <p className="text-sm text-bark-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-bark-50 border-y border-bark-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold text-leaf-600 uppercase tracking-widest mb-2">Ce spun ONG-urile</p>
          <h2 className="font-display font-extrabold text-3xl text-bark-900 mb-8">Folosit în toată Europa</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-bark-100 p-5">
                <p className="text-sm text-bark-600 italic leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: t.bg, color: t.text }}>{t.initials}</div>
                  <div>
                    <div className="text-xs font-semibold text-bark-900">{t.name}</div>
                    <div className="text-[11px] text-bark-400">{t.org}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-leaf-50 border-y border-leaf-100 py-20 text-center">
        <div className="max-w-lg mx-auto px-6">
          <div className="w-12 h-12 rounded-2xl bg-leaf-100 flex items-center justify-center mx-auto mb-5">
            <Leaf size={22} className="text-leaf-600" />
          </div>
          <h2 className="font-display font-extrabold text-3xl text-leaf-900 mb-3">Începe gratuit azi</h2>
          <p className="text-leaf-700 text-sm mb-7 leading-relaxed">
            Alătură-te celor peste 400 de ONG-uri de mediu care folosesc FundLeaf în toată Europa.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="emailul organizației tale"
              className="flex-1 px-4 py-2.5 rounded-full border border-leaf-200 bg-white text-sm focus:outline-none focus:border-leaf-400 placeholder:text-leaf-300" />
            <Link href="/auth/register"
              className="px-5 py-2.5 rounded-full bg-leaf-400 text-white text-sm font-medium hover:bg-leaf-600 transition-colors whitespace-nowrap">
              Înregistrare
            </Link>
          </div>
          <p className="text-xs text-leaf-500 mt-3 flex items-center justify-center gap-1.5">
            <Check size={11} /> Gratuit pentru totdeauna &nbsp;·&nbsp; <Check size={11} /> Fără card de credit
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bark-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-bark-400">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-leaf-400 flex items-center justify-center">
              <Leaf size={10} className="text-white" />
            </span>
            <span className="font-display font-bold text-bark-600">FundLeaf</span>
          </div>
          <div className="flex gap-5">
            {["Despre noi", "Termeni", "Confidențialitate", "Contact"].map((l) => (
              <span key={l} className="hover:text-bark-700 cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
          <span>© 2024 FundLeaf · The funding ecosystem for environmental NGOs</span>
        </div>
      </footer>
    </div>
  );
}
