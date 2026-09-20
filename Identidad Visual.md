# Identidad visual de ISGC

Esta guía define la apariencia vigente del sitio de **Ingeniería en Sistemas y Gráficas Computacionales (ISGC)**. Es la referencia para diseñar, desarrollar y revisar cualquier página, sección o componente nuevo. Si una propuesta contradice estas reglas, debe justificarse como una excepción y revisarse antes de integrarla.

La intención general es una identidad **académica, contemporánea, cálida y rigurosa**, con una proporción aproximada de **70 % institucional y 30 % exploratoria**. La interfaz debe sentirse clara y confiable antes que llamativa; la energía visual aparece en geometrías, movimiento y pequeños detalles relacionados con código, datos y gráficas.

## 1. Principios visuales

1. **Claridad primero.** La jerarquía debe permitir entender la página al recorrer títulos, textos breves y acciones.
2. **Institucional sin rigidez.** El tinto, el marfil y el grafito sostienen la identidad; el dorado se usa con moderación.
3. **Superficies ligeras.** Las tarjetas se separan por color, espacio y sombras suaves, no por contornos constantes.
4. **Tecnología con intención.** Retículas, trazos, órbitas, numeración y símbolos como `{ }` se reservan para momentos editoriales o exploratorios.
5. **Movimiento breve y útil.** Las animaciones refuerzan jerarquía y respuesta, sin distraer ni bloquear el contenido.
6. **Una sola familia visual.** Todas las rutas deben compartir tipografía, paleta, radios, espaciado y comportamiento de interacción.

## 2. Paleta

| Token | Valor | Uso principal |
|---|---:|---|
| Tinto | `#8A1538` | Marca, encabezados de página, CTA, enlaces y datos destacados |
| Dorado | `#B08D4F` | Subrayados, acentos, detalles gráficos y estados puntuales |
| Marfil | `#F7F4EE` | Fondo cálido principal y alternancia de secciones |
| Marfil secundario | `#EFEAE2` | Variación de superficie cuando sea necesaria |
| Grafito | `#262326` | Texto principal, fondos oscuros y pie de página |
| Piedra | `#625D59` | Texto secundario, descripciones y pies de imagen |
| Blanco | `#FFFFFF` | Tarjetas, fondos alternos y texto sobre superficies oscuras |

Colores auxiliares ya presentes:

- **Dorado claro `#E2C58F`:** texto o trazos sobre tinto y grafito; no sustituye al dorado base en fondos claros.
- **Tinto oscuro `#5D1028`:** foco visible y detalles de alto contraste.
- **Tinto hover `#70112E`:** oscurecimiento de acciones principales.

### Proporción y contraste

- Marfil y blanco deben dominar las páginas de contenido.
- El tinto se concentra en encabezado, introducciones, CTA importantes y enlaces.
- El grafito se usa como fondo solo en secciones inmersivas y en el footer.
- El dorado es un acento, no un color de relleno dominante. No usar dorado como texto pequeño sobre blanco.
- Sobre tinto o grafito: títulos blancos, cuerpo blanco con 75–85 % de opacidad y acentos en dorado claro.
- Sobre blanco o marfil: títulos grafito, cuerpo piedra y acciones tinto.
- No introducir colores saturados ajenos a esta paleta ni gradientes protagonistas.

## 3. Tipografía

La familia única es **Satoshi**, cargada desde Fontshare en pesos `400`, `500` y `700`, con `Arial, sans-serif` como respaldo. Las utilidades `font-sans` y `font-serif` apuntan deliberadamente a Satoshi: los títulos no usan una serif real.

| Nivel | Tamaño de referencia | Peso / interlineado | Uso |
|---|---|---|---|
| Hero principal | `clamp(1.9rem, 4vw, 3.25rem)` | 700 / 1.08 | Portada |
| H1 interior | 30–48 px | 700 / cerrado | Introducción de cada ruta |
| H2 | 36–48 px | 700 / cerrado | Inicio de sección |
| H3 | 24–30 px | 700 / 1.15–1.25 | Tarjetas y subsecciones |
| Cuerpo destacado | 18–20 px | 400–500 / relajado | Introducciones y mensajes clave |
| Cuerpo base | 17 px | 400 / 1.55 | Lectura general |
| Texto auxiliar | 12–14 px | 400–600 | Pies, metadatos y contexto |

Reglas:

- Títulos en negrita, con `letter-spacing: -0.025em`; el hero puede cerrar hasta `-0.035em`.
- Párrafos con ancho controlado, normalmente `max-w-2xl` (aprox. 60–70 caracteres).
- Usar mayúsculas espaciadas únicamente en microdetalles gráficos, nunca como estilo habitual de navegación o contenido.
- La monoespaciada se limita a símbolos, números técnicos o elementos de ilustración.
- No depender solo del tamaño: combinar tamaño, peso, color y espacio para marcar jerarquía.

## 4. Retícula y espaciado

- **Ancho máximo:** `1200px` para encabezado, contenido y footer.
- **Margen lateral:** `20px` en móvil (`px-5`) y `24px` en escritorio (`lg:px-6`).
- **Sección estándar:** `64px` vertical en móvil y `80px` desde `sm` (`py-16 sm:py-20`).
- **Introducción de ruta:** `40px` vertical en móvil y `56px` desde `sm`.
- **Separación de grids:** 16 px como base; 20–24 px cuando las tarjetas son grandes.
- **Padding de tarjeta:** 24 px por defecto; 28–36 px en CTA o tarjetas editoriales grandes.
- **Separación título–texto:** 12–16 px; título de sección–contenido: 36 px aproximadamente.

Las secciones estructurales ocupan todo el ancho del fondo y alternan **blanco / marfil**. No encerrar una página completa dentro de una gran tarjeta. En escritorio pueden usarse dos, tres o cuatro columnas según el contenido; en móvil todo debe volver a una sola columna natural, sin scroll horizontal obligatorio.

## 5. Formas, bordes y sombras

### Radios

- **Tarjetas e imágenes:** `16px` (`rounded-card`).
- **Paneles visuales inmersivos:** hasta `18px`.
- **Botones tipo cápsula, campos y avatares:** `9999px` (`rounded-full`).
- **Navegación compacta:** radio pequeño, aproximadamente `4px`.

No mezclar radios arbitrarios. El radio de 16 px es la firma principal de las superficies.

### Bordes

- Las tarjetas rellenas **no llevan borde**.
- Usar trazos de `1px` solo en controles huecos, diagramas, divisores o estados vacíos.
- Los bordes sobre fondos oscuros pueden usar blanco al 20–35 %; los gráficos técnicos, dorado claro con transparencia.
- Un estado vacío puede usar borde piedra discontinuo; no convertirlo en estilo general.

### Sombras

Las sombras deben sugerir elevación, no volumen pesado:

- Sombra de tarjeta: `0 10px 28px #2623260B, 0 2px 5px #26232604`.
- Sombra amplia disponible: `0 16px 48px rgba(38, 35, 38, 0.10)`.
- Hover de proyecto: `0 20px 40px #26232612`.

Evitar sombras negras duras, halos de color y efectos de vidrio. Una tarjeta sobre blanco puede usar marfil como relleno; una tarjeta sobre marfil suele usar blanco.

## 6. Componentes característicos

### Encabezado e introducciones

- Header sticky tinto, logo blanco, nombre **ISGC** y campus.
- Navegación blanca con baja opacidad; al hover aumenta el contraste y aparece un fondo blanco sutil.
- Cada ruta interior inicia con un bloque tinto: H1 blanco, descripción blanca al 80 % y, cuando corresponda, una composición geométrica de capítulo.
- El hero de portada usa una retícula 55/45 aproximada: mensaje a la izquierda y visual oscuro a la derecha; en móvil se apilan.

### Tarjetas

Una tarjeta típica contiene, en este orden: título grafito, descripción piedra, dato o acción tinto y, si aplica, imagen con el mismo radio. Debe tener una sola idea principal y suficiente aire.

- Fondo blanco sobre sección marfil o fondo marfil sobre sección blanca.
- `24px` de padding y `16px` de radio como punto de partida.
- Sombra tenue en superficies flotantes.
- Las tarjetas oscuras tinto se reservan para CTA, accesos importantes o contacto.
- No agregar chips, etiquetas decorativas, esquinas recortadas ni numeración si no comunican información real.

### Acciones y enlaces

- **Enlace principal en fondo claro:** tinto, semibold, subrayado dorado de 2 px y separación de 4 px.
- **Enlace sobre fondo oscuro:** blanco o dorado claro, subrayado visible.
- **Botón primario:** tinto, texto blanco, forma cápsula y padding aproximado de `20px × 12px`.
- **Acción translúcida en hero:** blanco al 9 %, texto blanco, radio de 8 px.
- Las flechas indican destino: `→` para navegación interna y `↗` para recursos externos o saltos destacados.
- Evitar llenar la página de botones sólidos; la mayoría de las acciones son enlaces subrayados.

### Imágenes e ilustración

- Priorizar fotografías reales de alumnos, laboratorios, campus y resultados de proyectos, con autorización y pie contextual.
- Usar `object-cover`, proporciones estables y radio de 16 px.
- Mientras no exista fotografía propia, una ilustración debe identificarse claramente como tal.
- El lenguaje gráfico de ISGC combina fondo grafito, retícula fina, geometría tridimensional, líneas doradas y símbolos de código. No usar hexágonos repetidos, stock tecnológico genérico ni adornos sin relación con el contenido.

## 7. Movimiento e interacción

- Duración habitual de hover y microinteracción: **160–250 ms**.
- En hover/foco, enlaces y botones pueden subir `2px`; al presionar, reducir a `0.97` de escala.
- Tarjetas interactivas pueden subir `3–4px` y aumentar ligeramente la sombra.
- Flechas se desplazan hasta `4px`; evitar recorridos mayores.
- Entradas al hacer scroll: desplazamiento vertical de 28–40 px, opacidad y duración de 0.7–0.9 s.
- Las transiciones de ruta y escenas con scroll pertenecen a momentos editoriales, no a cada componente.
- Toda animación debe desactivarse o simplificarse con `prefers-reduced-motion: reduce`.

El foco de teclado siempre debe ser visible: contorno de 3 px en tinto oscuro con separación de 3 px; sobre fondos oscuros, marfil o dorado claro.

## 8. Voz visual y de contenido

La forma y el texto deben comunicar lo mismo: precisión técnica con cercanía humana. Hablar de **tú**, usar verbos concretos y explicar para qué sirve cada acción. Los títulos pueden ser editoriales; los CTA deben ser explícitos: “Consulta el plan”, “Contacta a Coordinación”, “Ver proyectos”.

Evitar:

- clichés futuristas, promesas grandilocuentes o lenguaje corporativo vacío;
- exceso de etiquetas, badges, mayúsculas y microcopy técnico;
- párrafos extensos dentro de tarjetas;
- adornos que compitan con tareas, fechas o información académica;
- representar ejemplos, archivos históricos o imágenes de referencia como proyectos actuales.

## 9. Patrón base para una sección nueva

Una sección nueva debe construirse, salvo razón funcional en contra, con este patrón:

```tsx
<PageSection tone="marfil">
  <SectionHeading
    title="Título claro de la sección"
    description="Una frase breve que explique su propósito."
  />
  <div className="grid gap-4 md:grid-cols-3">
    <article className="rounded-card bg-white p-6 shadow-soft/50">
      <h3 className="font-serif text-2xl text-grafito">Título de tarjeta</h3>
      <p className="mt-3 text-piedra">Descripción concreta.</p>
      <a className="mt-5 inline-flex font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">
        Acción ↗
      </a>
    </article>
  </div>
</PageSection>
```

## 10. Lista de control antes de integrar

- [ ] Usa únicamente Satoshi y respeta la jerarquía tipográfica.
- [ ] Se limita a la paleta institucional y el dorado funciona solo como acento.
- [ ] Mantiene el contenedor de 1200 px y los márgenes de 20/24 px.
- [ ] Alterna fondos blanco y marfil sin crear contenedores innecesarios.
- [ ] Usa radio de 16 px y sombras suaves en tarjetas; no añade borde a superficies rellenas.
- [ ] Conserva espaciado suficiente y vuelve a una columna en móvil.
- [ ] Los enlaces y botones siguen los patrones de color, subrayado y flechas.
- [ ] Hover, foco y teclado son perceptibles; el movimiento reducido está contemplado.
- [ ] Las imágenes tienen propósito, proporción estable, texto alternativo y contexto.
- [ ] La sección se reconoce como ISGC incluso aislada del resto de la página.

## Fuente técnica vigente

Los tokens principales viven en `tailwind.config.ts`; las reglas globales y de movimiento visual, en `app/globals.css`; los patrones estructurales, en `components/page-frame.tsx`. Esta guía describe el sistema actual y debe actualizarse cuando cambie alguno de esos fundamentos.
