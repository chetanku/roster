import React, {
  Component
} from "react";
import _ from "lodash";


export const Sorting = (sortcolumn, data, direction) => {
  let sorted;
  if (direction === "desc") {
    sorted = _.orderBy(data, [(x) => x[sortcolumn].toLowerCase()], "asc");

  }
  if (direction === "asc") {
    sorted = _.orderBy(data, [(x) => x[sortcolumn].toLowerCase()], "desc");
  }
  return (sorted);
};