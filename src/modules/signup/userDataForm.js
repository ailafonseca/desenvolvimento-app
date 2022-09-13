import React, { Component } from 'react';
//import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Button, Form } from 'react-bootstrap';
//import FormControl from 'react-bootstrap/FormControl'

const FieldInput = ({ name, placeholder, type }) => {
    return (
        <Form.Control type={type} placeholder={placeholder} isInvalid />
    )
}

const style = {
    width: `${100}%`,
    maxWidth: `${500}px`
}

const style2 = {
    width: `${100}%`,
    padding: `${10}px`,
    display: "flex",
    justifyContent: "center"
}

const style3 = {
    margin: `${19}px 0`
}

class userDataForm extends Component {

    render() {
        const { onSubmit } = this.props
        return (
            <div style={style2}>
                <Form onSubmit={onSubmit} style={style} validated={true}>
                    <img id="saveadd-main-logo" style={{ width: "60%" }} src={`${process.env.PUBLIC_URL}/logo.svg`} alt="" />
                    <Form.Group>
                        <Form.Label>Testando Apenas</Form.Label>
                        <Form.Control type="input" isValid={true}/>
                       {/*<FormControl.FeedBack>Deu bom demais</FormControl.FeedBack>*/}
                    </Form.Group>
                    <Form.Group>
                        <div style={style3}>
                            <Form.Label htmlFor="nome"><strong>Nome</strong></Form.Label>
                            <Field name="nome" component={FieldInput} type="text" />
                            <Form.Text>Deu certo</Form.Text>
                        </div>
                        <div style={style3}>
                            <label htmlFor="cpf"><strong>CPF</strong></label>
                            <Field name="cpf" component={FieldInput} type="text" />
                            <Form.Text>Deu certo</Form.Text>
                        </div>
                        <div style={style3}>
                            <label htmlFor="email"><strong>E-mail</strong></label>
                            <Field name="email" component={FieldInput} type="text" />
                            <Form.Text>Deu certo</Form.Text>
                        </div>
                        <div style={style3}>
                            <label htmlFor="nascimento"><strong>Data de nascimento</strong></label>
                            <Field name="nascimento" component={FieldInput} type="text" />
                            <Form.Text>Deu certo</Form.Text>
                        </div>
                        <div style={style3}>
                            <label htmlFor="senha"><strong>Senha</strong></label>
                            <Field name="senha" component={FieldInput} type="password" />
                            <Form.Text>Deu certo</Form.Text>
                        </div>
                        <div style={style3}>
                            <label htmlFor="senhaRepetida"><strong>Repetir senha</strong></label>
                            <Field name="senhaRepetida" component={FieldInput} type="password" success />
                            <Form.Text>Deu certo</Form.Text>
                        </div>
                        <div style={style3}>
                            <Button>Cadastrar</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}


export default reduxForm({ form: "userDataForm" })(userDataForm)