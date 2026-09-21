// Capa de datos del Sprint 2.
// Los reportes se guardan en el almacenamiento local del navegador para que la
// navegación y los formularios sean funcionales sin depender todavía de un
// servidor (la persistencia en base de datos está planeada para el Sprint 3).

export type EstadoReporte = "Recibido" | "En revisión" | "En atención" | "Atendido";

export const CATEGORIAS = [
  "Bache",
  "Alumbrado público",
  "Árbol caído",
  "Acumulación de basura",
  "Fuga de agua",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export const ESTADOS: EstadoReporte[] = ["Recibido", "En revisión", "En atención", "Atendido"];

export interface Reporte {
  folio: string;
  categoria: Categoria | string;
  descripcion: string;
  municipio: string;
  colonia: string;
  calle: string;
  referencia: string;
  fotoNombre: string;
  fotoDataUrl: string;
  contacto: string;
  estado: EstadoReporte;
  fecha: string;
}

const CLAVE = "codejalisco.reportes.v1";

const SEMILLA: Reporte[] = [
  {
    folio: "CJ-2026-1001",
    categoria: "Bache",
    descripcion:
      "Bache de gran tamaño sobre el carril derecho que ha provocado daños en las llantas de varios vehículos.",
    municipio: "Guadalajara",
    colonia: "Centro",
    calle: "Av. Hidalgo 450",
    referencia: "Frente a la plaza principal",
    fotoNombre: "",
    fotoDataUrl: "",
    contacto: "ciudadano1@correo.com",
    estado: "En atención",
    fecha: "2026-09-02",
  },
  {
    folio: "CJ-2026-1002",
    categoria: "Alumbrado público",
    descripcion: "Tres luminarias apagadas en la cuadra, la calle queda completamente oscura por la noche.",
    municipio: "Zapopan",
    colonia: "Las Águilas",
    calle: "Calle Pino 128",
    referencia: "Junto al parque vecinal",
    fotoNombre: "",
    fotoDataUrl: "",
    contacto: "ciudadano2@correo.com",
    estado: "Recibido",
    fecha: "2026-09-08",
  },
  {
    folio: "CJ-2026-1003",
    categoria: "Fuga de agua",
    descripcion: "Fuga constante en la banqueta desde hace una semana, se desperdicia mucha agua potable.",
    municipio: "Tlaquepaque",
    colonia: "Las Juntas",
    calle: "Calle Morelos 76",
    referencia: "Esquina con Av. Revolución",
    fotoNombre: "",
    fotoDataUrl: "",
    contacto: "ciudadano3@correo.com",
    estado: "Atendido",
    fecha: "2026-08-27",
  },
];

function esNavegador() {
  return typeof window !== "undefined";
}

export function obtenerReportes(): Reporte[] {
  if (!esNavegador()) return SEMILLA;
  try {
    const guardado = window.localStorage.getItem(CLAVE);
    if (!guardado) {
      window.localStorage.setItem(CLAVE, JSON.stringify(SEMILLA));
      return SEMILLA;
    }
    const datos = JSON.parse(guardado) as Reporte[];
    return Array.isArray(datos) ? datos : SEMILLA;
  } catch {
    return SEMILLA;
  }
}

function guardarTodos(reportes: Reporte[]) {
  if (!esNavegador()) return;
  window.localStorage.setItem(CLAVE, JSON.stringify(reportes));
}

export function generarFolio(existentes: Reporte[]): string {
  const anio = new Date().getFullYear();
  const consecutivo = 1001 + existentes.length;
  return `CJ-${anio}-${consecutivo}`;
}

export function guardarReporte(datos: Omit<Reporte, "folio" | "estado" | "fecha">): Reporte {
  const actuales = obtenerReportes();
  const nuevo: Reporte = {
    ...datos,
    folio: generarFolio(actuales),
    estado: "Recibido",
    fecha: new Date().toISOString().slice(0, 10),
  };
  guardarTodos([nuevo, ...actuales]);
  return nuevo;
}

export function buscarPorFolio(folio: string): Reporte | undefined {
  const limpio = folio.trim().toUpperCase();
  return obtenerReportes().find((r) => r.folio.toUpperCase() === limpio);
}

export function actualizarEstado(folio: string, estado: EstadoReporte) {
  const actuales = obtenerReportes().map((r) => (r.folio === folio ? { ...r, estado } : r));
  guardarTodos(actuales);
  return actuales;
}
