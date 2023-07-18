import Form from 'react-bootstrap/Form'
import { SUPPORTED_LANGUAGES } from '../../constants/constants'
import { type FromLanguage, type Language } from '../../../types.d'

// interface Props {
//   onChange: (language: Language) => void
// }

type Props =
| { type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void }
| { type: 'to', value: Language, onChange: (language: Language) => void }

export const LanguageSelector: React.FC<Props> = ({ onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
        <Form.Select
        onChange={handleChange}
        aria-label="Selecciona el idioma">
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
  )
}
