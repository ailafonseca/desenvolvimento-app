import React from 'react'
import { FormControl, InputGroup, Button } from 'react-bootstrap'
import Fuse from 'fuse.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { screenSize } from 'util/utils'

import './style.css'

const defaultFuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  minMatchCharLength: 2,
  // location: 0,
  threshold: 0.4,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ['nomeProduto'],
}

export default class SearchBar extends React.Component {
  fuse

  constructor(props) {
    super(props)

    this.state = {
      value: '',
      loading: false,
      screenSize: 'md',
    }

    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
    this.setState({ screenSize: screenSize() })
    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }

  get isMobile() {
    return this.state.screenSize !== 'lg'
  }
  get hasSearch() {
    return this.props.hasSearch || false
  }

  get options() {
    return this.props.options || defaultFuseOptions
  }

  onResize() {
    this.setState({ screenSize: screenSize() })
  }

  buttonClearSearch() {
    if (this.hasSearch)
      return (
        <Button className={`${this.isMobile ? '' : 'my-0 ml-1 mr-0'}`} variant="outline-danger" onClick={this.cleanSearch.bind(this)}>
          Limpar <FontAwesomeIcon icon={faTimes} size="sm" className="ml-1"></FontAwesomeIcon>
        </Button>
      )

    return <></>
  }

  cleanSearch() {
    this.setState({ value: '' })
    this.searchValues()
  }

  fuseInstance() {
    console.log('OPTIONS', this.props.options || defaultFuseOptions, this.options)
    this.fuse = new Fuse(this.props.items, this.options)
  }

  keyBind(e) {
    if (e.key === 'Enter') this.searchValues(this.state.value)
  }

  searchModel(e) {
    this.setState({ value: e.target.value })
  }

  searchValues(value) {
    if (!this.state || this.state.loading) return false

    const query = (value && value.trim()) || ''
    if (!query) return this.props.onSearchItems({ result: this.props.items, query })

    this.setState({ loading: true })

    if (!this.fuse) this.fuseInstance()
    const result = this.fuse.search(query).map((result) => result.item)

    this.setState({ loading: false })

    this.props.onSearchItems({ result, query })
    return result
  }

  render() {
    return (
      <InputGroup className="search-bar-container">
        {/* <InputGroup.Prepend
          className="search-icon-container d-flex align-items-center justify-content-center px-2"
          role="button"
          onClick={this.searchValues.bind(this.state.value)}
        >
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </InputGroup.Prepend> */}
        <FormControl
          type="text"
          placeholder={this.props.placeholder || 'Buscar'}
          value={this.state.value}
          onChange={this.searchModel.bind(this)}
          onKeyDown={this.keyBind.bind(this)}
        ></FormControl>
        {this.buttonClearSearch()}

        <Button className={`${this.isMobile ? '' : 'my-0 ml-1 mr-0'}`} onClick={() => this.searchValues(this.state.value)}>
          Buscar <FontAwesomeIcon icon={faSearch} size="sm" className="ml-1"></FontAwesomeIcon>
        </Button>
      </InputGroup>
    )
  }
}
