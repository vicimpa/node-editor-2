import { Node } from "./components";
import { NodePort } from "../editor";

export const App = () => {

  return (
    <>
      <Node title="Hi">
        <p>
          asdasdasdds
          <NodePort dir="right" />
        </p>
      </Node>
      <Node title="Hi">
        <p>
          asdasdasd
          <NodePort dir="right" />
        </p>
      </Node>
      <Node title="Hi">
        <p>
          <NodePort dir="left" />
          asdadasdds
          <NodePort dir="right" />
        </p>
        <p>
          <NodePort dir="left" />
          asdadasdds
          <NodePort dir="right" />
        </p>
      </Node>
      <Node title="Hi">
        <p>
          <NodePort dir="left" />
          asdasdasdds
        </p>
      </Node>
      <Node title="Hi">
        <p>
          <NodePort dir="left" />
          asdasdasd
        </p>
      </Node>
    </>
  );
};