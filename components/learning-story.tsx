import Link from "next/link";

const steps = [
  { number: "01", title: "Todo empieza con una pregunta.", text: "¿Y si pudieras construir eso que imaginas? Observa lo que te rodea, encuentra un problema y convierte tu curiosidad en una idea." },
  { number: "02", title: "La idea toma forma contigo.", text: "Escribe, prueba, equivócate y vuelve a intentar. Con código, datos y gráficas, cada decisión convierte lo abstracto en algo que funciona." },
  { number: "03", title: "Alguien más lo hace parte de su vida.", text: "Una herramienta que ayuda. Una experiencia que conecta. Lo que aprendes cobra sentido cuando otras personas pueden usarlo." },
];

export function LearningStory() {
  return (
    <section id="historia" className="learning-story" aria-labelledby="story-title">
      <div className="story-layout">
        <div className="story-stage">
          <span className="story-eyebrow">De la curiosidad al impacto</span>
          <h2 id="story-title">Una idea.<br />Todo lo que <em>puede ser.</em></h2>
          <div className="story-art" aria-hidden="true">
            <div className="story-grid" />
            <div className="story-orbit"><i /><i /></div>
            <div className="story-connection connection-one" />
            <div className="story-connection connection-two" />
            <div className="story-core"><span>{"{ }"}</span></div>
            <div className="story-node node-one">01</div>
            <div className="story-node node-two">02</div>
            <div className="story-node node-three">03</div>
            <span className="story-art-caption">IMAGINA · CONSTRUYE · TRANSFORMA</span>
          </div>
        </div>
        <div className="story-steps">
          <div className="story-progress" aria-hidden="true"><div className="story-progress-fill" /></div>
          {steps.map((step) => (
            <article key={step.number} className="story-step">
              <span className="story-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
          <Link href="/proyectos" className="story-link">Descubre lo que ya estamos creando <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
