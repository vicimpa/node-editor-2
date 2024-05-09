import { NodeLine } from "../NodeLine";

export default (ctx: NodeLine) => {
  const { lines } = ctx.connects;

  lines.add(ctx);

  return () => {
    lines.delete(ctx);
  };
};