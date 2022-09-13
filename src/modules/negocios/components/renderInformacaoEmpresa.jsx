import React from 'react'
import { Jumbotron, Row, Col } from 'react-bootstrap'

import { DisplayString, DateTimeFormatOrDash } from 'util/display'
import { isNotNullOrEmpty, formatCnpjCpf } from 'util/utils'

const observacoesAnuncio = ({ observacaoAnuncio }) => ((isNotNullOrEmpty(observacaoAnuncio)) ? <p><b>Observações do Anuncio:</b> {observacaoAnuncio}</p> : null)

const observacoesReserva = ({ observacao }) => ((isNotNullOrEmpty(observacao)) ? <p><b>Observações do Anuncio:</b> {observacao}</p> : null)

export default ({ reserva: { empresa, anuncio, anuncio: { contrato }, ultimaInteracao } }) => (
  <Jumbotron>
    <h5><b>Contrato:</b> {contrato.nome}</h5>
    <br />
    <Row>
      <Col xs={12}><h6>Dados do anuncio:</h6></Col>
      <Col xs={12}><b>Inicio Entrega: </b> {DateTimeFormatOrDash(anuncio.dataInicioEntrega)}</Col>
      <Col xs={12}><b>Fim Entrega: </b> {DateTimeFormatOrDash(anuncio.dataFimEntrega)}</Col>
    </Row>
    <br />
    <Row>
      <Col xs={12}><h6>Dados do reservante:</h6></Col>
      <Col xs={12}><b>Empresa: </b> {DisplayString(empresa.nomeEmpresa)}</Col>
      <Col xs={12}><b>CNPJ: </b> {formatCnpjCpf(empresa.cnpj)}</Col>
    </Row>
    {observacoesAnuncio(anuncio)}
    {observacoesReserva(ultimaInteracao)}
  </Jumbotron>
)
