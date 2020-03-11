import React from "react";
import Led from "../led/Led";
import { useParams } from "react-router-dom";

export default function Details() {
  const { index } = useParams();
  const led = {
    index: Number(index),
    color: "goldenrod"
  };
  return <Led index={led.index} color={led.color} />;
}
