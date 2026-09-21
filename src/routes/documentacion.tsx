import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/documentacion")({
  head: () => ({
    meta: [
      { title: "Documentación del Sprint 2 | CodeJalisco" },
      {
        name: "description",
        content:
          "Objetivo, actividades, resultados, retrospectiva, conclusiones y ajustes propuestos del segundo sprint del proyecto CodeJalisco.",
      },
      { property: "og:title", content: "Documentación del Sprint 2 | CodeJalisco" },
      {
        property: "og:description",
        content: "Desarrollo, resultados y retrospectiva del segundo sprint.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Documentacion,
});

const HISTORIAS = [
  {
    id: "HU-05",
    historia: "Como ciudadano quiero registrar un reporte con categoría, descripción y ubicación.",
    pantalla: "Reportar problema",
    estado: "Completada",
  },
  {
    id: "HU-06",
    historia: "Como ciudadano quiero adjuntar una fotografía del problema.",
    pantalla: "Reportar problema",
    estado: "Completada",
  },
  {
    id: "HU-07",
    historia: "Como ciudadano quiero recibir un folio al enviar mi reporte.",
    pantalla: "Confirmación de envío",
    estado: "Completada",
  },
  {
    id: "HU-08",
    historia: "Como ciudadano quiero consultar el estado de mi reporte con el folio.",
    pantalla: "Consultar folio",
    estado: "Completada",
  },
  {
    id: "HU-09",
    historia: "Como dependencia quiero ver y filtrar los reportes recibidos.",
    pantalla: "Panel de dependencia",
    estado: "Completada",
  },
  {
    id: "HU-10",
    historia: "Como dependencia quiero actualizar el estado de atención de un reporte.",
    pantalla: "Panel de dependencia",
    estado: "Completada",
  },
  {
    id: "HU-11",
    historia: "Como usuario quiero navegar entre las secciones desde un menú permanente.",
    pantalla: "Encabezado y pie de página",
    estado: "Completada",
  },
];

const RETRO = [
  {
    titulo: "Qué funcionó correctamente",
    puntos: [
      "La planeación del Sprint 1 permitió convertir los requisitos en pantallas sin retrabajo.",
      "La definición temprana del sistema visual (verde militar y Times New Roman) evitó discusiones de diseño durante la codificación.",
      "El flujo reportar → folio → consulta quedó claro y se pudo probar de principio a fin.",
      "La separación entre la capa de datos y las pantallas facilitó la revisión del código.",
    ],
  },
  {
    titulo: "Actividades completadas satisfactoriamente",
    puntos: [
      "Diseño e implementación de las cinco pantallas del sprint.",
      "Navegación general del sitio con menú permanente y rutas propias por sección.",
      "Formulario de reporte con validaciones y vista previa de la fotografía.",
      "Generación automática de folio y consulta de estado.",
      "Panel de dependencia con indicadores, filtros y cambio de estado.",
    ],
  },
  {
    titulo: "Dificultades y problemas presentados",
    puntos: [
      "Las validaciones del formulario se subestimaron en la estimación inicial y tomaron más tiempo del planeado.",
      "Al no contar todavía con base de datos, la información se conserva en el navegador y se pierde al cambiar de equipo.",
      "La ubicación se captura de forma escrita porque la integración con un mapa no alcanzó a incluirse en el sprint.",
      "La revisión en pantallas pequeñas se dejó para el final, lo que obligó a ajustes de última hora.",
    ],
  },
  {
    titulo: "Aspectos que pueden mejorarse",
    puntos: [
      "Estimar por separado el diseño visual y la lógica de validación de cada pantalla.",
      "Probar la vista móvil durante el desarrollo y no al cierre del sprint.",
      "Documentar las evidencias conforme se avanza, en lugar de concentrarlas al final.",
      "Definir desde el inicio del sprint los datos mínimos que debe guardar cada reporte.",
    ],
  },
  {
    titulo: "Aprendizajes obtenidos",
    puntos: [
      "Un sistema visual definido como conjunto de estilos reutilizables acelera el desarrollo y mantiene la identidad.",
      "Las historias de usuario redactadas en el Sprint 1 funcionan como criterio objetivo de terminado.",
      "Es preferible entregar pocas pantallas completas que muchas pantallas incompletas.",
    ],
  },
  {
    titulo: "Elementos que se conservan para el siguiente sprint",
    puntos: [
      "La estructura visual y la paleta verde militar con tipografía Times New Roman.",
      "La organización del proyecto por rutas y la capa de datos centralizada.",
      "La reunión de revisión breve al cierre de cada bloque de trabajo.",
      "El tablero de historias de usuario con su estado.",
    ],
  },
];

const AJUSTES = [
  {
    titulo: "1. Persistencia real de los reportes en base de datos",
    que: "Sustituir el almacenamiento del navegador por una base de datos con su respectivo servicio de consulta y registro.",
    porque:
      "Durante la retrospectiva se detectó que los reportes solo existen en el equipo donde se capturaron, lo que impide que una dependencia consulte lo que envió un ciudadano.",
    como: "Definir la tabla de reportes con los campos ya utilizados en el formulario y reemplazar las funciones de la capa de datos actual por llamadas al servidor, conservando las mismas pantallas.",
    beneficio: "Los reportes se vuelven consultables desde cualquier dispositivo y el folio adquiere validez real.",
    donde: "Primera semana del Sprint 3, antes de cualquier funcionalidad nueva.",
  },
  {
    titulo: "2. Cuentas de acceso para las dependencias",
    que: "Agregar inicio de sesión para que el panel de dependencia no sea público.",
    porque:
      "Hoy cualquier visitante puede cambiar el estado de un reporte, situación identificada como riesgo en la retrospectiva.",
    como: "Implementar registro e inicio de sesión y proteger la ruta del panel, dejando abiertas las pantallas ciudadanas.",
    beneficio: "Da confiabilidad a la información de estado y separa con claridad los dos perfiles de usuario.",
    donde: "Segunda semana del Sprint 3, junto con la base de datos.",
  },
  {
    titulo: "3. Selección de ubicación en mapa",
    que: "Permitir marcar el punto exacto del problema sobre un mapa, además de la dirección escrita.",
    porque:
      "La captura escrita resultó imprecisa en las pruebas del sprint y complica localizar el problema en campo.",
    como: "Incorporar un componente de mapa en el formulario que registre coordenadas junto con los datos actuales de dirección.",
    beneficio: "Reduce errores de localización y facilita la atención por parte de la dependencia.",
    donde: "Sprint 3, como mejora de la pantalla de registro ya construida.",
  },
  {
    titulo: "4. Aviso automático al ciudadano cuando cambia el estado",
    que: "Enviar una notificación por correo al correo de contacto cada vez que el reporte avanza de estado.",
    porque:
      "En la retrospectiva se observó que el ciudadano debe entrar a consultar por iniciativa propia, lo que resta utilidad al seguimiento.",
    como: "Disparar un mensaje desde el servidor cuando la dependencia actualiza el estado en el panel.",
    beneficio: "Mejora la percepción de atención y fomenta que los ciudadanos sigan reportando.",
    donde: "Sprint 3 o 4, una vez que exista base de datos y cuentas de acceso.",
  },
  {
    titulo: "5. Revisión de diseño adaptable dentro del propio sprint",
    que: "Incluir la prueba en teléfono como criterio de terminado de cada pantalla.",
    porque:
      "Los ajustes móviles se hicieron al cierre del Sprint 2 y generaron presión de tiempo.",
    como: "Agregar a la definición de terminado la verificación en tres tamaños de pantalla antes de dar por concluida una historia.",
    beneficio: "Evita retrabajo al final y mejora la experiencia del ciudadano, que reportará principalmente desde su teléfono.",
    donde: "Se aplica desde el primer día del Sprint 3 como práctica de trabajo.",
  },
];

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="cj-card mt-6">
      <h2 className="text-2xl font-bold text-olive-dark">{titulo}</h2>
      <div className="mt-3 space-y-3 text-foreground/85">{children}</div>
    </section>
  );
}

function Documentacion() {
  return (
    <div className="cj-container py-12">
      <p className="cj-badge">Documento académico</p>
      <h1 className="cj-title mt-3">Segundo sprint: desarrollo, resultados y retrospectiva</h1>
      <p className="cj-subtitle">
        Proyecto CodeJalisco — Plataforma ciudadana para el reporte de problemas urbanos.
      </p>

      <Bloque titulo="1. Objetivo del segundo sprint">
        <p>
          Transformar el análisis, los requisitos y el Product Backlog elaborados en el Sprint 1 en una
          interfaz navegable y funcional. El sprint se centró en el diseño de interfaz, la estructura del
          sitio y la navegación entre secciones, dejando operativo el flujo principal del sistema:
          registrar un reporte, obtener un folio y consultar su estado.
        </p>
      </Bloque>

      <Bloque titulo="2. Actividades realizadas">
        <ul className="list-disc space-y-1 pl-6">
          <li>Selección de las historias de usuario del backlog que corresponden a la interfaz.</li>
          <li>Definición del sistema visual reutilizable con la paleta verde militar y Times New Roman.</li>
          <li>Diseño del mapa de navegación y del menú permanente del sitio.</li>
          <li>Construcción de las pantallas de inicio, registro, confirmación, consulta y panel.</li>
          <li>Programación de validaciones, generación de folio y cambio de estado.</li>
          <li>Pruebas de recorrido completo y reunión retrospectiva de cierre.</li>
        </ul>
      </Bloque>

      <Bloque titulo="3. Funcionalidades implementadas">
        <div className="overflow-x-auto">
          <table className="cj-table">
            <thead>
              <tr>
                <th>Historia</th>
                <th>Descripción</th>
                <th>Pantalla</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {HISTORIAS.map((h) => (
                <tr key={h.id}>
                  <td className="font-bold text-olive-dark">{h.id}</td>
                  <td>{h.historia}</td>
                  <td>{h.pantalla}</td>
                  <td>{h.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Bloque>

      <Bloque titulo="4. Cambios y mejoras respecto al primer sprint">
        <p>
          El Sprint 1 entregó documentación: análisis del problema, requisitos, Product Backlog y
          planeación. El Sprint 2 entrega un producto ejecutable derivado de esa documentación.
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>De requisitos escritos a pantallas reales que el usuario puede recorrer.</li>
          <li>De una propuesta visual en papel a un sistema de estilos aplicado a todo el sitio.</li>
          <li>De un flujo descrito en texto a una navegación funcional entre cinco secciones.</li>
          <li>De un backlog sin evidencia a historias verificables con su pantalla correspondiente.</li>
          <li>Incorporación del perfil de dependencia, que en el Sprint 1 solo estaba enunciado.</li>
        </ul>
      </Bloque>

      <Bloque titulo="5. Resultado obtenido y funcionamiento general">
        <p>
          El resultado es un sitio navegable con cinco secciones enlazadas desde el menú superior. En
          <strong> Reportar problema</strong> el ciudadano elige la categoría, describe el problema,
          adjunta una fotografía e indica su ubicación; el formulario valida los datos obligatorios y,
          al enviarse, genera un folio con el formato CJ-AAAA-0000 y muestra una pantalla de
          confirmación. En <strong> Consultar folio</strong> ese identificador recupera el reporte y
          muestra su avance en cuatro etapas: recibido, en revisión, en atención y atendido. En el
          <strong> Panel de dependencia</strong> se listan todos los reportes con indicadores por estado,
          filtros por categoría, estado y texto, y la posibilidad de actualizar el avance de cada uno;
          ese cambio se refleja de inmediato en la consulta del ciudadano.
        </p>
        <p>
          La información se conserva en el almacenamiento del navegador mediante una capa de datos
          independiente de las pantallas, decisión tomada para cumplir el alcance del sprint sin
          adelantar la base de datos, planeada para el siguiente.
        </p>
      </Bloque>

      <Bloque titulo="6. Evidencias del desarrollo">
        <ul className="list-disc space-y-1 pl-6">
          <li>Recorrido de las cinco secciones del sitio desde el menú principal.</li>
          <li>Envío de un reporte de prueba y folio generado en la pantalla de confirmación.</li>
          <li>Consulta de ese folio mostrando la línea de avance del reporte.</li>
          <li>Cambio de estado desde el panel y su reflejo en la consulta ciudadana.</li>
          <li>Código organizado por rutas y componentes en el repositorio de GitHub del proyecto.</li>
        </ul>
      </Bloque>

      <Bloque titulo="7. Resultados de la reunión retrospectiva">
        <div className="grid gap-5 md:grid-cols-2">
          {RETRO.map((b) => (
            <div key={b.titulo} className="rounded-sm border border-border bg-secondary p-4">
              <h3 className="font-bold text-olive-dark">{b.titulo}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {b.puntos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="8. Conclusiones">
        <p>
          El objetivo del segundo sprint se cumplió: las siete historias de usuario comprometidas quedaron
          implementadas y probadas, y el sistema pasó de ser una propuesta documentada a un producto
          navegable que permite completar el flujo principal de la plataforma.
        </p>
        <p>
          La mejora respecto al primer sprint es clara en dos sentidos. En lo funcional, el usuario ya
          puede interactuar con el sistema en lugar de solo leer su descripción. En lo organizativo, el
          equipo confirmó que un backlog bien redactado reduce la incertidumbre al programar, porque cada
          historia indica con precisión qué debe quedar terminado.
        </p>
        <p>
          El principal aprendizaje fue que las tareas de validación y de adaptación a distintos tamaños
          de pantalla deben estimarse de manera explícita, ya que fueron la causa de la presión de tiempo
          al cierre. La retrospectiva resultó determinante para detectarlo: sin esa reunión, las mismas
          dificultades se habrían repetido en el siguiente sprint. Documentar lo que funcionó, lo que
          falló y lo que se conserva convierte la experiencia del equipo en acuerdos concretos de trabajo.
        </p>
      </Bloque>

      <Bloque titulo="9. Modificaciones y ajustes para el siguiente sprint">
        <div className="space-y-4">
          {AJUSTES.map((a) => (
            <article key={a.titulo} className="rounded-sm border border-olive bg-card p-4">
              <h3 className="text-lg font-bold text-olive-dark">{a.titulo}</h3>
              <p className="mt-2">
                <span className="font-bold">Qué se modifica: </span>
                {a.que}
              </p>
              <p>
                <span className="font-bold">Por qué es necesario: </span>
                {a.porque}
              </p>
              <p>
                <span className="font-bold">Cómo se implementaría: </span>
                {a.como}
              </p>
              <p>
                <span className="font-bold">Beneficio: </span>
                {a.beneficio}
              </p>
              <p>
                <span className="font-bold">Momento de incorporación: </span>
                {a.donde}
              </p>
            </article>
          ))}
        </div>
      </Bloque>
    </div>
  );
}
