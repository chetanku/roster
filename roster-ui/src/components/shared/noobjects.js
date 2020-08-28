import React from "react";

export const NoObject = (props) => {
  return props.service === "Cost Summary" ? (
    <blockquote className="blockquote text-center">
      <footer className="blockquote-footer">
        <cite title="Source Title">
          There are no costs populated for this month, check in a few days{" "}
        </cite>{" "}
      </footer>{" "}
    </blockquote>
  ) : (
    <blockquote className="blockquote text-center">
      <footer className="blockquote-footer">
        <cite title="Source Title">
          There are no {props.service + " "} instances here, You can try
          changing the region{" "}
        </cite>{" "}
      </footer>{" "}
    </blockquote>
  );
};
