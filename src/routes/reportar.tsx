import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { CATEGORIAS, guardarReporte, type Reporte } from "@/lib/reportes";

export const Route = createFileRoute("/reportar")({
  head: () => ({
    meta: [
      { title: "Registrar reporte | CodeJalisco" },
      {
        name: "description",
        content:
          "Formulario para registrar un problema urbano: categoría, descripción, fotografía y ubicación. Al enviarlo se genera un folio de seguimiento.",
      },
      { property: "og:title", content: "Registrar reporte | CodeJalisco" },
      {
        property: "og:description",
        content: "Registra el problema, agrega foto y ubicación, y obtén tu folio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reportar,
});

const VACIO = {
  categoria: "",
  descripcion: "",
  municipio: "",
  colonia: "",
  calle: "",
  referencia: "",
  contacto: "",
};

type Errores = Partial<Record<keyof typeof VACIO, string>>;

function Reportar() {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [foto, setFoto] = useState<{ nombre: string; url: string }>({ nombre: "", url: "" });
  const [enviado, setEnviado] = useState<Reporte | null>(null);

  function cambiar(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  }

  function cambiarFoto(e: ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) {
      setFoto({ nombre: "", url: "" });
      return;
    }
    const lector = new FileReader();
    lector.onload = () => setFoto({ nombre: archivo.name, url: String(lector.result) });
    lector.readAsDataURL(archivo);
  }

  function validar(): Errores {
    const e: Errores = {};
    if (!datos.categoria) e.categoria = "Selecciona el tipo de problema.";
    if (datos.descripcion.trim().length < 15)
      e.descripcion = "Describe el problema con al menos 15 caracteres.";
    if (!datos.municipio.trim()) e.municipio = "Indica el municipio.";
    if (!datos.colonia.trim()) e.colonia = "Indica la colonia.";
    if (!datos.calle.trim()) e.calle = "Indica la calle y número o cruce.";
    if (datos.contacto && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.contacto))
      e.contacto = "Escribe un correo electrónico válido.";
    return e;
  }

  function enviar(e: FormEvent) {
    e.preventDefault();
    const encontrados = validar();
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const reporte = guardarReporte({
      ...datos,
      fotoNombre: foto.nombre,
      fotoDataUrl: foto.url,
    });
    setEnviado(reporte);
    setDatos(VACIO);
    setFoto({ nombre: "", url: "" });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (enviado) {
    return (
      <div className="cj-container py-12">
        <div className="cj-card mx-auto max-w-2xl text-center">
          <p className="cj-badge">Reporte enviado</p>
          <h1 className="cj-title mt-3">Tu reporte fue registrado correctamente</h1>
          <p className="cj-subtitle">
            Guarda este folio, con él podrás consultar el avance de tu reporte.
          </p>
          <p className="my-6 border-y border-border py-4 text-3xl font-bold tracking-wide text-olive-dark">
            {enviado.folio}
          </p>
          <dl className="mx-auto grid max-w-md gap-2 text-left">
            <div className="flex justify-between gap-4 border-b border-border pb-1">
              <dt className="font-bold text-olive-dark">Categoría</dt>
              <dd>{enviado.categoria}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border pb-1">
              <dt className="font-bold text-olive-dark">Ubicación</dt>
              <dd className="text-right">
                {enviado.calle}, {enviado.colonia}, {enviado.municipio}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border pb-1">
              <dt className="font-bold text-olive-dark">Estado</dt>
              <dd>{enviado.estado}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-olive-dark">Fecha</dt>
              <dd>{enviado.fecha}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/seguimiento" search={{ folio: enviado.folio }} className="cj-btn">
              Consultar este folio
            </Link>
            <button type="button" className="cj-btn cj-btn-outline" onClick={() => setEnviado(null)}>
              Registrar otro reporte
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cj-container py-12">
      <h1 className="cj-title">Registrar un reporte</h1>
      <p className="cj-subtitle">
        Completa la información del problema. Los campos marcados con * son obligatorios.
      </p>

      <form onSubmit={enviar} noValidate className="cj-card mt-6 grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="cj-label" htmlFor="categoria">
            Tipo de problema *
          </label>
          <select
            id="categoria"
            name="categoria"
            className="cj-input"
            value={datos.categoria}
            onChange={cambiar}
          >
            <option value="">Selecciona una opción</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errores.categoria && <p className="mt-1 text-destructive">{errores.categoria}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="cj-label" htmlFor="descripcion">
            Descripción del problema *
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={4}
            className="cj-input"
            placeholder="Explica qué sucede, desde cuándo y cómo afecta a la comunidad."
            value={datos.descripcion}
            onChange={cambiar}
          />
          {errores.descripcion && <p className="mt-1 text-destructive">{errores.descripcion}</p>}
        </div>

        <div>
          <label className="cj-label" htmlFor="municipio">
            Municipio *
          </label>
          <input
            id="municipio"
            name="municipio"
            className="cj-input"
            value={datos.municipio}
            onChange={cambiar}
          />
          {errores.municipio && <p className="mt-1 text-destructive">{errores.municipio}</p>}
        </div>

        <div>
          <label className="cj-label" htmlFor="colonia">
            Colonia *
          </label>
          <input
            id="colonia"
            name="colonia"
            className="cj-input"
            value={datos.colonia}
            onChange={cambiar}
          />
          {errores.colonia && <p className="mt-1 text-destructive">{errores.colonia}</p>}
        </div>

        <div>
          <label className="cj-label" htmlFor="calle">
            Calle y número o cruce *
          </label>
          <input id="calle" name="calle" className="cj-input" value={datos.calle} onChange={cambiar} />
          {errores.calle && <p className="mt-1 text-destructive">{errores.calle}</p>}
        </div>

        <div>
          <label className="cj-label" htmlFor="referencia">
            Referencia
          </label>
          <input
            id="referencia"
            name="referencia"
            className="cj-input"
            placeholder="Frente a la escuela, junto al parque..."
            value={datos.referencia}
            onChange={cambiar}
          />
        </div>

        <div>
          <label className="cj-label" htmlFor="foto">
            Fotografía del problema
          </label>
          <input
            id="foto"
            type="file"
            accept="image/*"
            className="cj-input"
            onChange={cambiarFoto}
          />
          {foto.url && (
            <img
              src={foto.url}
              alt="Vista previa de la fotografía del reporte"
              className="mt-3 h-40 w-full rounded-sm border border-border object-cover"
            />
          )}
        </div>

        <div>
          <label className="cj-label" htmlFor="contacto">
            Correo de contacto
          </label>
          <input
            id="contacto"
            name="contacto"
            className="cj-input"
            placeholder="opcional, para recibir avisos"
            value={datos.contacto}
            onChange={cambiar}
          />
          {errores.contacto && <p className="mt-1 text-destructive">{errores.contacto}</p>}
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3 border-t border-border pt-4">
          <button type="submit" className="cj-btn">
            Enviar reporte
          </button>
          <Link to="/" className="cj-btn cj-btn-outline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
