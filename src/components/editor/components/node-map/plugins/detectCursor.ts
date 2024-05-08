import { NodeMap } from "../NodeMap";
import { windowEvent } from "@/library/events";

export default (ctx: NodeMap) => (
  windowEvent('mousemove', (event) => {
    ctx.mouse.value = ctx.offset(event);
  })
);