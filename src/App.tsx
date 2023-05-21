import type { RGB } from "color-convert/conversions";
import React, { useMemo, useState } from "react";

import { ColorDisplay, ColorInput } from "./components/color-input";
import { ColorSample } from "./components/color-sample";

import styles from "./app.module.scss";
import { overlay, toRGB } from "./utils";

const App: React.FC = () => {
  const [baseColor, setBaseColor] = useState<RGB>([18, 18, 18]);
  const [overlayColor, setOverlayColor] = useState<RGB>([255, 255, 255]);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0);

  const [gradientColor, setGradientColor] = useState<RGB>([255, 255, 255]);
  const [gradientPoints, setGradientPoints] = useState(
    "0, 0.05, 0.07, 0.08, 0.09, 0.11, 0.12, 0.14, 0.15, 0.16"
  );

  const combinedColor = overlay(baseColor, overlayColor, overlayOpacity);

  const opacityPoints = useMemo(
    () => gradientPoints.split(",").map((x) => +x.trim()),
    [gradientPoints]
  );

  return (
    <div className={styles.colorBlender}>
      <div className={styles.dual}>
        <div className={styles.framed}>
          <h3>Base Color</h3>
          <ColorInput value={baseColor} onChange={setBaseColor} />
        </div>

        <br />

        <div className={styles.framed}>
          <h3>Overlay Color</h3>
          <ColorInput value={overlayColor} onChange={setOverlayColor} />
          <br />
          <div>Opacity</div>
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
        </div>
      </div>
      <h3>Resulting Color</h3>
      <div className={styles.result}>
        <ColorSample style={{ fontSize: "5em" }} value={toRGB(combinedColor)} />
        <ColorDisplay value={combinedColor} />
      </div>

      <h3>Gradient</h3>
      <p>Create a range of colors based on this overlay</p>

      <ColorInput value={gradientColor} onChange={setGradientColor} />

      <div className={styles.gradientPoints}>
        <input
          value={gradientPoints}
          onChange={(e) => setGradientPoints(e.target.value)}
        />
      </div>

      <div
        className={styles.gradient}
        style={{ background: toRGB(combinedColor), color: "#ffffffcf" }}
      >
        {opacityPoints.map((opacity) => {
          const color = overlay(combinedColor, gradientColor, opacity);
          return (
            <ColorSample
              key={opacity}
              value={toRGB(color)}
              style={{ fontSize: "50px" }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
