import React from "react";
import { DisplayString } from "../util/display";

export const renderLine = (props, line, index) => {
  let nome = "";

  if (line.contrato !== undefined && line.contrato !== null) {
    nome = DisplayString(line.contrato.nome);
  } else if (line.anuncio.contrato !== undefined && line.anuncio.contrato !== null) {
    nome = DisplayString(line.anuncio.contrato.nome);
  }

  const formateDateAndTime = (oldDate) => {
    if (oldDate === null || oldDate === undefined) return "-";

    if (oldDate === "0001-01-01T00:00:00") return "-";

    if (oldDate.length >= 17) {
      const date = oldDate.split("-").toString().split("T").toString().split(":").toString().split(",");
      const formatedDate = `${date[2]}/${date[1]}/${date[0]} ${date[3]}h${date[4]}`;
      return formatedDate;
    }

    console.log("erro na conversão de ", oldDate);
    return "erro na conversão";
  };

  return (
    <tr key={index}>
      <td>{nome}</td>
      <td>{formateDateAndTime(line.dataInicioReserva || line.anuncio.dataInicioReserva)}</td>
      <td className="d-none d-lg-table-cell">{formateDateAndTime(line.dataFimReserva || line.anuncio.dataFimReserva)}</td>
      <td className="d-none d-lg-table-cell">{formateDateAndTime(line.dataInicioEntrega || line.anuncio.dataInicioEntrega)}</td>
      <td className="d-none d-lg-table-cell">{formateDateAndTime(line.dataFimEntrega || line.anuncio.dataFimEntrega)}</td>
      <td className="text-right">{props.renderEditar(line)}</td>
    </tr>
  );
};

const Lists = (props) => (
  <>
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {props.columns.map((column, index) => (
              <th className={`${column.display ? "d-none d-lg-table-cell" : ""}`} key={index}>
                {column.column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{props.lines.map((line, index) => renderLine(props, line, index))}</tbody>
      </table>
    </div>
  </>
);

export default Lists;
