import { NodeItem } from "../NodeItem";
import { batch } from "@preact/signals-react";
import { composeEffect } from "@/library/signals";
import { resize } from "@/utils/resize";

export default (ctx: NodeItem) => (
  composeEffect([ctx.resizer], (div) => {
    if (!div) return;

    return resize(div, (entry) => {
      batch(() => {
        ctx.width.value = entry.contentRect.width;
        ctx.height.value = entry.contentRect.height;
      });
    });
  })
);