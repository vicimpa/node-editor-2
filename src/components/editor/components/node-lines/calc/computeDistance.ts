import { NodeLine } from "../NodeLine";
import { computed } from "@preact/signals-react";

export default (ctx: NodeLine) => (
  computed(() => ctx.fromPoint.value.distance(ctx.toPoint.value))
);