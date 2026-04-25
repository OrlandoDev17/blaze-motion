import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import appCss from "@/styles.css?url";
import { Header } from "@/components/layout/Header";
import { ParticlesBackground } from "#/components/playground/display/ParticlesBackground";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Blaze Motion | Libreria de Animaciones con Framer Motion",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <ParticlesBackground className="opacity-30" />
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
