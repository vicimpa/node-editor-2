import { NodeMap } from "../NodeMap";
import { Vec2 } from "@/library/vec2";
import { refEvent } from "@/library/events";

export default (map: NodeMap) => (
  refEvent(map.div, 'wheel', (e) => {
    const { s, x, y, move } = map;

    if (move.value) return;

    e.preventDefault();
    e.stopPropagation();

    if (!e.ctrlKey) {
      const delta = Vec2.fromDeltaXY(e);

      if (e.shiftKey && !delta.x)
        delta.inverse();

      delta
        .div(s)
        .plus(x, y)
        .toSignals(x, y);

      return;
    }

    const mouse = Vec2.fromPageXY(e);
    map.toScale(v => v - e.deltaY * v * .001, mouse);
  })
);