'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from '@/i18n/I18nProvider';
import { LanguageSwitcher } from "./components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider>

          <header style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
            <h1 style={{ margin: 0 }}>Let's Help</h1> 
            {/* Selector de idioma en la esquina superior derecha */}
            <LanguageSwitcher />
          </header>
          <main>
          {children}
          </main>
          
        </I18nProvider>
      </body>
    </html>
  );
}
