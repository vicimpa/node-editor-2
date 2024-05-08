import { NodeList } from "../NodeList";
import { computed } from "@preact/signals-react";

export default (ctx: NodeList) => (
  computed(() => (
    ctx.store.list.value.length
  ))
);