import axios from "axios";
import { useEffect, useState } from "react";
import { ILed } from "../../common/model/ILed";
import { API_URL_01 } from "../../environment";

/**
 * Die möglichen Ladezustände
 */
export type LoadingStatus = "pending" | "complete" | "error";

/**
 * Hook zum Laden der Liste der Leds über die REST API
 */
export default function useReadLeds(url = API_URL_01) {
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

    // HINT: an useEffect darf keine async function übergeben werden
    readLeds(url)
      .then(leds => setLeds(leds))
      .then(() => setStatus("complete"))
      .catch(() => setStatus("error"));
  }, [url]);

  return { leds, status };
}

/**
 * 
 * @param url 
 */
async function readLeds(url: string): Promise<ILed[]> {
  const URL = `${url}/colors`;

  const response = await axios.get<string[]>(URL);

  const payload = response.data;

  return payload.map((color, index) => ({ index, color }));
}
