import * as views from "./views";

import { ReactNode, createElement } from "react";

import { NodePattern } from "./NodePattern";
import { useId } from "react";

type views = typeof views;

export type NodeBackProps<T extends keyof views> = (
  {
    type: T;
  } & Parameters<views[T]>[0]
) | {
  children?: ReactNode;
};

export const NodeBack = <T extends keyof views>(
  props: NodeBackProps<T>
) => {
  const id = useId();
  return (
    <g>
      <NodePattern id={id}>
        {'type' in props ? (
          createElement(views[props.type] as any, props)
        ) : props.children}
      </NodePattern>

      <rect
        x={-50000}
        y={-50000}
        width={100000}
        height={100000}
        fill={`url(#${id})`}
      />
    </g>
  );
};