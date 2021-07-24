import React from "react";
import { useHabit, useHabitDispatch } from "./HabitStore";

export const Habits = () => {
  const habitStore = useHabit();
  const dispatch = useHabitDispatch();
  const [inputVal, setInputVal] = React.useState("");

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const addHabit = () => {
    if (!inputVal || inputVal.length === 0) {
      return;
    }
    dispatch({ type: "Add", newHabit: inputVal });
    setInputVal("");
  };

  const handleClick = () => {
    addHabit();
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      addHabit();
    }
  };

  console.log({ habitStore });

  return (
    <div>
      <input
        value={inputVal}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      ></input>
      <button onClick={handleClick}>Add Habit</button>
    </div>
  );
};
