import { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./copy-button.module.scss";

export function CopyButton({
  value,
  children = "✂️",
  ...props
}: { value: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(styles.copyButton, props.className)}
      onClick={() => navigator.clipboard.writeText(value)}
    >
      {children}
    </button>
  );
}
