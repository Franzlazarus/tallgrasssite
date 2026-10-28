import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tall Grass — EP op vinyl & shirt",
  description: "Een EP voor je platenkast of een Tall Grass-shirt? Laat vrijblijvend je interesse achter.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
