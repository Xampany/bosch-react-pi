import React, { useState, useEffect } from "react";
import { ILed } from "../model/ILed";
import Led from "../led/Led";

export default function LedList() {
  const [leds, setLeds] = useState<ILed[]>([]);

  useEffect(() => {
    fetch(
      "https://ae680a0551cf8bd14b83c131e0796b82.balena-devices.com/api/colors"
    )
      .then(res => res.json())
      .then((payload: string[]) => {
        const state: ILed[] = payload.map((color, index) => {
          return {
            color,
            index
          };
        });

        setLeds(state);
      });
  }, []);

  function onSelectLed(index: number) {
    console.log(`onSelectLed ${index}`);
    setLeds([]);
  }
  return (
    <>
      <h1>Led Liste</h1>
      <table>
        <tbody>
          <tr>
            {leds.map(led => (
              <td key={led.index}>
                <Led
                  index={led.index}
                  color={led.color}
                  onSelect={onSelectLed}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
