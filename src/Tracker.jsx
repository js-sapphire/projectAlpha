import React from "react";
import { useHabit, useHabitDispatch, monthInfoData } from "./HabitStore";
import "./tracking.css";

const useNextAndBackButtons = (initialMonth) => {
  const [monthInView, setMonthInView] = React.useState(() => {
    if (!initialMonth) {
      return new Date(Date.now()).getMonth() + 1;
    }
  });

  const handleNext = () => {
    setMonthInView(monthInView + 1);
  };

  const handleBack = () => {
    setMonthInView(monthInView - 1);
  };

  const prevButton = (
    <div className="prevButton">
      <button onClick={handleBack}>Prev Month</button>
    </div>
  );

  const nextButton = (
    <div className="nextButton">
      <button onClick={handleNext}>Next Month</button>
    </div>
  );

  return [monthInView, prevButton, nextButton];
};

export const Tracker = () => {
  const habitStore = useHabit();
  const habits = Object.keys(habitStore);
  const [monthInView, prevButton, nextButton] = useNextAndBackButtons();

  return (
    <div className="trackerView">
      {prevButton}
      <div className="container">
        {habits.map((habit) => {
          return (
            <div className="activity">
              <div className="activityName">{habit}</div>
              <TrackingData monthIndex={monthInView} habit={habit} />
            </div>
          );
        })}
      </div>
      {nextButton}
    </div>
  );
};

const TrackingData = (props) => {
  const habitStore = useHabit();
  const { habit, monthIndex } = props;
  const monthKey = Object.keys(monthInfoData)[monthIndex - 1];
  const data = habitStore[habit][monthKey];

  const daysData = Object.keys(data);
  const elems = daysData.map((dayData) => {
    const dayInfo = getDayAndMonthFromStoreKey(dayData, monthIndex);
    if (notToday(dayInfo)) {
      return <ViewableCell date={dayInfo} value={data[dayData]} />;
    }

    return <EditableCell date={dayInfo} habit={habit} />;
  });

  return <div className="trackingChart">{elems.map((elem) => elem)}</div>;
};

const EditableCell = ({ habit, disabled }) => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useHabitDispatch();

  const handleChange = () => {
    const today = todayInfo();
    dispatch({ type: "Mark", habit, date: today.day, checked: !checked });
    setChecked(!checked);
  };

  let cellClass = "unmarked";
  if (checked) {
    cellClass += " marked";
  }

  return disabled ? (
    <span className="unmarkable"></span>
  ) : (
    <span className={cellClass} onClick={handleChange} value={checked}></span>
  );
};

const ViewableCell = ({ date, value }) => {
  if (isInFuture(date)) {
    return <EditableCell disabled={true} />;
  }
  return value ? (
    <span className="done"></span>
  ) : (
    <span className="notDone"></span>
  );
};

const getDayAndMonthFromStoreKey = (key, monthIndex) => {
  return {
    day: parseInt(key),
    month: monthIndex,
  };
};

const isInPast = (storeDayInfo) => {
  const today = todayInfo();
  if (storeDayInfo.month < today.month) {
    return true;
  }
  if (storeDayInfo.month === today.month) {
    return storeDayInfo.day < today.day;
  }
  return false;
};

const isInFuture = (storeDayInfo) => {
  const today = todayInfo();
  if (storeDayInfo.month > today.month) {
    return true;
  }
  if (storeDayInfo.month === today.month) {
    return storeDayInfo.day > today.day;
  }
  return false;
};

const notToday = (storeDayInfo) =>
  isInPast(storeDayInfo) || isInFuture(storeDayInfo);

const todayInfo = () => ({
  day: new Date(Date.now()).getDate(),
  month: new Date(Date.now()).getMonth() + 1,
});
