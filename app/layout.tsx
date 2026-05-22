import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FundLeaf — The funding ecosystem for environmental NGOs",
  description: "Discover European and private grants for environmental NGOs. Climate change, reforestation, circular economy and more — all in one place, updated daily.",
  keywords: ["grants", "NGO", "environment", "climate", "funding", "EU grants"],
  openGraph: {
    title: "FundLeaf",
    description: "The funding ecosystem for environmental NGOs",
    url: "https://fundleaf.ro",
    siteName: "FundLeaf",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
