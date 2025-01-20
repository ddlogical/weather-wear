import { defineStore } from "pinia";

interface OptionsStore {
unit: "celsius" | "fahrenheit"
}

const initialState: OptionsStore = {
  unit: "celsius",
};

export const useOptionsStore = defineStore("options", {
  state: () => initialState,
  actions: {
    switchUnit(newUnit: "celsius" | "fahrenheit") {
      this.unit = newUnit;
    }
  },
});