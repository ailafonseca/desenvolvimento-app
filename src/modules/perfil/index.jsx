import React, { Component } from 'react'
import { connect } from 'react-redux'

import Trilha from 'components/profile/trail'
import Attachments from 'components/profile/attachments'
import Progress from 'components/profile/progress'

import { Container } from 'react-bootstrap'

import { trails } from './trails'
import { screenSize } from 'util/utils'

import { Screen } from 'components/style'

const attachments = [
  { status: 'success', name: 'Anexo 1' },
  { status: 'warning', name: 'Anexo 2' },
  { status: 'error', name: 'Anexo 3' },
]

class Perfil extends Component {
  constructor(props) {
    super(props)

    let currentTrails = trails.doacao
    if (Object.keys(this.props.perfil.venda).filter((el) => this.props.perfil.venda[el]).length) currentTrails = trails.vendas

    this.state = {
      attachments,
      trails: currentTrails,
      screenSize: 'md',
    }
  }

  componentDidMount() {
    this.setState({ screenSize: screenSize() })

    window.addEventListener('resize', () => {
      this.setState({ screenSize: screenSize() })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {})
  }

  get trails() {
    const trailsLength = Object.keys(this.state.trails).length
    const defaultClass = 'col-6 col-lg-3 col-xl-2'
    const breakerClass = 'col-12 col-lg-3 col-xl-2'

    const findBreakers = (value, result = []) => {
      if (!Number(value) || (Number(value) && value < 5)) return result

      if (result.length) result.push(result[result.length - 1] + 3)
      else result.push(2)

      return findBreakers(value - 3, result)
    }
    const breakers = findBreakers(trailsLength)

    return this.state.trails.map((el, index) => {
      let trailClass = defaultClass
      if (breakers.includes(index)) trailClass = breakerClass
      return <Trilha key={index} icon={el.icon} idform={el.idform} name={el.name} status={el.status} url={this.trailUrl(el)} className={trailClass} />
    })
  }

  get attachments() {
    return this.state.attachments.map((el, index) => (
      <Attachments key={index} status={el.status}>
        {el.name}
      </Attachments>
    ))
  }

  get trailsComplete() {
    return this.state.trails.filter((el) => el.status === 'complete')
  }

  trailUrl(trail) {
    return `/perfil/trilhas/formulario/${trail.idform}`
  }

  render() {
    return (
      <Screen back={{ to: '/', title: 'Menu' }}>
        <Container>
          <div className="card-body py-2">
            <h5 className="card-title">Progresso geral</h5>
            <div className="mb-2 mt-4">
              <Progress now={this.trailsComplete.length} total={this.state.trails.length} />
            </div>
            {/* <div className="card-caption">
              <small>Conquista 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
            </div> */}
          </div>

          <div className="card-body py-2 trail-container">
            <h5 className="card-title">Trilhas</h5>
            {this.trails}
          </div>

          {/* <div className="card-body py-2">
            <h5 className="card-title">Anexos</h5>
            <div className="attach-container">{this.attachments}</div>
            <div>
              <Button block={this.state.screenSize !== 'lg'} className="mt-4">
                ADICIONAR NOVO
              </Button>
            </div>
          </div> */}
        </Container>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  perfil: state.perfil,
})
const mapDispatchToProps = (dispatch) => ({
  dispatch,
})
export default connect(mapStateToProps, mapDispatchToProps)(Perfil)
