import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Container } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt, faCalendarCheck, faFileSignature, faBullhorn, faBoxOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux'

import MenuItem from 'components/MenuItem'

import { Screen } from 'components/style'

import URL_DOACAO from 'modules/negocios/doacao/urls-browser'
import URL_VENDA from 'modules/negocios/venda/urls-browser'

import { isVendedor, isComprador, isDoador, isDonatario, isVendaEDoacao } from 'modules/perfil/util'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}))

function ExibirMenuVendedor() {
  return (
    <Container>
      <div className="menu-wrapper row justify-content-center">
        <MenuItem to={URL_VENDA.CONTRATO.LISTAR('todos')} menuicon={<FontAwesomeIcon icon={faFileSignature} size="lg" />} label="Contratos" />
        <MenuItem to={URL_VENDA.ANUNCIO.LISTAR()} menuicon={<FontAwesomeIcon icon={faBullhorn} size="lg" />} label="Anúncios" />
        <MenuItem to={URL_VENDA.ENTREGA.ANUNCIANTE.LISTAR()} menuicon={<FontAwesomeIcon icon={faReceipt} size="lg" />} label="Entregas" />
        <MenuItem to="/produtos" menuicon={<FontAwesomeIcon icon={faBoxOpen} size="lg" />} label="Estoque" />
        <MenuItem to="/perfil" menuicon={<FontAwesomeIcon icon={faUser} size="lg" />} label="Perfil" />
      </div>
    </Container>
  )
}

function ExibirMenuComprador() {
  return (
    <Container>
      <div className="menu-wrapper row justify-content-center">
        <MenuItem to={URL_VENDA.RESERVA.LISTAR()} menuicon={<FontAwesomeIcon icon={faCalendarCheck} size="lg" />} label="Anuncios" />
        <MenuItem to={URL_VENDA.ENTREGA.COMPRADOR.LISTAR()} menuicon={<FontAwesomeIcon icon={faReceipt} size="lg" />} label="Entregas" />
        <MenuItem to="/perfil" menuicon={<FontAwesomeIcon icon={faUser} size="lg" />} label="Perfil" />
      </div>
    </Container>
  )
}

function ExibirMenuDoador() {
  return (
    <Container>
      <div className="menu-wrapper row justify-content-center">
        <MenuItem to={URL_DOACAO.CONTRATO.LISTAR('todos')} menuicon={<FontAwesomeIcon icon={faFileSignature} size="lg" />} label="Contratos" className="saveadd-secondary-color" />
        <MenuItem to={URL_DOACAO.ANUNCIO.LISTAR()} menuicon={<FontAwesomeIcon icon={faBullhorn} size="lg" />} label="Anúncios" className="saveadd-secondary-color" />
        <MenuItem to={URL_DOACAO.ENTREGA.DOADOR.LISTAR()} menuicon={<FontAwesomeIcon icon={faReceipt} size="lg" />} label="Entregas" className="saveadd-secondary-color" />
        <MenuItem to="/produtos" menuicon={<FontAwesomeIcon icon={faBoxOpen} size="lg" />} label="Estoque" className="saveadd-secondary-color" />
        <MenuItem to="/perfil" menuicon={<FontAwesomeIcon icon={faUser} size="lg" />} label="Perfil" className="saveadd-secondary-color" />
      </div>
    </Container>
  )
}

function ExibirMenuDonatario() {
  return (
    <Container>
      <div className="menu-wrapper row justify-content-center">
        <MenuItem to={URL_DOACAO.RESERVA.LISTAR()} menuicon={<FontAwesomeIcon icon={faCalendarCheck} size="lg" />} label="Anuncios" className="saveadd-secondary-color" />
        <MenuItem to={URL_DOACAO.ENTREGA.DONATARIO.LISTAR()} menuicon={<FontAwesomeIcon icon={faReceipt} size="lg" />} label="Entregas" className="saveadd-secondary-color" />
        <MenuItem to="/perfil" menuicon={<FontAwesomeIcon icon={faUser} size="lg" />} label="Perfil" className="saveadd-secondary-color" />
      </div>
    </Container>
  )
}

function ExibirFornecedor(theme, tabSelectedMainMenu, handleChangeInRedux) {
  return (
    <>
      <AppBar position="relative" color="default">
        <Tabs
          value={tabSelectedMainMenu}
          onChange={(e) => handleChangeInRedux(e)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Vendas" {...a11yProps(0)} />
          <Tab label="Doações" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={tabSelectedMainMenu} onChangeIndex={handleChangeInRedux}>
        <TabPanel value={tabSelectedMainMenu} index={0} dir={theme.direction}>
          {this.exibirMenuVendedor()}
        </TabPanel>
        <TabPanel value={tabSelectedMainMenu} index={1} dir={theme.direction}>
          {this.exibirMenuDoador()}
        </TabPanel>
      </SwipeableViews>
    </>
  )
}

function ExibirRecebedor(theme, tabSelectedMainMenu, handleChangeInRedux) {
  return (
    <>
      <AppBar position="relative" color="default">
        <Tabs
          value={tabSelectedMainMenu}
          onChange={(e) => handleChangeInRedux(e)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Vendas" {...a11yProps(0)} />
          <Tab label="Doações" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={tabSelectedMainMenu} onChangeIndex={handleChangeInRedux}>
        <TabPanel value={tabSelectedMainMenu} index={0} dir={theme.direction}>
          <ExibirMenuComprador />
        </TabPanel>
        <TabPanel value={tabSelectedMainMenu} index={1} dir={theme.direction}>
          <ExibirMenuDonatario />
        </TabPanel>
      </SwipeableViews>
    </>
  )
}

function ExibirWhatsapp() {
  const phone = '5511955510701'
  let whatsLink = `https://wa.me/phone=${phone}`

  return (
    <div>
      <a className="whatsapp" id="whatsapp" href={whatsLink} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className="whatsappIcon" icon={faWhatsapp} size="lg" />
      </a>
    </div>
  )
}

function FullWidthTabs(props) {
  const classes = useStyles()
  const theme = useTheme()
  const { tabSelectedMainMenu, dispatch, perfil } = props

  // Altera a ordem das tabs no redux
  const handleChangeInRedux = (e) => {
    dispatch({ type: 'SELECT_TAB_MAIN_MENU', payload: e.target.innerText[0] })
  }

  let menu = <></>

  if (isVendaEDoacao(perfil)) {
    console.log('1')
    if (isComprador(perfil)) {
      menu = <ExibirRecebedor them={theme} tabSelectedMainMenu={tabSelectedMainMenu} handleChangeInRedux={handleChangeInRedux} />
    } else {
      menu = <ExibirFornecedor them={theme} tabSelectedMainMenu={tabSelectedMainMenu} handleChangeInRedux={handleChangeInRedux} />
    }
  } else if (isVendedor(perfil)) {
    menu = <ExibirMenuVendedor />
  } else if (isComprador(perfil)) {
    menu = <ExibirMenuComprador />
  } else if (isDoador(perfil)) {
    menu = <ExibirMenuDoador />
  } else if (isDonatario(perfil)) {
    menu = <ExibirMenuDonatario />
  } else {
    return <>Sem perfil</>
  }

  return (
    <Screen title="Menu">
      <div className={`w-100 ${classes.root}`}>
        {menu}
        <ExibirWhatsapp />
      </div>
    </Screen>
  )
}

const mapStateToPros = (state) => ({
  tabSelectedMainMenu: state.main.tabSelectedMainMenu,
  perfil: state.perfil,
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToPros, mapDispatchToProps)(FullWidthTabs)
