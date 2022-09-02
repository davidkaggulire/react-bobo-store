export const timeConverter = (time) => {
  // converting firestore timestamp to normal date
  const date = new Date(time._seconds * 1000 + time._nanoseconds / 1000000);

  // const [month, day, year] = [
  //   date.getMonth()+1,
  //   date.getDate(),
  //   date.getFullYear(),
  // ];
  let [hour, minutes] = [date.getHours(), date.getMinutes()];
  if (hour === 0) {
    hour = hour + "0";
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  const output = date.toDateString() + " | " + hour + ":" + minutes;
  return output;
};

export const dateformatter = (time) => {
  // converting firestore timestamp to normal date
  const date = new Date(time._seconds * 1000 + time._nanoseconds / 1000000);

  let [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  if (month < 10) {
    month = month + 1;
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  const finalDate = day + "/" + month + "/" + year;

  let [hour, minutes] = [date.getHours(), date.getMinutes()];
  if (hour === 0) {
    hour = hour + "0";
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const output = finalDate + " | " + hour + ":" + minutes;
  return output;
};
