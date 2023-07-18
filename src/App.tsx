/* eslint-disable @typescript-eslint/space-before-function-paren */
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants/constants'

import { LanguageSelector } from './components/icons/LanguageSelector'
import CloseFullscreenOutlinedIcon from '@mui/icons-material/CloseFullscreenOutlined'
import { SectionType } from '../types.d'

import { TextArea } from './components/TextArea'

function App() {
  const { loading, fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage, fromText, result, setFromText, setResult } = useStore()

  return (
    <Container fluid>
      <h2>Google Translator Clone</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <h2>From</h2>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />
            <TextArea
              type={SectionType.From}
              onChange={setFromText}
              value={fromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
            className='btn btn-primary'><CloseFullscreenOutlinedIcon /></Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <h2>To</h2>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
            {/* {toLnguage} */}
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
