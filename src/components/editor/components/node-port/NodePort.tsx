import { Component, ReactNode, useId } from "react";
import { connect, inject } from "@/library/connect";

import { NodeItem } from "../node-item/NodeItem";
import { NodeLines } from "../node-lines";
import computePosition from "./calc/computePosition";
import detectPosition from "./plugins/detectPosition";
import { provider } from "@/library/provide";
import registerPort from "./plugins/registerPort";
import s from "./NodePort.module.sass";
import { signal } from "@preact/signals-react";
import { signalRef } from "@/library/signals";

export type NodePortProps = {
  id?: string;
  title?: string;
  color?: string;
  meta?: any;
  onConnect?: (port: NodePort) => any;
  onDisconnect?: (port: NodePort) => any;
};

@connect(detectPosition, registerPort)
export class NodePort extends Component<NodePortProps> {
  @inject(useId)
  id!: string;

  @inject(provider(NodeLines))
  lines!: NodeLines;

  ref = signalRef<HTMLSpanElement>();

  x = signal(0);
  y = signal(0);

  pos = computePosition(this);

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
        className={s.port}
      />
    );
  }
}