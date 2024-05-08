import { NodeBack } from "./components/node-back";
import { NodeLayers } from "./components/node-layers";
import { NodeLines } from "./components/node-lines";
import { NodeList } from "./components/node-list";
import { NodeMap } from "./components/node-map";
import { ReactNode } from "react";

export const Editor = (props: { children?: ReactNode; }) => {
  return (
    <NodeMap>
      <NodeBack type="point" size={30} color="#666" />

      <NodeLayers>
        <NodeLines>
          <NodeList>
            {props.children}
          </NodeList>
        </NodeLines>
      </NodeLayers>
    </NodeMap>
  );
};