import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { EstadoPill } from "@/components/EstadoPill";
import {
  actualizarEstado,
  CATEGORIAS,
  ESTADOS,
  obtenerReportes,
  type EstadoReporte,
  type Reporte,
} from "@/lib/reportes";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel de dependencia | CodeJalisco" },
      {
        name: "description",
        content:
          "Panel interno para revisar los reportes ciudadanos recibidos, filtrarlos por categoría y estado, y actualizar su avance.",
      },
      { property: "og:title", content: "Panel de dependencia | CodeJalisco" },
      {
        property: "og:description",
        content: "Listado de reportes ciudadanos con filtros y actualización de estado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Panel,
});

function Panel() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("Todos");
  const [texto, setTexto] = useState("");

  useEffect(() => {
    setReportes(obtenerReportes());
  }, []);

  const filtrados = useMemo(() => {
    const busqueda = texto.trim().toLowerCase();
    return reportes.filter((r) => {
      if (categoria !== "Todas" && r.categoria !== categoria) return false;
      if (estado !== "Todos" && r.estado !== estado) return false;
      if (!busqueda) return true;
      return [r.folio, r.colonia, r.municipio, r.descripcion]
        .join(" ")
        .toLowerCase()
        .includes(busqueda);
    });
  }, [reportes, categoria, estado, texto]);

  function cambiarEstado(folio: string, nuevo: EstadoReporte) {
    setReportes(actualizarEstado(folio, nuevo));
  }

  const resumen = ESTADOS.map((e) => ({
    estado: e,
    total: reportes.filter((r) => r.estado === e).length,
  }));

  return (
    <div className="cj-container py-12">
      <h1 className="cj-title">Panel de dependencia</h1>
      <p className="cj-subtitle">
        Vista interna para dar seguimiento a los reportes enviados por la ciudadanía.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {resumen.map((r) => (
          <div key={r.estado} className="cj-card">
            <p className="text-muted-foreground">{r.estado}</p>
            <p className="text-3xl font-bold text-olive-dark">{r.total}</p>
          </div>
        ))}
      </div>

      <div className="cj-card mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <label className="cj-label" htmlFor="f-categoria">
            Filtrar por categoría
          </label>
          <select
            id="f-categoria"
            className="cj-input"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option>Todas</option>
            {CATEGORIAS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="cj-label" htmlFor="f-estado">
            Filtrar por estado
          </label>
          <select
            id="f-estado"
            className="cj-input"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option>Todos</option>
            {ESTADOS.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="cj-label" htmlFor="f-texto">
            Buscar por folio o colonia
          </label>
          <input
            id="f-texto"
            className="cj-input"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="CJ-2026-1001, Centro..."
          />
        </div>
      </div>

      <div className="cj-card mt-6 overflow-x-auto">
        <table className="cj-table">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Categoría</th>
              <th>Ubicación</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((r) => (
              <tr key={r.folio}>
                <td className="font-bold text-olive-dark">{r.folio}</td>
                <td>{r.categoria}</td>
                <td>
                  {r.colonia}, {r.municipio}
                </td>
                <td>{r.fecha}</td>
                <td>
                  <EstadoPill estado={r.estado} />
                </td>
                <td>
                  <select
                    aria-label={`Actualizar estado del reporte ${r.folio}`}
                    className="cj-input"
                    value={r.estado}
                    onChange={(e) => cambiarEstado(r.folio, e.target.value as EstadoReporte)}
                  >
                    {ESTADOS.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted-foreground">
                  No hay reportes que coincidan con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
