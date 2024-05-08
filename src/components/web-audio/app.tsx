import { Node } from "./components";
import { NodePort } from "../editor";

export const App = () => {

  return (
    <>
      <Node title="Hi">
        <p>
          asdasdasdds
          <NodePort />
        </p>
      </Node>
      <Node title="Hi">
        <p>
          <NodePort />
        </p>
      </Node>
      <Node title="Hi">
        <p>
          <NodePort />
          asdadasdds
        </p>
      </Node>
    </>
  );
};