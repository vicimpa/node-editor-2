import { CSSProperties } from "react";
import { Slider } from "../Slider";
import { computed } from "@preact/signals-react";
import { minMax } from "@/library/math";

export default (ctx: Slider) => (
  computed(() => {
    const { min, max, value: { value } } = ctx;
    const val = (value.value - min.value) / (max.value - min.value);

    return {
      '--value': minMax(val, 0, 1)
    } as CSSProperties;
  })
);