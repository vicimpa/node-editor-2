import { NodeConnects } from "../NodeConnects";
import { looper } from "@/library/looper";
import { makeDrag } from "@/utils/makeDrag";
import { windowEvent } from "@/library/events";

export default (ctx: NodeConnects) => {
  const drag = makeDrag(({ target, start, current, event: { metaKey, ctrlKey } }) => {
    const port = ctx.findPort(target);
    const { map } = ctx;

    if (port) {
      if (ctrlKey || metaKey) {
        ctx.active.value = ctx.drop(port);
      } else {
        ctx.active.value = [port];
      }
    }
    ctx.mouse.value = map.offset(start);

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