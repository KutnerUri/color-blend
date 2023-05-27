import cn from "classnames";
import convert from "color-convert";
import type { HSL, RGB } from "color-convert/conversions";
import React from "react";

import styles from "./color-input.module.scss";
// import { ColorSample } from "./color-sample";
import { toHSL, toHex, toRGB } from "../utils";
import { CopyButton } from "./copy-button";

export const ColorInput: React.FC<{
  value: RGB;
  onChange: (color: RGB) => void;
}> = ({ value, onChange }) => {
  const hex = "#" + convert.rgb.hex(value);
  const hsl = convert.rgb.hsl(value);

  const handleRGBChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: 0 | 1 | 2
  ) => {
    const next: RGB = [...value];
    next[idx] = +event.target.value;
    onChange(next);
  };

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(convert.hex.rgb(event.target.value));
  };

  const handleHSLChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const nextHsl: HSL = [...hsl];
    nextHsl[idx] = Number(event.target.value);
    onChange(convert.hsl.rgb(nextHsl));
  };

  return (
    <div className={styles.colorInput}>
      <div>
        <CopyButton value={hex} /> HEX{" "}
        <input
          type="text"
          className={styles.hex}
          value={hex}
          onChange={handleHexChange}
        />{" "}
      </div>
      <br />
      <div>
        <CopyButton value={`rgb(${value.join(", ")})`} /> RGB{" "}
        <div className={cn(styles.tripleInput, styles.hex)}>
          <input
            type="number"
            value={value[0]}
            className={styles.hex}
            onChange={(e) => handleRGBChange(e, 0)}
          />{" "}
          <input
            type="number"
            value={value[1]}
            className={styles.hex}
            onChange={(e) => handleRGBChange(e, 1)}
          />{" "}
          <input
            type="number"
            value={value[2]}
            className={styles.hex}
            onChange={(e) => handleRGBChange(e, 2)}
          />
        </div>
      </div>
      <br />
      <div>
        <CopyButton value={`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`} /> HSL{" "}
        <div className={cn(styles.tripleInput)}>
          <input
            type="number"
            value={hsl[0]}
            onChange={(e) => handleHSLChange(e, 0)}
          />{" "}
          <input
            type="number"
            value={hsl[1]}
            onChange={(e) => handleHSLChange(e, 1)}
          />{" "}
          <input
            type="number"
            value={hsl[2]}
            onChange={(e) => handleHSLChange(e, 2)}
          />
        </div>
      </div>
    </div>
  );
};

export function ColorDisplay({ value }: { value: RGB }) {
  return (
    <div className={styles.colorDisplay}>
      <div>
        <CopyButton value={toHex(value)} /> {toHex(value)}
      </div>
      <div>
        <CopyButton value={toRGB(value)} /> {toRGB(value)}
      </div>
      <div>
        <CopyButton value={toHSL(value)} /> {toHSL(value)}
      </div>
    </div>
  );
}
