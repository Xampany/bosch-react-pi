import React, { useState, useReducer } from "react";
import tinycolor from "tinycolor2";

const FormatList: string[] = `rgb | prgb | hex | hex6 | hex3 | hex4 | hex8 | name | hsl | hsv`.split(
  " | "
);

type LedColorProps = {
  /**
   * Die Farbe als valider CSS String
   */
  color: string;
};

type State = {
  currentFormat: string;
  currentColor: string;
};

type Action = {
  type: string;
  payload?: any;
};

export default function LedColor({ color }: LedColorProps) {
  const initial: Readonly<State> = {
    currentFormat: FormatList[5],
    currentColor: color
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "format":
        return {
          currentFormat: action.payload,
          currentColor: tinycolor(state.currentColor).toString(action.payload)
        };
      case "reset":
        return {
          ...initial
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <>
      <p>{state.currentColor}</p>
      <div>{state.currentFormat}</div>
      <form onSubmit={ev => ev.preventDefault()}>
        <select
          value={state.currentFormat}
          onChange={ev =>
            dispatch({ type: "format", payload: ev.target.value })
          }
        >
          {FormatList.map(format => {
            return (
              <option key={format} value={format}>
                {format}
              </option>
            );
          })}
        </select>
      </form>
      <button onClick={ev => dispatch({
          type: "reset"
      })}>Reset</button>
    </>
  );
}
