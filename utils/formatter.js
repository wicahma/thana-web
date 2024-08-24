const dateTimeFormatter = (date) => {
  return new Intl.DateTimeFormat("id", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export { dateTimeFormatter };
