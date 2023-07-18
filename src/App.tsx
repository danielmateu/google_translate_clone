/* eslint-disable @typescript-eslint/space-before-function-paren */
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { AUTO_LENGUAGE } from './constants/constants'
import { SnowboardIcon } from './components/icons/SnowboardIcon'
import { LanguageSelector } from './components/icons/LanguageSelector'

function App() {
  const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage } = useStore()

  return (
    <Container fluid>
      <h1>Google Translator Clone</h1>

      <Row>
        <Col>
          <h2>From</h2>
          <LanguageSelector
          type='from'
          value={fromLanguage}
          onChange={setFromLanguage} />
          {fromLanguage}
        </Col>
        <Col>
          <Button
            disabled={fromLanguage === AUTO_LENGUAGE}
            onClick={interchangeLanguages}
            className='btn btn-primary'><SnowboardIcon /></Button>
        </Col>
        <Col>
          <h2>To</h2>
          <LanguageSelector
          type='to'
          value={toLanguage}
          onChange={setToLanguage} />
          {toLanguage}
        </Col>
      </Row>
    </Container>
  )
}

export default App
