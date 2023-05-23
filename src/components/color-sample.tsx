import { HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./color-sample.module.scss";

export function ColorSample({
  value,
  size,
  ...props
}: { value: string; size?: number } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(styles.sample, props.className)}
      onClick={() => navigator.clipboard.writeText(value)}
      style={{
        fontSize: size ? `${size}em` : undefined,
        ...props.style,
        background: value,
      }}
    />
  );
}
