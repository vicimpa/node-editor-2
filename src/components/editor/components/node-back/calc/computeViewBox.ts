import { NodePattern } from "../NodePattern";
import { Vec2 } from "@/library/vec2";
import { computed } from "@preact/signals-react";

export default (ctx: NodePattern) => (
  computed(() => {
    const width = ctx.userWidth.value ?? ctx.currentWidth.value;
    const height = ctx.userHeight.value ?? ctx.currentHeight.value;

    return new DOMRect(
      ...new Vec2(width, height)
        .times(
          Vec2.fromSignals(ctx.anchorX, ctx.anchorY)
            .times(-1)
        ),
      width,
      height
    );
  })
);