import React from 'react';
import {
  DisplayString,
  DisplayData,
  displayHorario
} from "../util/display";


export const renderLine = (props, line, index) => {
  let nome = "";

  if (line.contrato !== undefined && line.contrato !== null) {
    nome = DisplayString(line.contrato.nome);
  }

  return (
    <tr key={index}>
      <td>{nome}</td>
      <td>{DisplayData(line.data)}</td>
      <td className="d-none d-lg-table-cell">
        {displayHorario(line.inicioReserva, line.fimReserva)}
      </td>
      <td className="d-none d-lg-table-cell">
        {displayHorario(line.inicioColeta, line.fimColeta)}
      </td>
      <td className="text-right">
        {props.renderEditar(line)}
      </td>
    </tr>
  );
}

const Lists = props => (
  <>
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {props.columns.map((column, index) => <th className={`${column.display ? 'd-none d-lg-table-cell' : ''}`} key={index}>{column.column}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.lines.map((line, index) => (
            renderLine(props, line, index)
          ))}
        </tbody>
      </table>
    </div>
  </>
)

export default Lists;
