import { NodePattern } from "../NodePattern";
import { batch } from "@preact/signals-react";
import { composeEffect } from "@/library/signals";
import { resize } from "@/utils/resize";

export default (ctx: NodePattern) => (
  composeEffect([ctx.group], (group) => {
    if (!group)
      return;

    return resize(group, (e) => {
      batch(() => {
        ctx.currentWidth.value = e.contentRect.width;
        ctx.currentHeight.value = e.contentRect.height;
      });
    });
  })
);