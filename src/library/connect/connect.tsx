import { Component, FC, ReactNode } from "react";

import { Connect } from ".";
import { Dispose } from "@/utils/dispose";
import { isExtends } from "@/utils/isExtends";
import { protostore } from "../protostore";

export type ConnectPlugin<T> = (instance: T) => Dispose;

export const connectStore = protostore<ConnectPlugin<any>[]>(() => []);

const Render: FC<{ method: () => ReactNode, target: any; }> = (props) => {
  return (
    props.method.call(props.target)
  );
};

export const connect = <T extends object>(
  ...plugins: ConnectPlugin<T>[]
) => {
  return (target: new (...args: any[]) => T) => {
    connectStore(target.prototype).push(...plugins);

    if (isExtends(target, Component)) {
      return class extends (target as any) {
        render() {
          return (
            <Connect target={this}>
              <Render method={super.render} target={this} />
            </Connect>
          );
        }
      } as any;
    }
  };
};