import { NodeItem } from "../NodeItem";
import { Vec2 } from "@/library/vec2";
import { composeEffect } from "@/library/signals";
import { looper } from "@/library/looper";
import { makeDrag } from "@/utils/makeDrag";
import { refEvent } from "@/library/events";

export default (ctx: NodeItem) => (
  composeEffect([ctx.ref, ctx.resizer], (ref, div) => {
    if (!ref || !div) return;

    const { map, x, y } = ctx;

    const drag = makeDrag(({ start, current }) => {
      const offset = map.offset(start);
      const correct = Vec2.fromSignals(x, y).minus(offset);
      const dispose = looper((_, dtime) => {
        map.calcViewTransitionVec(current, dtime)
          .toSignals(map.x, map.y);

        correct
          .cplus(map.offset(current))
          .toSignals(x, y);
      });

      return ({ current: newCurrent }) => {
        current.set(newCurrent);
        return dispose;
      };
    });

    return refEvent(ctx.resizer, 'mousedown', (e) => {
      if (
        false
        || e.button
        || !(e.target instanceof Element)
      ) return;

      if (ctx.focus()) {
        addEventListener('mouseup', (j) => {
          if (e.target === j.target)
            e.target?.dispatchEvent(new MouseEvent('click', j));
        }, { once: true });
      }

      for (const elem of ctx.mover) {
        if (
          true
          && elem instanceof HTMLElement
          && (
            false
            || elem === e.target
            || elem.contains(e.target)
          )
        ) {
          return drag(e, elem);
        }
      }
    });
  })
);