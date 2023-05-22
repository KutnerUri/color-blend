import cn from "classnames";
import type { RGB } from "color-convert/conversions";
import React from "react";

import { toRGB } from "../utils";
import styles from "./color-card.module.scss";
import { ColorSample } from "./color-sample";

export function ColorCard({
  value,
  title,
  children,
  className,
  previewSize = 5,
  ...props
}: {
  value: RGB;
  previewSize?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn(className, styles.card, styles.colorCard)}>
      <div>
        {title && <HCard>{title}</HCard>}
        {children}
      </div>
      <ColorSample value={toRGB(value)} size={previewSize} />
    </div>
  );
}
function HCard(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={styles.cardHeader} />;
}
