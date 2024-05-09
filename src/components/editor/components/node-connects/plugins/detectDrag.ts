import { NodeConnects } from "../NodeConnects";
import { NodePort } from "../../node-port";
import { looper } from "@/library/looper";
import { makeDrag } from "@/utils/makeDrag";
import { windowEvent } from "@/library/events";

export default (ctx: NodeConnects) => {
  const drag = makeDrag(({ target, start, current, event: { metaKey, ctrlKey } }) => {
    const port = ctx.findPort(target);
    const line = ctx.findLine(target);
    const { map } = ctx;

    ctx.mouse.value = map.offset(start);
    const distance = (port: NodePort) => (
      ctx.mouse.peek().distance(port.pos.peek())
    );

    if (port) {
      if (ctrlKey || metaKey) {
        ctx.active.value = ctx.drop(port);
      } else {
        ctx.active.value = [port];
      }
    }

    if (line && line.to.peek()) {
      const [from, to] = [line.from.peek()!, line.to.peek()!]
        .sort((a, b) => distance(a) - distance(b));

      ctx.active.value = ctx.drop(from, to);
    }

    if (!ctx.active.peek().length)
      return;

    const connect = ctx.connect(...ctx.active.peek());

    const dispose = looper((_, dtime) => {
      map.calcViewTransitionVec(current, dtime)
        .toSignals(map.x, map.y);

      ctx.mouse.value = map.offset(current);
    });

    return ({ current: newCurrent }) => {
      current.set(newCurrent);

      return ({ target }) => {
        dispose();
        ctx.active.value = [];
        const port = ctx.findPort(target);
        if (port) connect(port);
      };
    };
  });

  return windowEvent('mousedown', drag);
};