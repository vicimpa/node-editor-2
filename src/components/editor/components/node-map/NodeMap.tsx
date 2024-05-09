import { Component, PropsWithChildren } from "react";
import { FV, fv } from "@/utils/fv";
import { TPageXY, Vec2 } from "@/library/vec2";
import { signalCorrect, signalRef } from "@/library/signals";

import computeRect from "./calc/computeRect";
import computeViewBox from "./calc/computeViewBox";
import { connect } from "@/library/connect";
import detectCursor from "./plugins/detectCursor";
import detectDrag from "./plugins/detectDrag";
import detectResize from "./plugins/detectResize";
import detectViewBox from "./plugins/detectViewBox";
import detectWhell from "./plugins/detectWhell";
import { minMax } from "@/library/math";
import { provide } from "@/library/provide";
import { rectCenter } from "@/library/domrect";
import rsp from "@vicimpa/rsp";
import s from "./NodeMap.module.sass";
import { signal } from "@preact/signals-react";

@provide()
@connect(
  detectResize,
  detectViewBox,
  detectDrag,
  detectWhell,
  detectCursor,
)
export class NodeMap extends Component<PropsWithChildren> {
  div = signalRef<HTMLDivElement>();
  svg = signalRef<SVGSVGElement>();

  x = signal(0);
  y = signal(0);
  s = signalCorrect(1, v => minMax(v, .1, 1.5));

  mouse = signal(new Vec2());

  offsetX = signal(0);
  offsetY = signal(0);
  offsetWidth = signal(0);
  offsetHeight = signal(0);

  move = signal<true | undefined>(undefined);
  rect = computeRect(this);
  viewBox = computeViewBox(this);

  mousePadding = 50;

  offset(vec: Vec2 | TPageXY): Vec2 {
    if (!(vec instanceof Vec2))
      return this.offset(Vec2.fromPageXY(vec));

    const { value: rect } = this.viewBox;
    const { value: viewRect } = this.rect;

    return vec.cminus(viewRect).div(this.s).plus(rect);
  }

  toScale(newScale: FV<number, [old: number]>, vec = rectCenter(this.rect.value)) {
    const start = this.offset(vec);
    this.s.value = fv(newScale, this.s.peek());
    start.minus(this.offset(vec));
    start.plus(this.x, this.y);
    start.toSignals(this.x, this.y);
  }

  calcViewTransitionVec(current: Vec2, dtime: number) {
    const min = new Vec2(this.rect.value);
    const max = Vec2.fromSize(this.rect.value).plus(min);
    return Vec2.fromSignals(this.x, this.y)
      .plus(
        current
          .cminus(min).minus(this.mousePadding).cropMax(0).cropMin(-this.mousePadding * this.mousePadding)
          .plus(current.cminus(max).plus(this.mousePadding).cropMin(0).cropMax(this.mousePadding * this.mousePadding))
          .times(dtime * .01 / this.s.value)
      );
  }

  render() {
    const { props } = this;

    return (
      <div ref={this.div} className={s.map}>
        <rsp.svg ref={this.svg} data-move={this.move}>
          {props.children}
        </rsp.svg>
      </div>
    );
  }
}
