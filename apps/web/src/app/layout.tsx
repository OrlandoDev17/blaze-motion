// Next
import type { Metadata } from "next";

// Fonts
import { Syne, JetBrains_Mono } from "next/font/google";

// Styles
import "./globals.css";

// Providers
import { Providers } from "@/components/layout/Providers";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Blaze Motion",
  description: "Biblioteca de animaciones de framer motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
