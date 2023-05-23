import { ColorSample } from "./color-sample";
import styles from "./visual-overlay.module.scss";

export function VisualOverlay({
  colorA,
  colorB,
  idA,
  idB,
  ...props
}: {
  colorA: string;
  colorB: string;
  idA?: string;
  idB?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={styles.visualOverlay}>
      <ColorSample id={idA} value={colorA} />
      <ColorSample id={idB} value={colorB} />
    </div>
  );
}
