import { NodeMap } from "../NodeMap";
import { Vec2 } from "@/library/vec2/Vec2";
import { computed } from "@preact/signals-react";

export default (ctx: NodeMap) => (
  computed(() => {
    const { value: x } = ctx.x;
    const { value: y } = ctx.y;
    const { value: s } = ctx.s;
    const { value: w } = ctx.offsetWidth;
    const { value: h } = ctx.offsetHeight;
    const size = new Vec2(w, h).div(s);
    const pos = size.cdiv(-2).plus(x, y);
    return new DOMRect(...pos, ...size);
  })
);