import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Enola.ai | Social Media Advertising Content AI Toolkit",
  description: "Enola.ai — AI-powered social media advertising toolkit. Generate on-brand copy, visuals & campaigns with multi-agent precision. From $1.99.",
  keywords: ["AI advertising", "social media marketing", "AI-powered creative", "automated ad generation", "Enola.ai", "brand DNA extraction", "Google Gemini"],
  openGraph: {
    title: "Enola.ai — Agency-Grade Social Media Advertising, Powered by AI Agents",
    description: "Enola.ai — Agency-Grade Social Media Advertising, Powered by AI Agents. From $1.99. Enola.ai is an automated marketing content generation platform built for brands, marketers, and agencies who demand high-end creative output — without the high-end price tag. Powered by a coordinated team of specialised AI agents, Enola.ai handles the full advertising content lifecycle — from brand discovery to campaign deployment — with the precision, consistency, and creative quality you'd expect from a top-tier agency.",
    images: [
      {
        url: "/enolas.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-inter bg-slate-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
