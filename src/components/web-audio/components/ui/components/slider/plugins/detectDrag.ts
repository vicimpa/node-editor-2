import { Slider } from "../Slider";
import { Vec2 } from "@/library/vec2";
import { composeEffect } from "@/library/signals";
import { dispose } from "@/utils/dispose";
import { makeDrag } from "@/utils/makeDrag";
import { minMax } from "@/library/math";
import { refEvent } from "@/library/events";

export default (ctx: Slider) => (
  composeEffect([ctx.ref, ctx.point], (div, point) => {
    if (!div || !point)
      return;

    const { min, max } = ctx;
    const { value } = ctx.value;

    const cof = () => {
      return new Vec2(max.value - min.value)
        .div(
          Vec2.fromOffsetSize(div)
            .minus(Vec2.fromOffsetSize(point))
        );
    };

    const saveDate = (vec: Vec2) => {
      value.value = minMax(
        ctx.props.vertical ? vec.y : vec.x,
        min.value,
        max.value,
      );
    };

    const drag = makeDrag(({ target, start: offset }) => {
      if (target !== point) {
        saveDate(
          offset
            .minus(Vec2.fromOffsetSize(point).times(.5))
            .times(cof())
            .plus(min.value)
        );
      }

      const start = new Vec2(value);

      return ({ delta }) => {
        saveDate(
          delta
            .div(ctx.map.s.value)
            .times(cof())
            .times(-1)
            .plus(start)
        );
      };
    }, undefined, true);

    return dispose(
      refEvent(ctx.ref, 'mousedown', drag),
      refEvent(ctx.ref, 'contextmenu', e => {
        e.preventDefault();
        value.value = ctx.props.defaultValue ?? 0;
      })
    );
  })
);