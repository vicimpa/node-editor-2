import { Component, PropsWithChildren } from "react";
import { signalRef, useComposeEffect } from "@/library/signals";

import computeCount from "./calc/computeCount";
import { connect } from "@/library/connect";
import { createSvgElement } from "@/utils/createSvgElement";
import detectResize from "./plugins/detectResize";
import { elements } from "@/library/elements";
import { provide } from "@/library/provide";
import { signal } from "@preact/signals-react";

@provide()
@connect(detectResize)
export class NodeList extends Component<PropsWithChildren> {
  ref = signalRef<SVGGElement>();

  store = elements(() => createSvgElement('g'));
  count = computeCount(this);

  x = signal(0);
  y = signal(0);

  width = signal(0);
  height = signal(0);

  order = 0;

  useItem() {
    const ref = this.store.useRef();

    useComposeEffect([this.ref, ref],
      (group, elem) => {
        if (!group || !elem)
          return;

        group.appendChild(elem);
        elem.id = `${this.order++}`;

        return () => {
          group.removeChild(elem);
        };
      }
    );

    return ref;
  }

  focus(elem: SVGGElement) {
    if (!elem.parentElement)
      return;

    if (!elem.nextElementSibling)
      return;

    elem.parentElement.appendChild(elem);
    return true;
  }

  render() {
    return (
      <>
        <g ref={this.ref} />
        {this.props.children}
      </>
    );
  }
}