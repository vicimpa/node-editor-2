import { NodeList } from "../NodeList";
import { composeEffect } from "@/library/signals";
import { resize } from "@/utils/resize";

export default (ctx: NodeList) => (
  composeEffect([ctx.ref], (elem) => {
    if (!elem)
      return;

    const { x, y, width, height } = ctx;

    return resize(elem, () => {
      const box = elem.getBBox();

      x.value = box.x;
      y.value = box.y;
      width.value = box.width;
      height.value = box.height;
    });
  })
);