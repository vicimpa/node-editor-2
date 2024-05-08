import { NodeItem } from "@/components/editor";
import { ReactNode } from "react";
import { makeNodeItem } from "@/components/editor";
import s from "./Node.module.sass";
import { useProvide } from "@/library/provide";

export type NodeProps = {
  title?: string;
  onClose?: () => void;
  children?: ReactNode;
};

export const Node = makeNodeItem<NodeProps>(({
  title = 'Untitle',
  onClose,
  children,
}) => {
  const moveRef = useProvide(NodeItem).useMover();

  return (
    <div className={s.node}>
      <header ref={moveRef}>
        <p>{title}</p>
        <div data-grow />
        {onClose && (
          <i className={s.btn} onClick={onClose} />
        )}

      </header>
      <main>
        {children}
      </main>
    </div>
  );
});