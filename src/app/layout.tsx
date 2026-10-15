import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "../lib/content";

// Fonts are installed from npm and served by the site itself (no Google request).
import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/newsreader/400-italic.css";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  // After you deploy, set NEXT_PUBLIC_SITE_URL (for example https://liviakiss.dev)
  // so that share previews get the right address.
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E1217",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
