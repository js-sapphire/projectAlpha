
import { makeStore } from "./makeStore";

const reducer = (state, action) => {
    let tempState;
    switch(action.type) {
      case 'Add':
        tempState = { ...state };
        tempState[action.newHabit] = buildNewHabitTrackingData();
        return tempState;
      case 'Mark':
        tempState = { ...state };
        const value = action.checked;
        tempState[action.habit]["July"] = { ...tempState[action.habit]["July"], [action.date]: value}
        return tempState;
      default:
        return state;
    }
  }
  
  export const monthInfoData = {
    "Jan": 31,
    "Feb": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "Aug": 31,
    "Sept": 30,
    "Oct": 31,
    "Nov": 30,
    "Dec": 31
  }

const buildNewHabitTrackingData = () => {
  const newInfo = {};
  const monthKeys = Object.keys(monthInfoData);
  monthKeys.forEach((monthKey) => {
    newInfo[monthKey] = buildTrackingDataForMonth(monthKey);
  })

  return newInfo;
}

const buildTrackingDataForMonth = (monthKey) => {
  const NUM_DAYS = monthInfoData[monthKey];
  const trackingInfo = {};
  for(let i=1;i<=NUM_DAYS;i++){
    trackingInfo[i] = false;
  }
  return trackingInfo;
}


export const [HabitProvider, useHabit, useHabitDispatch] = makeStore(reducer, {});
