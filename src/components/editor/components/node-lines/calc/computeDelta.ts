import { Signal, computed } from "@preact/signals-react";

import { NodeLine } from "../NodeLine";
import { NodePort } from "../../node-port";
import { Vec2 } from "@/library/vec2";

export default (ctx: NodeLine, port: Signal<NodePort | undefined>) => (
  computed(() => (
    port.value?.nodeItem.pos.value.cminus(port.value.pos.value).normalize() ?? new Vec2(0, 0)
  ).times(-ctx.distance.value / 2))
);