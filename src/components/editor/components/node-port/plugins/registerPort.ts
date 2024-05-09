import { NodePort } from "../NodePort";

export default (ctx: NodePort) => {
  const { ports } = ctx.connects;

  ports.add(ctx);

  return () => {
    ports.delete(ctx);
  };
};