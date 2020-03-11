import React, { Fragment } from "react";
import styles from "./Led.module.css";
import { ILed } from "../model/ILed";
import LedColor from "../ledcolor/LedColor";

type LedProps = ILed & {
  onSelect?: (index: number) => void;
};

export default function Led({
  index,
  color,
  onSelect = () => void 0
}: LedProps) {
  const style: React.CSSProperties = { backgroundColor: color };

  function handleClick(ev: React.MouseEvent, stuff: any) {
    console.log(`I was clicked ${index}`, ev.shiftKey);
    onSelect(index);
  }

  return (
    <Fragment>
      <h1>Index: {index + 1}</h1>
      <div
        className={styles.box}
        style={style}
        onClick={e => handleClick(e, 42)}
      ></div>
      <LedColor color={color} />
    </Fragment>
  );
}
