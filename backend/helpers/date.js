exports.daysFromNow = (days) => {
    //add days to current date
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };
  