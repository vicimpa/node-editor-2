import { Component, ReactNode } from "react";
import { batch, computed, signal } from "@preact/signals-react";

import computeViewBox from "./calc/computeViewBox";
import { connect } from "@/library/connect";
import detectResize from "./plugins/detectResize";
import detectViewBox from "./plugins/detectViewBox";
import { provide } from "@/library/provide/provide";
import rsp from "@vicimpa/rsp";
import { signalRef } from "@/library/signals";
import { useEffect } from "react";

export type NodePatternProps = {
  id: string;
  children?: ReactNode;
};

@provide()
@connect(detectResize, detectViewBox)
export class NodePattern extends Component<NodePatternProps> {
  ref = signalRef<SVGPatternElement>();
  group = signalRef<SVGGElement>();

  anchorX = signal(.5);
  anchorY = signal(.5);

  currentWidth = signal(0);
  currentHeight = signal(0);

  userWidth = signal<number | undefined>(undefined);
  userHeight = signal<number | undefined>(undefined);

  viewBox = computeViewBox(this);

  width = computed(() => this.viewBox.value.width);
  height = computed(() => this.viewBox.value.height);

  useAnchor(x = 0, y = x) {
    useEffect(() => {
      batch(() => {
        this.anchorX.value = x;
        this.anchorY.value = y;
      });
    }, [x, y]);

    return this;
  }

  useSize(width = 0, height = width) {
    useEffect(() => {
      batch(() => {
        this.userWidth.value = width;
        this.userHeight.value = height;
      });
    }, [width, height]);

    return this;
  }

  render() {
    return (
      <defs>
        <rsp.pattern
          id={this.props.id}
          ref={this.ref}
          width={this.width}
          height={this.height}
          patternUnits="userSpaceOnUse"
        >
          <g ref={this.group}>
            {this.props.children}
          </g>
        </rsp.pattern>
      </defs>
    );
  }
}
