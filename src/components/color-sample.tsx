import { HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./color-sample.module.scss";

export function ColorSample({
  value,
  className,
  size,
  style,
}: { value: string; size?: number } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(styles.sample, className)}
      onClick={() => navigator.clipboard.writeText(value)}
      style={{
        fontSize: size ? `${size}em` : undefined,
        ...style,
        background: value,
      }}
    />
  );
}
