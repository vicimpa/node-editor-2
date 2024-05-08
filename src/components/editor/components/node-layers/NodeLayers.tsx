import { Component, FC, PropsWithChildren, ReactNode } from "react";

import { NodeLayer } from "./NodeLayer";
import { RefPortal } from "@/components/ref-portal";
import { connect } from "@/library/connect";
import { provide } from "@/library/provide";
import { useComposeEffect } from "@/library/signals";

export type Layer = keyof NodeLayers['layers'];

export type LayerPortalProps = {
  layer?: Layer;
  children?: ReactNode;
};

@provide()
@connect()
export class NodeLayers extends Component<PropsWithChildren> {
  layers = {
    pre: new NodeLayer(),
    post: new NodeLayer(),
  } as const;

  useLayer<K extends Layer>(layer: K) {
    const layerObject = this.layers[layer];
    const ref = layerObject.store.useRef();
    const parent = layerObject.ref;

    useComposeEffect([parent, ref], (parent, ref) => {
      if (!ref || !parent)
        return;

      parent.appendChild(ref);

      return () => {
        parent.removeChild(ref);
      };
    });

    return ref;
  }

  Portal: FC<LayerPortalProps> = ({ children, layer = 'pre' }) => (
    <RefPortal target={this.useLayer(layer)}>
      {children}
    </RefPortal>
  );

  render(): ReactNode {
    const { pre, post } = this.layers;

    return (
      <>
        <g ref={pre.ref} />
        {this.props.children}
        <g ref={post.ref} />
      </>
    );
  }
}