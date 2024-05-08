import { Component, ReactNode } from "react";
import { Signal, signal } from "@preact/signals-react";
import { connect, inject } from "@/library/connect";

import { NodeMap } from "@/components/editor";
import { clsx } from "@/utils/clsx";
import computeStyle from "./calc/computeStyle";
import detectDrag from "./plugins/detectDrag";
import detectWheel from "./plugins/detectWheel";
import { provider } from "@/library/provide";
import rsp from "@vicimpa/rsp";
import s from "./Slider.module.sass";
import { signalRef } from "@/library/signals";

export type SliderProps = {
  value?: Signal<number>;
  min?: number;
  max?: number;
  vertical?: boolean;
  defaultValue?: number;
};


@connect(detectDrag, detectWheel)
export class Slider extends Component<SliderProps> {
  ref = signalRef<HTMLDivElement>();
  point = signalRef<HTMLDivElement>();

  value = signal(
    this.props.value ?? (
      signal(this.props.defaultValue ?? 0)
    )
  );

  min = signal(this.props.min ?? 0);
  max = signal(this.props.max ?? 100);

  style = computeStyle(this);

  @inject(provider(NodeMap))
  map!: NodeMap;

  componentDidUpdate(): void {
    const { value, min, max } = this.props;

    if (value && this.value.peek() !== value)
      this.value.value = value;

    if (min !== undefined && min !== this.min.peek())
      this.min.value = min;

    if (max !== undefined && max !== this.max.peek())
      this.max.value = max;
  }

  render(): ReactNode {
    return (
      <div
        ref={this.ref}
        className={clsx(
          s.slider,
          [s.vertical, this.props.vertical]
        )}
      >
        <rsp.div
          ref={this.point}
          className={s.point}
          style={this.style} />
      </div>
    );
  }
};