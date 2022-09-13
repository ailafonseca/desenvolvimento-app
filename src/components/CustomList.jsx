import React from "react";

const formateDateAndTime = (oldDate) => {
  const date = oldDate.split("-").toString().split("T").toString().split(":").toString().split(",");
  const formatedDate = `${date[2]}/${date[1]}/${date[0]} ${date[3]}h${date[4]}`;
  return formatedDate;
};

export const List = (props) => (
  <div className="table-responsive">
    <table className="table table-striped table-sm">{props.children}</table>
  </div>
);

export const ListHeader = (props) => (
  <thead>
    <tr>{props.children}</tr>
  </thead>
);

export const ListHeaderCol = (props) => <td className={`${props.display ? "d-none d-lg-table-cell" : ""}`}>{props.children}</td>;
export const ListBody = (props) => <tbody>{props.children}</tbody>;
export const ListBodyRow = (props) => <tr>{props.children}</tr>;
export const ListBodyColFirst = (props) => <td>{props.children}</td>;
export const ListBodyColText = (props) => <td className="d-none d-lg-table-cell">{props.children}</td>;
export const ListBodyColDate = (props) => <td className="d-none d-lg-table-cell">{formateDateAndTime(props.children)}</td>;
export const ListBodyColAction = (props) => <td className="text-right">{props.children}</td>;
