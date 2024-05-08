import { NodePort } from "../NodePort";

export default (ctx: NodePort) => {
  const { ports } = ctx.lines;

  ports.add(ctx);

  return () => {
    ports.delete(ctx);
  };
};