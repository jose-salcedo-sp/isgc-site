import type { GraphText } from "./graph-model";
import type { RadialNode } from "./graph-radial";

export const moveTip = (
  tip: HTMLDivElement | null,
  event: { clientX: number; clientY: number },
  hit: RadialNode | null,
  text: GraphText
): void => {
  if (!tip) {
    return;
  }
  if (!hit) {
    tip.hidden = true;
    return;
  }
  tip.hidden = false;
  tip.style.left = `${event.clientX + 14}px`;
  tip.style.top = `${event.clientY + 10}px`;
  const label = tip.querySelector("[data-tip-label]");
  const kind = tip.querySelector("[data-tip-kind]");
  if (label) {
    label.textContent = hit.label;
  }
  if (kind) {
    const unit = hit.degree === 1 ? text.connectionOne : text.connectionMany;
    kind.textContent = `${text.kinds[hit.kind]} · ${hit.degree} ${unit}`;
  }
};
