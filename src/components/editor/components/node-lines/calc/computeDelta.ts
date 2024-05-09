import { Signal, computed } from "@preact/signals-react";

import { NodeLine } from "../NodeLine";
import { NodePort } from "../../node-port";
import { Vec2 } from "@/library/vec2";
import { minMax } from "@/library/math";

export default (ctx: NodeLine, port: Signal<NodePort | undefined>) => (
  computed(() => (
    (port.value?.dir.value ?? new Vec2(0, 0))
      .ctimes(minMax(ctx.distance.value / 2, 50, Infinity))
  )
  )
);