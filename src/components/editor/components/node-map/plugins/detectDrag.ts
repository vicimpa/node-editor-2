import { NodeMap } from "../NodeMap";
import { Vec2 } from "@/library/vec2/Vec2";
import { composeEffect } from "@/library/signals";
import { makeDrag } from "@/utils/makeDrag";
import { windowEvent } from "@/library/events";

export default (ctx: NodeMap) => {
  composeEffect([ctx.div, ctx.svg], (div, ref) => {
    if (!ref || !div) return;

    const { x, y, s, move } = ctx;
    const drag = makeDrag(({ start }) => (
      start = Vec2.fromSignals(x, y),
      move.value = true,
      ({ delta }) => {
        delta
          .div(s)
          .plus(start)
          .toSignals(x, y);

        return () => {
          move.value = undefined;
        };
      }
    ), 1);

    return windowEvent('mousedown', (e) => {
      if (
        false
        || !(e.target instanceof Element)
        || !div.contains(e.target)
      ) return;

      drag(e);
    });
  });
};