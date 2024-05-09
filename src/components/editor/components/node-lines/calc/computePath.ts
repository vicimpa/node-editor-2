import { NodeLine } from "../NodeLine";
import { Path2D } from "@/library/path2d";
import { computed } from "@preact/signals-react";

export default (ctx: NodeLine) => (
  computed(() => {
    const from = ctx.fromPoint.value;
    const to = ctx.toPoint.value;
    const fromStep = from.cplus(ctx.fromDelta.value);
    const toStep = to.cplus(ctx.toDelta.value);

    return (
      new Path2D()
        .moveTo(from)
        .cubicBezierCurve(fromStep, toStep, to)
        .toString()
    );
  })
);