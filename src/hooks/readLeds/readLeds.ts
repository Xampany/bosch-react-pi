import axios from "axios";
import { useEffect, useState } from "react";
import { ILed } from "../../common/model/ILed";

/**
 * Die möglichen Ladezustände
 */
export type LoadingStatus = "pending" | "complete" | "error";

/**
 * Hook zum Laden der Liste der Leds über die REST API
 */
export default function useReadLeds(url: string) {
  /**
   * Die Liste der Leds
   */
  const [leds, setLeds] = useState<ILed[]>([]);
  /**
   * Der Ladezustand
   */
  const [status, setStatus] = useState<LoadingStatus>("pending");

  /**
   * Liste über REST API laden
   */
  useEffect(() => {
    setStatus("pending");

    readLeds(url)
      .then(leds => setLeds(leds))
      .then(() => setStatus("complete"))
      .catch(() => setStatus("error"));
  }, []);

  return { leds, status };
}

// HINT: an useEffect darf keine async function übergeben werden
async function readLeds(url: string): Promise<ILed[]> {
  const URL = `${url}/colors`;

  const response = await axios.get<string[]>(URL);

  const payload = response.data;

  return payload.map((color, index) => ({ index, color }));
}
