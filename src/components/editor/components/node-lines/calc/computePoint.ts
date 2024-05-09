import { Signal, computed } from "@preact/signals-react";

import { NodeLine } from "../NodeLine";
import { NodePort } from "../../node-port";

export default (ctx: NodeLine, port: Signal<NodePort | undefined>) => (
  computed(() => (
    port.value?.pos.value ?? ctx.connects.mouse.value
  ))
);