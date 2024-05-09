import { Component, ReactNode, useId } from "react";
import { connect, inject } from "@/library/connect";

import { NodeConnects } from "../node-connects";
import { NodeItem } from "../node-item/NodeItem";
import { Vec2 } from "@/library/vec2";
import computePosition from "./calc/computePosition";
import detectPosition from "./plugins/detectPosition";
import { provider } from "@/library/provide";
import registerPort from "./plugins/registerPort";
import s from "./NodePort.module.sass";
import { signal } from "@preact/signals-react";
import { signalRef } from "@/library/signals";

export type PortDirection =
  | 'point'
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright';

export type NodePortProps = {
  id?: string;
  title?: string;
  color?: string;
  meta?: any;
  dir?: PortDirection;
  onConnect?: (port: NodePort) => any;
  onDisconnect?: (port: NodePort) => any;
};

function computeDir(dir?: PortDirection) {
  const out = new Vec2();
  if (!dir) return out;
  if (dir.includes('top')) out.y -= 1;
  if (dir.includes('bottom')) out.y += 1;
  if (dir.includes('left')) out.x -= 1;
  if (dir.includes('right')) out.x += 1;
  return out.normalize();
}

@connect(detectPosition, registerPort)
export class NodePort extends Component<NodePortProps> {
  @inject(useId)
  id!: string;

  @inject(provider(NodeConnects))
  connects!: NodeConnects;

  ref = signalRef<HTMLSpanElement>();

  x = signal(0);
  y = signal(0);

  pos = computePosition(this);
  dir = signal(computeDir(this.props.dir));

  componentDidUpdate(prevProps: Readonly<NodePortProps>): void {
    if (this.props.dir !== prevProps.dir)
      this.dir.value = computeDir(this.props.dir);
  }

  onConnect(port: NodePort) {
    try {
      return !this.props.onConnect || this.props.onConnect(port);
    } catch (e) {
      return false;
    }
  }

  onDisconnect(port: NodePort) {
    try {
      return !this.props.onDisconnect || this.props.onDisconnect(port);
    } catch (e) {
      return false;
    }
  }

  @inject(provider(NodeItem))
  nodeItem!: NodeItem;

  render(): ReactNode {
    return (
      <span
        id={this.id}
        ref={this.ref}
        className={`${s.port} ${s[this.props.dir ?? 'center'] ?? ''}`}
      />
    );
  }
}