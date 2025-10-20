import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wijaya Portfolio",
  description: "Showcasing innovative system development and AI-powered solutions.",
  keywords: ["Next.js", "TypeScript", "AI Development", "Node.js", "Full Stack", "Web Development"],
  authors: [{ name: "Wijaya K" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Wijaya Portfolio",
    description: "Explore cutting-edge system development and AI-driven applications built with modern web technologies.",
    url: "https://wijaya.vercel.app",
    siteName: "Wijaya Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wijaya Portfolio",
    description: "Explore innovative system development and AI-driven web solutions.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
