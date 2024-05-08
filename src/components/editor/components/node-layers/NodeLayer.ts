import { computed } from "@preact/signals-react";
import { createSvgElement } from "@/utils/createSvgElement";
import { elements } from "@/library/elements";
import { signalRef } from "@/library/signals";

export class NodeLayer {
  ref = signalRef<SVGGElement>();
  store = elements(() => createSvgElement('g'));
  count = computed(() => this.store.list.value.length);
}