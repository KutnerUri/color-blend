import { Button, ButtonProps, CSS } from "@nextui-org/react";

const IconButtonCss: CSS = {
  padding: "0",
  display: "inline-block",
  height: "2em",
  width: "2em",
  lineHeight: 0,
  "&:hover": {
    background: "rgba(0,0,0,0.05)",
  },
};

export function CopyButton({
  value,
  children = "✂️",
  ...props
}: { value: string } & ButtonProps) {
  return (
    <Button
      {...props}
      auto
      light
      css={IconButtonCss}
      onClick={() => navigator.clipboard.writeText(value)}
    >
      {children}
    </Button>
  );
}
