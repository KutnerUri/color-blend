import cn from "classnames";
import type { RGB } from "color-convert/conversions";
import React, { forwardRef } from "react";

import { toRGB } from "../utils";
import styles from "./color-card.module.scss";
import { ColorSample } from "./color-sample";

export type ColorCardProps = {
  value: RGB;
  previewSize?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const ColorCard = forwardRef<HTMLDivElement, ColorCardProps>(
  function ColorCard(
    {
      value,
      title,
      children,
      className,
      previewSize = 5,
      ...props
    }: ColorCardProps,
    ref
  ) {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(className, styles.card, styles.colorCard)}
      >
        <div>
          {title && <HCard>{title}</HCard>}
          {children}
        </div>
        <ColorSample value={toRGB(value)} size={previewSize} />
      </div>
    );
  }
);

function HCard(props: React.HTMLAttributes<HTMLHeadingElement>) {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h3 {...props} className={styles.cardHeader} />;
}
