import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";

// Configuração das fontes usando next/font para otimização automática
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Configuração da viewport para responsividade
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0f172a",
};

// Objeto para os Dados Estruturados (JSON-LD) para manter o código principal limpo
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Caçadores de Falhas",
  description: "Plataforma de detecção de ondas gravitacionais",
  url: "https://cacadores-de-falhas.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://cacadores-de-falhas.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Metadados do site para SEO e compartilhamento em redes sociais
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Caçadores de Falhas - Detecção de Ondas Gravitacionais",
    template: "%s | Caçadores de Falhas",
  },
  description:
    "Plataforma avançada para detecção e análise de ondas gravitacionais usando inteligência artificial. Contribua para descobertas científicas revolucionárias.",
  keywords: [
    "ondas gravitacionais",
    "LIGO",
    "Virgo",
    "astronomia",
    "física",
    "inteligência artificial",
    "machine learning",
    "ciência cidadã",
    "pesquisa científica",
  ],
  authors: [
    { name: "Pietra Himmelsbach" },
    { name: "Nei Agripino" },
    { name: "Derick Galdino" },
  ],
  creator: "Equipe Caçadores de Falhas",
  publisher: "Caçadores de Falhas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo1.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/logo1.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    shortcut: "/logo1.ico",
    apple: [{ url: "/logo.jpeg", sizes: "180x180", type: "image/jpeg" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://cacadores-de-falhas.vercel.app",
    siteName: "Caçadores de Falhas",
    title: "Caçadores de Falhas - Detecção de Ondas Gravitacionais",
    description:
      "Plataforma avançada para detecção e análise de ondas gravitacionais usando inteligência artificial.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Caçadores de Falhas - Ondas Gravitacionais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caçadores de Falhas - Detecção de Ondas Gravitacionais",
    description:
      "Plataforma avançada para detecção de ondas gravitacionais usando IA.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Lembre-se de adicionar seu código de verificação do Google
  },
  // Injetando o script de dados estruturados da forma correta via metadados
  other: {
    "application/ld+json": JSON.stringify(structuredData),
  },
};

// Componente RootLayout que envolve toda a aplicação
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" dir="ltr">
      {/*
        A tag <head> não é necessária aqui.
        O Next.js a gerará automaticamente usando o objeto 'metadata' exportado acima.
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all"
        >
          Pular para conteúdo principal
        </a>
        <AuthProvider>
          <Header />
          <main id="main-content" role="main" className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
