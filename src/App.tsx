import type { RGB } from "color-convert/conversions";
import React, { useMemo, useState } from "react";

import { ColorDisplay, ColorInput } from "./components/color-input";
import { ColorSample } from "./components/color-sample";

import styles from "./app.module.scss";
import { ColorCard } from "./components/color-card";
import { VisualOverlay } from "./components/visual-overlay";
import { overlay, toHex, toRGB, toRGBA } from "./utils";

const App: React.FC = () => {
  const [baseColor, setBaseColor] = useState<RGB>([18, 18, 18]);
  const [overlayColor, setOverlayColor] = useState<RGB>([255, 255, 255]);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.23);

  const combinedColor = overlay(baseColor, overlayColor, overlayOpacity);

  return (
    <div className={styles.colorBlender}>
      <h1 style={{ textAlign: "center" }}>Color blender</h1>

      <div className={styles.dual}>
        <div className={styles.input}>
          <ColorCard value={baseColor} title="Base color">
            <ColorInput value={baseColor} onChange={setBaseColor} />
          </ColorCard>

          <ColorCard value={overlayColor} title="Overlay color">
            <ColorInput value={overlayColor} onChange={setOverlayColor} />

            <br />
            <div>
              <input
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(+e.target.value)}
                className={styles.slider}
                type="range"
                min={0}
                max={1}
                step={0.01}
              />{" "}
              <input
                type="number"
                value={overlayOpacity}
                step={0.05}
                className={styles.opacityInput}
                onChange={(e) => setOverlayOpacity(+e.target.value)}
              />
            </div>
          </ColorCard>
        </div>

        <div>
          <VisualOverlay
            colorA={toRGB(baseColor)}
            colorB={toRGBA(overlayColor, overlayOpacity)}
          />

          <ColorCard title="Result" value={combinedColor}>
            <ColorDisplay value={combinedColor} />
          </ColorCard>
        </div>
      </div>

      <br />
      <br />
      <br />

      <Gradient baseColor={combinedColor} />
    </div>
  );
};

function Gradient({ baseColor }: { baseColor: RGB }) {
  const [gradientColor, setGradientColor] = useState<RGB>([255, 255, 255]);
  const [gradientPoints, setGradientPoints] = useState(
    "0, 0.05, 0.07, 0.08, 0.09, 0.11, 0.12, 0.14, 0.15, 0.16"
  );

  const opacityPoints = useMemo(
    () => gradientPoints.split(",").map((x) => +x.trim()),
    [gradientPoints]
  );

  const gradientColors = useMemo(
    () =>
      opacityPoints.map((opacity) =>
        toHex(overlay(baseColor, gradientColor, opacity))
      ),
    [opacityPoints]
  );

  return (
    <>
      <h2>Gradient</h2>
      <p>
        Extend the range of colors based on the following overlay. Click on the
        sample to copy the value
      </p>

      <ColorCard title="Overlay" value={gradientColor}>
        <ColorInput value={gradientColor} onChange={setGradientColor} />
      </ColorCard>

      <div className={styles.gradientPoints}>
        <p>Use these blend points:</p>
        <input
          value={gradientPoints}
          onChange={(e) => setGradientPoints(e.target.value)}
        />
      </div>

      <div className={styles.gradient} style={{ background: toRGB(baseColor) }}>
        {gradientColors.map((color, idx) => {
          return (
            <ColorSample key={idx} value={color} style={{ fontSize: "50px" }} />
          );
        })}
      </div>

      <h3>Values:</h3>
      {gradientColors.map((x, idx) => (
        <div key={idx}>
          <span className={styles.opacityPoint}>{opacityPoints[idx]}</span> -{" "}
          {x}
        </div>
      ))}
    </>
  );
}

export default App;
