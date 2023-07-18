import Form from 'react-bootstrap/Form'
import { SectionType, type FromLanguage, type Language } from '../../../types.d'
import { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from '../../constants/constants'

type Props =
| { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
| { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: React.FC<Props> = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
        <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
  )
}
