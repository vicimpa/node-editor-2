import { NodePort } from "../NodePort";
import { Vec2 } from "@/library/vec2";
import { computed } from "@preact/signals-react";

export default (ctx: NodePort) => (
  computed(() => Vec2.fromSignals(ctx.x, ctx.y))
);