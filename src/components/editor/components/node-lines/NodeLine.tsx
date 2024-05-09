import { Component, ReactNode } from "react";
import { connect, inject } from "@/library/connect";

import { NodeConnects } from "../node-connects";
import { NodePort } from "../node-port";
import computeDelta from "./calc/computeDelta";
import computeDistance from "./calc/computeDistance";
import computePath from "./calc/computePath";
import computePoint from "./calc/computePoint";
import { provider } from "@/library/provide";
import registerLine from "./plugins/registerLine";
import rsp from "@vicimpa/rsp";
import s from "./NodeLine.module.sass";
import { signal } from "@preact/signals-react";
import { signalRef } from "@/library/signals";

export type NodeLineProps = {
  from: NodePort,
  to?: NodePort;
};

@connect(registerLine)
export class NodeLine extends Component<NodeLineProps> {
  ref = signalRef<SVGPathElement>();

  @inject(provider(NodeConnects))
  connects!: NodeConnects;

  from = signal(this.props.from);
  to = signal(this.props.to);

  fromPoint = computePoint(this, this.from);
  toPoint = computePoint(this, this.to);

  distance = computeDistance(this);

  fromDelta = computeDelta(this, this.from);
  toDelta = computeDelta(this, this.to);

  path = computePath(this);

  componentDidUpdate(): void {
    if (this.from.peek() !== this.props.from)
      this.from.value = this.props.from;

    if (this.to.peek() !== this.props.to)
      this.to.value = this.props.to;
  }

  render(): ReactNode {
    return (
      <>
        <rsp.path
          ref={this.ref}
          d={this.path}
          fill="none"
          stroke="#fff"
          strokeWidth={3}
          className={this.props.to ? s.point : s.nopoint} />
      </>
    );
  }
}
