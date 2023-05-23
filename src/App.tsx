import type { RGB } from "color-convert/conversions";
import React, { useMemo, useState } from "react";
import XArrow from "react-xarrows";

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
      <h1>Color blender</h1>

      <div className={styles.dual}>
        <div className={styles.input}>
          <ColorCard value={baseColor} id="card1" title="Base color">
            <ColorInput value={baseColor} onChange={setBaseColor} />
          </ColorCard>

          <ColorCard value={overlayColor} id="card2" title="Overlay color">
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
            idA="color1"
            idB="color2"
            style={{ margin: "1.5em auto" }}
          />

          <Arrows />

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
    [baseColor, gradientColor, opacityPoints]
  );

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Gradient</h2>

      <div className={styles.dual}>
        {/* <div> */}
        <ColorCard title="Overlay" value={gradientColor}>
          <ColorInput value={gradientColor} onChange={setGradientColor} />
        </ColorCard>

        <div>
          <VisualOverlay
            id="overlay"
            colorA={toRGB(baseColor)}
            colorB={toRGBA(gradientColor, 0.61)}
            idA="color1"
            idB="color2"
          />
        </div>
        {/* </div> */}
      </div>

      <div className={styles.gradientPoints}>
        <p>
          Extend the range of your color further, using the following overlay.
          <br />
          Click on a sample to copy its value.
        </p>
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

function Arrows() {
  return (
    <>
      <XArrow
        start="card1"
        end="color1"
        color="var(--text-low)"
        showHead={false}
        showTail={false}
        path="grid"
        endAnchor="top"
        startAnchor={[{ position: "right", offset: { y: -30 } }]}
      />

      <XArrow
        start="card2"
        end="color2"
        color="var(--text-low)"
        showHead={false}
        showTail={false}
        path="grid"
        endAnchor="bottom"
        startAnchor={[{ position: "right", offset: { y: -50 } }]}
      />
    </>
  );
}

export default App;
