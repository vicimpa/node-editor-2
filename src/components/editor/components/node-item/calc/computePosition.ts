import { NodeItem } from "../NodeItem";
import { Vec2 } from "@/library/vec2";
import { computed } from "@preact/signals-react";

export default (ctx: NodeItem) => (
  computed(() => Vec2.fromSignals(ctx.x, ctx.y))
); 