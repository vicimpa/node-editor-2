import { NodeMap } from "../NodeMap";
import { assign } from "@/library/object";
import { composeEffect } from "@/library/signals";

export default (ctx: NodeMap) => (
  composeEffect([ctx.svg], (svg) => {
    if (!svg) return;
    assign(svg.viewBox.baseVal, ctx.viewBox.value.toJSON());
  })
);