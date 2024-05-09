import { Component, ReactNode } from "react";

export const audio = <T extends Component>() => {
  return (target: new (...args: any[]) => T): any => {
    return class extends (target as any) {

      render(): ReactNode {
        return null;
      }
    };
  };
};