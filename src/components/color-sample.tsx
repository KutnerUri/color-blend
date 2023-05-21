import { HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./color-sample.module.scss";

export function ColorSample({
  value,
  className,
  style,
}: { value: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(styles.sample, className)}
      style={{ ...style, background: value }}
    />
  );
}
