import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CONHEÇA O BRASIL — Dados IBGE",
  description:
    "Dashboard interativo sobre condições de vida, desigualdade e pobreza no Brasil. Dados do IBGE — PNAD Contínua e Síntese de Indicadores Sociais.",
  keywords: [
    "IBGE",
    "Brasil",
    "pobreza",
    "desigualdade",
    "condições de vida",
    "dados",
    "dashboard",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
