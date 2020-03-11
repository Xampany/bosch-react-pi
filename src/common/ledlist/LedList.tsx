import React, { useState } from "react";
import useReadLeds from "../../hooks/readLeds/readLeds";
import Led from "../led/Led";
import { API_URL_01 } from "../../environment";

export default function LedList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [url, setUrl] = useState(API_URL_01);
  const { leds, status } = useReadLeds(url);

  function onSelectLed(index: number) {
    console.log(`onSelectLed ${index}`);
    // setLeds([]);
  }
  return (
    <>
      <h1>Led Liste</h1>
      <p>{status}</p>
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
