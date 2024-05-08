import { NodeMap } from "../NodeMap";
import { batch } from "@preact/signals-react";
import { composeEffect } from "@/library/signals";
import { resize } from "@/utils/resize";

export default (ctx: NodeMap) => (
  composeEffect([ctx.div], (div) => {
    if (!div) return;

    return resize(div, (newRect) => {
      batch(() => {
        ctx.offsetX.value = newRect.contentRect.x;
        ctx.offsetY.value = newRect.contentRect.y;
        ctx.offsetWidth.value = newRect.contentRect.width;
        ctx.offsetHeight.value = newRect.contentRect.height;
      });
    });
  })
);