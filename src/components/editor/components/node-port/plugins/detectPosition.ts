import { NodePort } from "../NodePort";
import { composeEffect } from "@/library/signals";
import { getOffset } from "@/utils/getOffset";

export default (ctx: NodePort) => (
  composeEffect([ctx.ref, ctx.nodeItem.resizer],
    (port, item) => {
      if (!port || !item) {
        ctx.connects.drop(ctx);
        return;
      }

      const { x, y, width, height } = ctx.nodeItem;

      getOffset(port, item)
        .plus(port.offsetWidth / 2, port.offsetHeight / 2)
        .minus(width.value / 2, height.value / 2)
        .plus(x.value, y.value)
        .toSignals(ctx.x, ctx.y);
    }
  )
);