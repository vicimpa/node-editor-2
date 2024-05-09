import React, { forwardRef } from "react";

import { clsx } from "@/utils/clsx";
import s from "./Flex.module.sass";

export type FlexProps = {
  column?: boolean;
  reverse?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyCenter?: boolean;
  alignStart?: boolean;
  alignEnd?: boolean;
  alignCenter?: boolean;
  alignStretch?: boolean;
  gap?: number;
} & Omit<React.JSX.IntrinsicElements['div'], 'ref'>;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      column,
      reverse,
      alignStretch,
      alignCenter,
      alignStart,
      alignEnd,
      justifyStart,
      justifyCenter,
      justifyEnd,
      className,
      gap,
      style = {},
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={clsx(
        className,
        s.flex,
        [s['row'], !column && !reverse],
        [s['row-reverse'], !column && reverse],
        [s['column'], column && !reverse],
        [s['column-reverse'], column && reverse],
        [s['justify-start'], justifyStart],
        [s['justify-center'], justifyCenter],
        [s['justify-end'], justifyEnd],
        [s['align-start'], alignStart],
        [s['align-center'], alignCenter],
        [s['align-end'], alignEnd],
        [s['align-stretch'], alignStretch],
      )}
      style={{
        gap: typeof gap === 'number' ? gap + 'px' : gap,
        ...style
      }}
      {...props}
    />
  )
);