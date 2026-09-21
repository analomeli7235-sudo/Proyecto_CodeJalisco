import type { EstadoReporte } from "@/lib/reportes";

const COLORES: Record<EstadoReporte, string> = {
  Recibido: "bg-muted text-muted-foreground border-border",
  "En revisión": "bg-khaki text-olive-dark border-olive",
  "En atención": "bg-olive-light/30 text-olive-dark border-olive",
  Atendido: "bg-olive text-primary-foreground border-olive-dark",
};

export function EstadoPill({ estado }: { estado: EstadoReporte }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-0.5 text-sm ${COLORES[estado]}`}
    >
      {estado}
    </span>
  );
}
