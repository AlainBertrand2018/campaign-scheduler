import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gravity AI — AI-Powered Campaign Automation",
  description: "Multi-agent AI that strategizes, writes, designs, and publishes your marketing campaigns on autopilot. Powered by Google Gemini & Genkit.",
  keywords: ["AI marketing", "campaign automation", "social media scheduler", "AI campaign manager", "Genkit", "Google Gemini"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
