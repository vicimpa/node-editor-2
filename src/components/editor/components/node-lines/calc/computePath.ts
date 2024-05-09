import { NodeLine } from "../NodeLine";
import { computed } from "@preact/signals-react";

export default (ctx: NodeLine) => (
  computed(() => {
    const from = ctx.fromPoint.value;
    const to = ctx.toPoint.value;

    const fromStep = from.cplus(ctx.fromDelta.value);
    const toStep = to.cplus(ctx.toDelta.value);

    return [
      'M', ...from,
      'C', ...fromStep, ...toStep, ...to
    ].join(' ');
  })
);