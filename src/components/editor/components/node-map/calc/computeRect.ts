import { NodeMap } from "../NodeMap";
import { computed } from "@preact/signals-react";

export default (ctx: NodeMap) => {
  return computed(() => new DOMRect(
    ctx.offsetX.value,
    ctx.offsetY.value,
    ctx.offsetWidth.value,
    ctx.offsetHeight.value
  ));
};