import { NodeItem, NodeItemProps } from "./NodeItem";

import { FC } from "react";
import { NodeList } from "../node-list";
import { RefPortal } from "@/components/ref-portal";
import { useProvide } from "@/library/provide";

export const makeNodeItem = <C extends object = {}>(
  Component: FC<NodeItemProps & C>
): FC<NodeItemProps & C> => {
  return function MakedNodeItem(props: NodeItemProps & C) {
    const { x, y } = props;
    const ref = useProvide(NodeList).useItem();

    return (
      <RefPortal target={ref}>
        <NodeItem {...{ x, y }}>
          <Component {...props} />
        </NodeItem>
      </RefPortal>
    );
  };
};