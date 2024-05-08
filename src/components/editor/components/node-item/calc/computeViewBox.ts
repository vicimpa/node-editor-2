import { NodeItem } from "../NodeItem";
import { Vec2 } from "@/library/vec2";
import { computed } from "@preact/signals-react";

export default (ctx: NodeItem) => (
  computed(() => {
    const size = Vec2.fromSignals(
      ctx.width,
      ctx.height
    );

    return new DOMRect(
      ...size.ctimes(-.5),
      ...size,
    );
  })
);