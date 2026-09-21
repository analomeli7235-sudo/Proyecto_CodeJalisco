import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIAS } from "@/lib/reportes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeJalisco | Reporta problemas urbanos de tu comunidad" },
      {
        name: "description",
        content:
          "Reporta baches, fallas de alumbrado, árboles caídos, basura acumulada o fugas de agua y consulta el avance con tu folio.",
      },
      { property: "og:title", content: "CodeJalisco | Reporta problemas urbanos" },
      {
        property: "og:description",
        content: "Envía tu reporte con foto y ubicación, recibe un folio y da seguimiento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

const PASOS = [
  {
    numero: "1",
    titulo: "Registra el problema",
    texto: "Selecciona la categoría y describe con tus palabras lo que sucede en tu colonia.",
  },
  {
    numero: "2",
    titulo: "Agrega foto y ubicación",
    texto: "Adjunta una fotografía e indica municipio, colonia, calle y una referencia cercana.",
  },
  {
    numero: "3",
    titulo: "Recibe tu folio",
    texto: "Al enviar el reporte el sistema genera un folio único para consultarlo después.",
  },
  {
    numero: "4",
    titulo: "Da seguimiento",
    texto: "Consulta el folio y revisa si tu reporte fue recibido, revisado, atendido o cerrado.",
  },
];

function Inicio() {
  return (
    <div>
      <section className="border-b border-border bg-khaki">
        <div className="cj-container grid gap-8 py-14 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="cj-badge">Sprint 2 · Interfaz, estructura y navegación</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-olive-dark">
              Reporta los problemas de tu comunidad de forma fácil y rápida
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground/80">
              CodeJalisco conecta a los ciudadanos con las dependencias responsables. Envía tu reporte
              con fotografía y ubicación, obtén un folio y consulta en cualquier momento si ya fue
              atendido.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/reportar" className="cj-btn">
                Crear un reporte
              </Link>
              <Link to="/seguimiento" className="cj-btn cj-btn-outline">
                Consultar mi folio
              </Link>
            </div>
          </div>
          <div className="cj-card">
            <h2 className="text-xl font-bold text-olive-dark">Problemas que puedes reportar</h2>
            <ul className="mt-3 space-y-2">
              {CATEGORIAS.map((c) => (
                <li key={c} className="flex items-center gap-2 border-b border-border pb-2 last:border-0">
                  <span className="h-2 w-2 rounded-full bg-olive" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cj-container py-12">
        <h2 className="cj-title">¿Cómo funciona la plataforma?</h2>
        <p className="cj-subtitle">
          Flujo de navegación definido durante el segundo sprint a partir del Product Backlog del
          primero.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {PASOS.map((p) => (
            <article key={p.numero} className="cj-card">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-olive text-primary-foreground">
                {p.numero}
              </span>
              <h3 className="mt-3 text-lg font-bold text-olive-dark">{p.titulo}</h3>
              <p className="mt-1 text-foreground/80">{p.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="cj-container grid gap-6 py-10 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-olive-dark">Para el ciudadano</h3>
            <p className="mt-1 text-foreground/80">
              Un solo lugar para reportar sin necesidad de saber a qué dependencia acudir.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-olive-dark">Para la dependencia</h3>
            <p className="mt-1 text-foreground/80">
              Un panel con los reportes recibidos, clasificados por categoría y estado de atención.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-olive-dark">Para el proyecto</h3>
            <p className="mt-1 text-foreground/80">
              Continuidad del Sprint 1: los requisitos analizados se convierten en pantallas navegables.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
