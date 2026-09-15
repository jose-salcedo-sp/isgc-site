# ISGC · Dirección de desarrollo web

Dirección editorial y técnica · 7 septiembre 2026 · Implementación en curso.

**Objetivo:** una puerta de entrada a la carrera y una herramienta cotidiana para su comunidad, con igual prioridad para aspirantes y alumnos. Identidad académica contemporánea, cálida y rigurosa; fotografía real, proyectos explicados y navegación directa.

## 1. Referentes y decisión

Investigación realizada por dos subagentes GPT‑5.6 Luna, esfuerzo medium, y revisada antes de elaborar esta propuesta.

| Referente oficial | Patrón observado | Aplicación a ISGC |
|---|---|---|
| [MIT EECS](https://engineering.mit.edu/department/electrical-engineering-computer-science) y [Stanford CS](https://www.cs.stanford.edu/academics-overview/academics-bachelors-program) | Formación conectada con investigación y proyectos | Mostrar resultados del aprendizaje junto al programa |
| [CMU, recursos de alumnos](https://csd.cs.cmu.edu/academics/current-student-resources/undergraduate) | Herramientas, asesoría y requisitos agrupados | Centro de alumnos con tareas frecuentes al inicio |
| [Oxford CS](https://www.cs.ox.ac.uk/admissions/undergraduate/courses/home.html) | Explica cómo se aprende y orienta hacia admisiones | Conectar laboratorios, docentes y experiencias concretas |
| [ETH, Computer Science](https://inf.ethz.ch/studies/bachelor.html) | Progresión curricular y documentos localizables | Plan de estudios antes de información secundaria |
| [Imperial Computing](https://www.imperial.ac.uk/study/courses/undergraduate/computing-beng/) | Fundamentos, proyectos y orientación de ingreso | Resolver dudas y facilitar el siguiente paso |

**Síntesis de diseño:** jerarquía legible, tareas visibles y evidencia auténtica pueden facilitar comprensión e interés. Son inferencias; las fuentes no demuestran mayor atención o conversión. Adoptamos un sitio de varias páginas con portada breve. Descartamos las áreas sugeridas por un informe como “especialidades” sin respaldo local y cualquier propuesta que relegue a los alumnos al final.

## 2. Paleta y dirección visual

Se conservan los dos tonos solicitados del mockup; su equivalencia con el manual de marca deberá confirmarse.

| Color | HEX | Función |
|---|---|---|
| Tinto | `#8A1538` | Acción principal, enlaces, identidad |
| Dorado | `#B08D4F` | Detalles, numeración, acentos puntuales |
| Marfil | `#F7F4EE` | Fondo predominante, calidez |
| Blanco | `#FFFFFF` | Superficies y texto sobre tinto |
| Grafito | `#262326` | Texto principal y pie de página |
| Gris piedra | `#625D59` | Texto secundario |

Fondos claros dominantes; tinto concentrado en jerarquía y dorado escaso. Texto grafito sobre dorado; evitar dorado como texto pequeño sobre blanco. Verificar contrastes de todas las combinaciones y estados antes de publicar.

Tipografía propuesta: Source Sans 3 para navegación y lectura; Source Serif 4 solo en títulos editoriales. Cuerpo de 16–18 px, líneas de 60–70 caracteres. Retícula máxima de 1200 px, 12 columnas en escritorio y una columna en móvil; márgenes de 20–24 px. Espaciado generoso, bordes discretos y radios de 8 px. Fotografías de alumnos trabajando, laboratorios y resultados con pies informativos. Sin gradientes protagonistas, carruseles automáticos ni hexágonos decorativos repetidos. Usar el logo blanco sobre tinto; solicitar original vectorial antes de ampliarlo.

## 3. Layout final

**Encabezado persistente:** marca UP + ISGC y campus; navegación «Carrera», «Proyectos», «Comunidad», «Alumnos»; acción «Admisiones». En móvil, «Alumnos» permanece visible junto al menú. Sin selector obligatorio de audiencia.

**Portada, en este orden:**

1. **Hero editorial 55/45.** Nombre oficial, descriptor Computer Science and Engineering, una frase de propósito y foto real de un proyecto con contexto. Acciones «Conoce la carrera» y «Soy alumno», de igual visibilidad. Altura moderada para anticipar el siguiente bloque.
2. **Actualidad útil.** Un aviso vigente, próximo evento y accesos a UP4U, Tu Ruta Ideal y directorio. Fechas explícitas; ocultar avisos vencidos. El alumno resuelve tareas sin recorrer la narrativa de admisión.
3. **Qué aprenderás y construirás.** Tres capacidades respaldadas por el plan y dos proyectos destacados: problema, solución, autores y aprendizaje. Enlaces al plan y Media Lab.
4. **Tu formación.** Resumen de progresión académica, plan oficial descargable y especialidades vigentes; CTA «Explora el plan de estudios». Requisitos y semestres completos en la página de carrera.
5. **Personas y oportunidades.** Dos docentes con áreas de trabajo, una experiencia de egresado y enlace a prácticas. Testimonios identificados y autorizados; empresas solo con relación comprobada.
6. **Vida ISGC.** Tres noticias/eventos recientes y una imagen de campus; acceso al archivo y ubicación de espacios. Evitar repetir el aviso prioritario.
7. **Siguiente paso.** Dos bloques equivalentes: aspirantes → admisiones, becas y contacto; alumnos → coordinación, trámites y recursos. FAQ breve por audiencia. Pie con reglamentos, privacidad, redes y datos institucionales.

**Mapa de páginas y contenido:**

| Ruta | Contenido y prioridad |
|---|---|
| `/carrera` | Perfil, cómo se aprende, plan por semestre, especialidades, doble carrera, campo profesional y FAQ de ingreso |
| `/aspirantes` | Proceso oficial de admisión, becas/financiamiento, visita y contacto de Admisiones |
| `/alumnos` | Avisos → accesos frecuentes → recursos agrupados en estudio, trámites y desarrollo profesional; filtro local por nombre |
| `/proyectos` | Proyectos actuales y Media Lab; ficha con problema, proceso, resultado, fecha y equipo; historia en archivo |
| `/comunidad` | Noticias, eventos y sus detalles; directorio docente, campus y contactos de coordinación |
| `/oportunidades` | Prácticas y empleo, orientación CV/LinkedIn/GitHub, portales; vacantes propias solo si existe responsable |

En Alumnos se conservan Office 365, GPA Calculator, pagos, Tesorería, LeetCode, reglamentos, kardex y servicios escolares. En móvil: texto antes de imagen, listas verticales y acordeones solo para contenido secundario; sin navegación horizontal obligatoria ni plan oculto en pestañas.

## 4. Voz de ISGC

**Rigurosa, cercana y orientada a las personas.** La [identidad UP](https://www.up.edu.mx/sobre-la-universidad-fundamentos-y-valores/) vincula rigor científico, formación integral, humanismo cristiano, responsabilidad y servicio. Traducir esos principios en decisiones, experiencias y consecuencias humanas de la tecnología.

Hablar de «tú» para orientar y de «nosotros» para compromisos institucionales. Frases breves, verbos concretos y tecnicismos explicados. Patrón de copy: **qué haces + cómo lo aprendes + para qué sirve**. Aspirantes necesitan contexto; alumnos, acción, fecha y responsable. Evitar superioridad sin evidencia, promesas de empleo y clichés sobre “revolucionar el futuro”.

Ejemplo aspirantes: «Aprende a diseñar software y sistemas computacionales con rigor técnico y responsabilidad hacia las personas». Ejemplo operativo: «Consulta los requisitos y fechas de tu trámite en Servicios Escolares». CTAs específicos: «Consulta el plan», «Contacta a Coordinación», «Revisa las becas».

## 5. Desarrollo y operación

**Base:** Next.js con App Router y TypeScript; contenido renderizado en servidor, componentes cliente únicamente para menú, búsqueda local y acordeones. Tailwind CSS con tokens semánticos de color, tipografía y espacio. Contenido estable en archivos estructurados; imágenes optimizadas, metadatos por ruta y enlaces descriptivos. Referencias: [Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components) y [Tailwind](https://tailwindcss.com/docs/theme).

**Backend:** no necesario para la primera versión si las actualizaciones pasan por desarrollo. Enlazar admisiones y servicios existentes. Incorporar Supabase únicamente si Coordinación necesita editar noticias, eventos y vacantes sin desarrollador: panel editorial con acceso restringido, borrador/publicación y caducidad; lectura pública solo de lo publicado. [Supabase Auth](https://supabase.com/docs/guides/auth) serviría para el acceso editorial; los permisos deberán limitarse por rol. El centro de alumnos puede ser público: uso interno no implica crear cuentas ni replicar UP4U.

**Antes de desarrollar:** validar nombre, plan vigente, especialidades y doble carrera con Coordinación; las fuentes [UP institucional](https://www.up.edu.mx/educacion-facultad-de-ingenieria-oferta-academica-licenciatura-ingenieria-en-sistemas-y-graficas-computacionales/) y [CSE Guadalajara](https://movil.up.edu.mx/gdl/ingenieria-en-sistemas-y-graficas-computacionales) no deben mezclarse sin revisión. Confirmar becas, contactos, enlaces y derechos de imágenes. No asumir vigentes las cifras ni requisitos del mockup; proyectos de 2013–2015 deben presentarse como históricos.

**Criterios de entrega futura:** tareas frecuentes a un clic desde Alumnos; plan y admisiones a máximo dos desde portada; revisión móvil a 360/390 px y escritorio, teclado y foco visible; objetivo WCAG 2.2 AA y carga inicial ligera. Cada contenido operativo tendrá responsable y fecha de revisión. Medir por separado acceso a herramientas y clics a admisiones/plan; validar comprensión con alumnos y aspirantes antes del lanzamiento.


## 6. Dirección visual actualizada · balance 70/30

La dirección vigente conserva una base institucional y profesional, con acentos juveniles inspirados en interfaces de videojuegos. El 70/30 expresa una intención visual, no una cuota de elementos.

- Mantener Satoshi para lectura y títulos con mayor peso. Monoespaciada solo en etiquetas técnicas pequeñas.
- Conservar tinto, marfil y grafito, con dorado puntual. Radios de 8 px y acciones claras para ambas audiencias.
- Concentrar retículas, geometría tridimensional, numeración y respuestas breves al hover/foco en exploración y proyectos. Respetar movimiento reducido.
- Hero compacto con nombre de carrera principal y eslogan secundario. Usar una ilustración vectorial identificable como tal mientras no existan fotografías propias verificadas.
- No presentar ejemplos como proyectos actuales, ni distribuciones de materias sin validar como un plan oficial. Los eventos pendientes de confirmación permanecen sin publicar; el filtro de caducidad se evalúa en servidor en cada solicitud.
- Pendientes editoriales: plan oficial descargable, fotografías propias, validación institucional de enlaces y oferta académica, testimonios autorizados y noticias verificadas.


### Ajuste visual vigente · tarjetas flotantes

Las zonas que agrupan contenido en cards se presentan como tarjetas separadas sobre el fondo común, con sombras suaves. Las secciones estructurales conservan su ancho completo. Las superficies rellenas no llevan trazos de borde; los contornos se reservan para controles huecos. Se eliminan eyebrows, microetiquetas, chips y numeraciones decorativas. Fechas, autoría y contexto histórico permanecen como texto normal. Esta dirección sustituye las etiquetas técnicas y esquinas marcadas de la iteración anterior.
