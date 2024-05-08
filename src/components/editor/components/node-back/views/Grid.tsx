import { NodePattern } from "../NodePattern";
import { useProvide } from "@/library/provide";

export default ({
  size: s = 100,
  strokeWidth = 1,
  color: c = '#999',
  circleColor: cc = c,
  circleRadius: r = 5,
  background: b = 'transparent',
}) => {
  useProvide(NodePattern)
    .useAnchor(0)
    .useSize(s);

  return (
    <g stroke-width={strokeWidth} stroke={c} fill={b} width={s} height={s}>
      <rect width={s} height={s} />
      <circle r={r} fill={cc} />
      <circle cx={s} r={r} fill={cc} />
      <circle cy={s} r={r} fill={cc} />
      <circle cx={s} cy={s} r={r} fill={cc} />
    </g>
  );
};