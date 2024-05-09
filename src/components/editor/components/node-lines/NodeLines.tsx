import { Component, PropsWithChildren, ReactNode } from "react";
import { connect, inject } from "@/library/connect";
import { provide, provider } from "@/library/provide";

import { NodeLinesView } from "./NodeLinesView";
import { NodeMap } from "../node-map";
import { NodePort } from "../node-port";
import { Vec2 } from "@/library/vec2";
import detectDrag from "./plugins/detectDrag";
import { signal } from "@preact/signals-react";

export type TLine = [
  from: NodePort,
  to: NodePort
];

@provide()
@connect(detectDrag)
export class NodeLines extends Component<PropsWithChildren> {
  @inject(provider(NodeMap))
  map!: NodeMap;

  mouse = signal(new Vec2());
  ports = new Set<NodePort>();

  lines = signal<TLine[]>([]);
  active = signal<NodePort[]>([]);

  findPort(target?: EventTarget | null) {
    return [...this.ports]
      .find(({ ref }) => ref.peek() === target);
  }

  check(a: NodePort, b: NodePort) {
    return !!this.lines.peek()
      .find(item => item.includes(a) && item.includes(b));
  }

  drop(port: NodePort, from?: NodePort) {
    const active: NodePort[] = [];

    this.lines.value = this.lines.peek()
      .filter(item => {
        const now = item.includes(port) && (
          !from || item.includes(from)
        );

        if (now) {
          var [a, b] = item;
          if (a !== port)
            [a, b] = [b, a];

          if (
            false
            || !a.onDisconnect(b)
            || !b.onDisconnect(a)
          ) return true;

          active.push(b);
        }

        return !now;
      });

    return active;
  }

  connect(..._from: NodePort[]) {
    return (..._to: NodePort[]) => {
      const appendLines: TLine[] = [];

      for (const from of _from) {
        for (const to of _to) {
          if (
            true
            && !this.check(from, to)
            && from !== to
            && from.onConnect(to)
            && to.onConnect(from)
          ) {
            appendLines.push([from, to]);
          }
        }
      }

      this.lines.value = [
        ...this.lines.peek(),
        ...appendLines
      ];
    };
  }

  render(): ReactNode {
    return (
      <>
        <NodeLinesView lines={this.lines} mouse={this.mouse} />
        {this.props.children}
        <NodeLinesView lines={this.active} mouse={this.mouse} />
      </>
    );
  }
}