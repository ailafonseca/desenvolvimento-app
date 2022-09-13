import React from 'react'
import { Form } from 'react-bootstrap'

class ObservationTextArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      oldCharsleft: props.maxchars,
      charsLeft: props.maxchars,
      labelTextArea: props.labeltextarea,
      textareaRows: props.textarearows
    }
  }

  decreaseChars = (e) => {
    const { charsLeft, oldCharsleft } = this.state
    this.setState({ textTyped: e.target.value })
    const intChars = e.target.value.length

    let remainingChars = oldCharsleft - intChars

    if (remainingChars < 0) {
      remainingChars = 0
      return false
    }

    this.setState({ charsLeft: remainingChars })

    return charsLeft
  }

  render () {
    const { charsLeft, labelTextArea, textareaRows, oldCharsleft } = this.state
    const { value, id, disabled } = this.props
    const zeroChars = charsLeft === 0 ? 'text-danger' : 'text-success'
    return (
      <Form.Group>
        {labelTextArea &&
          labelTextArea.length > 0 &&
            <Form.Label htmlFor={id}>
              {labelTextArea}
            </Form.Label>}
        <Form.Control
          as='textarea'
          rows={textareaRows}
          id={id}
          disabled={disabled || false}
          onKeyUp={e => this.decreaseChars(e)}
          maxLength={this.state.oldCharsleft}
          {...this.props}
        />
        <div className='limit-chars-textarea'>
          Você pode digitar
          <span className={`charsRemaineds ${zeroChars}`}>
            {` ${value && value.length > 0 ? oldCharsleft - value.length : charsLeft} `}
          </span>
          catacteres
        </div>
      </Form.Group>
    )
  }
}

export default ObservationTextArea
