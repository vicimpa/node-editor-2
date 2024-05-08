import { Slider } from "../Slider";
import { effect } from "@preact/signals-react";
import { minMax } from "@/library/math";
import { refEvent } from "@/library/events";

export default (ctx: Slider) => (
  effect(() => {
    if (!ctx.ref.value)
      return;

    return refEvent(ctx.ref, 'wheel', (e) => {
      if (e.ctrlKey)
        return;

      e.preventDefault();
      e.stopPropagation();

      const total = ctx.max.value - ctx.min.value;

      ctx.value.value.value = minMax(
        ctx.value.value.value - e.deltaY * total / 5000,
        ctx.min.value,
        ctx.max.value
      );
    });
  })
);