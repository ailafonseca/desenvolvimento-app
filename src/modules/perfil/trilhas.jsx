import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Trilha from 'components/trilha'

export default class VendaPerfilTrilhas extends Component {
  render () {
    return (
      <div className='container'>
        <div className='margin'>
          <h3>Trilhas</h3>
          <div className='text-center margin'>
            <Row>
              <Col xs={6}>
                <Trilha
                  classNameBotao='btn saveadd-primary-color btn-circle btn-xl'
                  typeform='https://form.typeform.com/to/GfaiuUPf'
                  trilha='Capacidade de Retirada'
                />
                <h5>Capacidade de Retirada </h5>
              </Col>
              <Col xs={6}>
                <Trilha
                  classNameBotao='btn saveadd-primary-color btn-circle btn-xl'
                  typeform='https://saveaddsolutions.typeform.com/to/gONx6Bcn#nome=xxxxx&interesse=xxxxx'
                  trilha='Portfólio de Compra'
                />
                <h5>Portfólio de Compra</h5>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Trilha
                  classNameBotao='btn saveadd-primary-color btn-circle btn-xl'
                  typeform='https://form.typeform.com/to/mExfrj1o'
                  trilha='Capacidade de Armazenamento l'
                />
                <h5>Capacidade de Armazenamento l</h5>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Trilha
                  classNameBotao='btn saveadd-primary-color btn-circle btn-xl'
                  typeform='https://form.typeform.com/to/LM09Oyp2'
                  trilha='Qualificação Técnica l'
                />
                <h5>Qualificação Técnica l</h5>
              </Col>
              <Col xs={6}>
                <Trilha
                  classNameBotao='btn saveadd-primary-color btn-circle btn-xl'
                  typeform='https://form.typeform.com/to/wSVb6Bko'
                  trilha='Capacidade de Armazenamento ll'
                />
                <h5>Capacidade de Armazenamento ll</h5>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Trilha
                  classNameBotao='btn saveadd-primary-color btn-circle btn-xl'
                  typeform='https://form.typeform.com/to/EYxrtgzb'
                  trilha='Qualificação Técnica ll'
                />
                <h5>Qualificação Técnica ll</h5>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
