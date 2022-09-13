import React from 'react'
import { Table } from 'react-bootstrap'

export default class TableList extends React.Component {
  render () {
    const { className, children } = this.props

    return (
      <Table responsive striped hover size='sm' className={className}>
        {children}
      </Table>
    )
  }
}
