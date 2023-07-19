/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useEffect } from 'react'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants/constants'

import { LanguageSelector } from './components/icons/LanguageSelector'
// import CloseFullscreenOutlinedIcon from '@mui/icons-material/CloseFullscreenOutlined'
import { SectionType } from '../types.d'

import { TextArea } from './components/TextArea'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/icons'

function App() {
  const { loading, fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage, fromText, result, setFromText, setResult } = useStore()

  const debouncedFromText = useDebounce(fromText, 350)

  useEffect(() => {
    // console.log('Esto es un useEffect!')
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null || result === undefined) return
        setResult(result)
      })
      .catch((error) => {
        console.log(error)
        setResult('Error!')
      })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const hadleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeaker = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    window.speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google Translate Clone</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <h2>From</h2>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.From}
                onChange={setFromText}
                value={fromText}
              />
            </div>
          </Stack>
        </Col>
        <Col xs='auto'>
          {/* <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
            className=''><CloseFullscreenOutlinedIcon />
          </Button> */}
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <h2>To</h2>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
            {/* {toLnguage} */}
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex', justifyContent: 'space-between' }} >
                <Button
                  variant='link'
                  // style={{ position: 'absolute', left: 0, bottom: 0 }}
                  onClick={hadleClipboard}>
                  < ClipboardIcon />
                </Button>
                <Button
                  variant='link'
                  // style={{ position: 'absolute', left: 0, bottom: 0 }}
                  onClick={handleSpeaker}>
                  < SpeakerIcon />
                </Button>

              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
