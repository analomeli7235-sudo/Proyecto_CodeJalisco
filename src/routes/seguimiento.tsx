import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { EstadoPill } from "@/components/EstadoPill";
import { buscarPorFolio, ESTADOS, type Reporte } from "@/lib/reportes";

export const Route = createFileRoute("/seguimiento")({
  validateSearch: (search: Record<string, unknown>) => ({
    folio: typeof search.folio === "string" ? search.folio : "",
  }),
  head: () => ({
    meta: [
      { title: "Consultar folio | CodeJalisco" },
      {
        name: "description",
        content:
          "Consulta con tu folio el avance de un reporte ciudadano: recibido, en revisión, en atención o atendido.",
      },
      { property: "og:title", content: "Consultar folio | CodeJalisco" },
      { property: "og:description", content: "Revisa el estado de tu reporte con el folio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Seguimiento,
});

function Seguimiento() {
  const { folio: folioInicial } = Route.useSearch();
  const [folio, setFolio] = useState(folioInicial);
  const [resultado, setResultado] = useState<Reporte | null>(null);
  const [buscado, setBuscado] = useState(false);

  useEffect(() => {
    if (folioInicial) {
      setResultado(buscarPorFolio(folioInicial) ?? null);
      setBuscado(true);
    }
  }, [folioInicial]);

  function buscar(e: FormEvent) {
    e.preventDefault();
    setResultado(buscarPorFolio(folio) ?? null);
    setBuscado(true);
  }

  return (
    <div className="cj-container py-12">
      <h1 className="cj-title">Consultar el estado de un reporte</h1>
      <p className="cj-subtitle">Escribe el folio que recibiste al momento de enviar tu reporte.</p>

      <form onSubmit={buscar} className="cj-card mt-6 flex flex-wrap items-end gap-3">
        <div className="min-w-64 flex-1">
          <label className="cj-label" htmlFor="folio">
            Folio del reporte
          </label>
          <input
            id="folio"
            className="cj-input"
            placeholder="Ejemplo: CJ-2026-1001"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
          />
        </div>
        <button type="submit" className="cj-btn">
          Buscar
        </button>
      </form>

      {buscado && !resultado && (
        <div className="cj-card mt-6 border-destructive">
          <h2 className="text-lg font-bold text-destructive">No se encontró ese folio</h2>
          <p className="mt-1 text-foreground/80">
            Revisa que esté escrito completo, con el formato CJ-AAAA-0000.
          </p>
        </div>
      )}

      {resultado && (
        <div className="cj-card mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <div>
              <h2 className="text-2xl font-bold text-olive-dark">{resultado.folio}</h2>
              <p className="text-muted-foreground">Reporte registrado el {resultado.fecha}</p>
            </div>
            <EstadoPill estado={resultado.estado} />
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="font-bold text-olive-dark">Categoría</h3>
              <p>{resultado.categoria}</p>
              <h3 className="mt-3 font-bold text-olive-dark">Descripción</h3>
              <p className="text-foreground/85">{resultado.descripcion}</p>
              <h3 className="mt-3 font-bold text-olive-dark">Ubicación</h3>
              <p className="text-foreground/85">
                {resultado.calle}, {resultado.colonia}, {resultado.municipio}
                {resultado.referencia ? ` · ${resultado.referencia}` : ""}
              </p>
            </div>
            <div>
              {resultado.fotoDataUrl ? (
                <img
                  src={resultado.fotoDataUrl}
                  alt={`Fotografía del reporte ${resultado.folio}`}
                  className="h-44 w-full rounded-sm border border-border object-cover"
                />
              ) : (
                <div className="grid h-44 place-items-center rounded-sm border border-dashed border-border bg-secondary text-muted-foreground">
                  Sin fotografía adjunta
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <h3 className="font-bold text-olive-dark">Avance del reporte</h3>
            <ol className="mt-3 grid gap-2 md:grid-cols-4">
              {ESTADOS.map((estado, i) => {
                const actual = ESTADOS.indexOf(resultado.estado);
                const alcanzado = i <= actual;
                return (
                  <li
                    key={estado}
                    className={`rounded-sm border px-3 py-2 ${
                      alcanzado
                        ? "border-olive-dark bg-olive text-primary-foreground"
                        : "border-border bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i + 1}. {estado}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
