import { ColorSample } from "./color-sample";
import styles from "./visual-overlay.module.scss";

export function VisualOverlay({
  colorA,
  colorB,
}: {
  colorA: string;
  colorB: string;
}) {
  return (
    <div className={styles.visualOverlay}>
      <ColorSample value={colorA} />
      <ColorSample value={colorB} />
    </div>
  );
}
