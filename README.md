# 🌿 FundLeaf
### The funding ecosystem for environmental NGOs

Platformă gratuită care centralizează granturile europene și private pentru ONG-uri de mediu.

---

## Stack tehnic

| Componentă | Tehnologie |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | FastAPI (Python) |
| Baza de date | PostgreSQL |
| Scraping + AI | Python + Claude API (Anthropic) |
| Hosting frontend | Vercel |
| Hosting backend + DB | Railway |

---

## Instalare locală

### 1. Clonează repo-ul
```bash
git clone https://github.com/username/fundleaf.git
cd fundleaf
```

### 2. Frontend (Next.js)
```bash
npm install
cp .env.local.example .env.local
# Editează .env.local cu URL-ul API-ului tău
npm run dev
# Disponibil pe http://localhost:3000
```

### 3. Backend (FastAPI)
```bash
cd ../backend
pip install -r requirements.txt
cp .env.example .env
# Editează .env cu DATABASE_URL și ANTHROPIC_API_KEY
uvicorn main:app --reload
# API disponibil pe http://localhost:8000
# Docs: http://localhost:8000/docs
```

### 4. Baza de date
```bash
createdb fundleaf
psql -U postgres -d fundleaf -f schema.sql
```

### 5. Primul scraping
```bash
python scraper.py --once
```

---

## Deploy pe Vercel + Railway

### Railway (backend + DB)
1. Creează cont pe [railway.app](https://railway.app)
2. New Project → Deploy from GitHub → selectează repo-ul
3. Add PostgreSQL service
4. Setează variabilele de mediu: `DATABASE_URL`, `ANTHROPIC_API_KEY`, `JWT_SECRET`
5. Deploy automat la fiecare push pe `main`

### Vercel (frontend)
1. Creează cont pe [vercel.com](https://vercel.com)
2. Import Git Repository → selectează repo-ul
3. Setează `NEXT_PUBLIC_API_URL` cu URL-ul din Railway
4. Deploy → URL automat generat

### Domeniu custom
1. Cumpără `fundleaf.ro` pe [rotld.ro](https://rotld.ro)
2. În Vercel → Settings → Domains → Add `fundleaf.ro`
3. Adaugă recordurile DNS indicate de Vercel la registrar
4. SSL certificat generat automat (Let's Encrypt)

---

## Structura proiectului

```
fundleaf/
├── app/
│   ├── page.tsx              # Landing page
│   ├── discover/page.tsx     # Pagina de căutare granturi
│   ├── grants/[id]/page.tsx  # Detalii grant
│   ├── dashboard/page.tsx    # Dashboard ONG
│   └── auth/
│       ├── login/page.tsx
│       └── register/page.tsx
├── components/
│   ├── layout/Navbar.tsx
│   └── grants/GrantCard.tsx
├── lib/
│   ├── api.ts                # Client API
│   └── utils.ts              # Helpers
└── ...config files
```

---

## Variabile de mediu

```env
# .env.local (frontend)
NEXT_PUBLIC_API_URL=https://api.fundleaf.ro
NEXT_PUBLIC_SITE_NAME=FundLeaf
```

```env
# .env (backend)
DATABASE_URL=postgresql://user:pass@host:5432/fundleaf
ANTHROPIC_API_KEY=sk-ant-...
JWT_SECRET=secret-foarte-lung-si-random
```

---

Construit cu 🌿 pentru ONG-urile care luptă pentru un viitor mai curat.
