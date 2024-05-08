import { NodeItem } from "../NodeItem";
import { composeEffect } from "@/library/signals";

export default (ctx: NodeItem) => (
  composeEffect([ctx.ref, ctx.viewBox], (svg, { x, y, width, height }) => {
    if (!svg) return;
    svg.x.baseVal.value = ctx.x.value + x;
    svg.y.baseVal.value = ctx.y.value + y;
    svg.width.baseVal.value = width;
    svg.height.baseVal.value = height;
  })
);