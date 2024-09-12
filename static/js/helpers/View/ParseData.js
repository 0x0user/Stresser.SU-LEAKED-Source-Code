import React from "react";

let bool = (data) => {
  return data ? (
    <span style={{ color: "#28a745" }}>True</span>
  ) : (
    <span style={{ color: "red" }}>False</span>
  );
};

let isIncluded = (data) =>
  data ? (
    <i className="fa fa-check-circle included"></i>
  ) : (
    <i className="fa fa-times-circle no-included"></i>
  );

let dateformat = (datetime) => {
  return new Date(datetime).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

let formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

let resolve = (path, obj) => {
  return !obj
    ? "n/a"
    : path.split(".").reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
      }, obj || self);
};

let truncate = (string, size) => {
  return string.length > size ? string.slice(0, size - 1) + "…" : string;
};

let flatten = arr => arr.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

let countdown = (created_at, time) => {
  let date = new Date(created_at);
  return date.setSeconds(date.getSeconds() + time);
};

export const data = {
  bool,
  isIncluded,
  resolve,
  dateformat,
  truncate,
  formatTime,
  flatten,
  countdown
};
