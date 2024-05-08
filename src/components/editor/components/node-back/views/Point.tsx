import { NodePattern } from "../NodePattern";
import { useProvide } from "@/library/provide";

export default ({
  radius: r = 4,
  size: s = 30,
  color: c = '#555',
  background: b = '#333'
}) => {
  useProvide(NodePattern)
    .useAnchor(.5)
    .useSize(s * 2);

  return (
    <>
      <rect x={-s} y={-s} width={s * 2} height={s * 2} fill={b} />
      <circle r={r} fill={c} />
    </>
  );
};