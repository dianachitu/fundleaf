"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const { access_token } = await login(email, password);
      localStorage.setItem("token", access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Eroare la autentificare");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bark-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="w-9 h-9 rounded-xl bg-leaf-400 flex items-center justify-center">
              <Leaf size={18} className="text-white" />
            </span>
            <span className="font-display font-extrabold text-xl text-bark-900">FundLeaf</span>
          </Link>
          <h1 className="font-display font-extrabold text-2xl text-bark-900">Bine ai revenit</h1>
          <p className="text-sm text-bark-400 mt-1">Autentifică-te în contul tău</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-bark-100 p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-3 py-2.5 rounded-xl">{error}</div>
          )}
          <div>
            <label className="text-xs font-medium text-bark-600 block mb-1.5">Email organizație</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="ong@example.ro"
              className="w-full px-3.5 py-2.5 rounded-xl border border-bark-200 text-sm outline-none focus:border-leaf-400 transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-bark-600 block mb-1.5">Parolă</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-bark-200 text-sm outline-none focus:border-leaf-400 transition-colors pr-10" />
              <button type="button" onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-bark-400 hover:text-bark-600">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-leaf-400 text-white font-medium py-2.5 rounded-full text-sm hover:bg-leaf-600 transition-colors disabled:opacity-50">
            {loading ? "Se conectează..." : "Intră în cont"}
          </button>
        </form>

        <p className="text-center text-xs text-bark-400 mt-5">
          Nu ai cont?{" "}
          <Link href="/auth/register" className="text-leaf-600 font-medium hover:text-leaf-800">
            Înregistrare gratuită
          </Link>
        </p>
      </div>
    </div>
  );
}
