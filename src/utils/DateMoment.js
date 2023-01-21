import Moment from "react-moment";

import React from "react";

const DateMoment = ({ date }) => {
  return <Moment format="D /MMM /YYYY">{date}</Moment>;
};

export default DateMoment;
