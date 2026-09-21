import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CodeJalisco | Reporte ciudadano de problemas urbanos" },
      {
        name: "description",
        content:
          "Plataforma ciudadana para reportar baches, alumbrado, basura y fugas de agua en Jalisco y consultar el estado de cada reporte.",
      },
      { name: "author", content: "CodeJalisco" },
      { property: "og:title", content: "CodeJalisco | Reporte ciudadano de problemas urbanos" },
      {
        property: "og:description",
        content: "Reporta problemas urbanos y da seguimiento a tu folio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/reportar", label: "Reportar problema" },
  { to: "/seguimiento", label: "Consultar folio" },
  { to: "/panel", label: "Panel de dependencia" },
  { to: "/documentacion", label: "Documentación" },
] as const;

function Encabezado() {
  return (
    <header className="border-b-4 border-olive-dark bg-olive text-primary-foreground">
      <div className="cj-container flex flex-wrap items-center justify-between gap-3 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-sm border border-primary-foreground/60 text-lg font-bold">
            CJ
          </span>
          <span>
            <span className="block text-xl font-bold leading-tight">CodeJalisco</span>
            <span className="block text-sm opacity-90">Plataforma ciudadana de reportes urbanos</span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1 text-base">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-olive-dark underline" }}
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-olive-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function PieDePagina() {
  return (
    <footer className="mt-12 border-t-4 border-olive-dark bg-olive-dark text-primary-foreground">
      <div className="cj-container flex flex-wrap justify-between gap-4 py-6 text-sm">
        <p>CodeJalisco — Proyecto académico, Desarrollo de Sistemas Web.</p>
        <p className="opacity-90">Sprint 2: diseño de interfaz, estructura y navegación.</p>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Encabezado />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <PieDePagina />
      </div>
    </QueryClientProvider>
  );
}
