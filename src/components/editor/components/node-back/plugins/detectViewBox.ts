import { NodePattern } from "../NodePattern";
import { composeEffect } from "@/library/signals";

export default (ctx: NodePattern) => (
  composeEffect([ctx.ref], (pattern) => {
    if (!pattern)
      return;

    const { x, y, width: w, height: h } = ctx.viewBox.value;
    pattern.setAttribute('viewBox', [x, y, w, h].join(' '));
  })
);