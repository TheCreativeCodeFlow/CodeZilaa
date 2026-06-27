import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeZilaa — Premium Placement Preparation & Visual Code Learning",
  description: "Master programming and technical interviews through interactive execution visualization, compiler analysis, and structured learning roadmaps built for engineering students.",
  keywords: ["CodeZilaa", "Placement Preparation", "Coding Visualization", "Technical Interview Prep", "Data Structures", "Algorithms", "Engineering Students"],
  authors: [{ name: "CodeZilaa Team" }],
  openGraph: {
    title: "CodeZilaa — Premium Placement Preparation",
    description: "Engineered for learning, not just solving questions. Visualize code execution step-by-step.",
    url: "https://codezilaa.com",
    siteName: "CodeZilaa",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#090909] text-gray-100 antialiased selection:bg-cyan-500/30 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
