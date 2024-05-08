import { Component, ReactNode, RefCallback } from "react";
import { connect, inject } from "@/library/connect";
import { provide, provider } from "@/library/provide";

import { NodeList } from "../node-list";
import { NodeMap } from "../node-map";
import computeViewBox from "./calc/computeViewBox";
import detectDrag from "./plugins/detectDrag";
import detectResize from "./plugins/detectResize";
import detectViewBox from "./plugins/detectViewBox";
import s from "./NodeItem.module.sass";
import { signal } from "@preact/signals-react";
import { signalRef } from "@/library/signals";
import { useRefPortal } from "@/components/ref-portal";

export type NodeItemProps = {
  x?: number;
  y?: number;
  meta?: any;
  children?: ReactNode;
};

@provide()
@connect(detectResize, detectViewBox, detectDrag)
export class NodeItem extends Component<NodeItemProps> {
  @inject(provider(NodeMap))
  map!: NodeMap;

  @inject(provider(NodeList))
  list!: NodeList;

  @inject(useRefPortal)
  item!: Element;

  ref = signalRef<SVGForeignObjectElement>();
  resizer = signalRef<HTMLDivElement>();

  mover = [] as Element[];

  x = signal(this.props.x ?? 0);
  y = signal(this.props.y ?? 0);

  width = signal(0);
  height = signal(0);

  viewBox = computeViewBox(this);

  get meta() { return this.props.meta; }

  focus() {
    return this.list.focus(this.item as any);
  }

  useMover(): RefCallback<Element> {
    this.mover = [];

    return (elem) => {
      if (elem) {
        this.mover = [
          ...this.mover,
          elem,
        ];
        elem.classList.add(s.mover);
      }

    };
  }

  render() {
    return (
      <foreignObject ref={this.ref} className={s.item}>
        <div className={s.container}>
          <div ref={this.resizer} className={s.resizer}>
            {this.props.children}
          </div>
        </div>
      </foreignObject>
    );
  }
}