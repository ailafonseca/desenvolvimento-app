import React, { useContext } from 'react'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle'
import Accordion from 'react-bootstrap/Accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import './vendaReserva.css'

export default function MyCustomToggle ({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext)

  const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey))

  const isCurrentEventKey = currentEventKey === eventKey

  return (
    <Accordion.Toggle className='align' onClick={decoratedOnClick}>
      {isCurrentEventKey ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />} {children}
    </Accordion.Toggle>
  )
}
