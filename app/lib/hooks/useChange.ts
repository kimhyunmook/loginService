import { useState } from "react";
import { InputChange } from "../types/types";

export default function useChange() {
  const [value, setValue] = useState("");
  function handle(event: InputChange) {
    event.preventDefault();
    const { value } = event.target;
    setValue(value);
  }
  return {
    value,
    setValue: (v: string) => setValue(v),
    change: handle,
  };
}
