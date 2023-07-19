/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import Form from 'react-bootstrap/Form'
import { SectionType } from '../../types.d'

interface Props {
  type: SectionType
  autoFocus?: boolean
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = {
  height: '200px',
  border: 'none',
  resize: 'none'
}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Enter text to translate'
  if (loading === true) return 'Loading...'
  return 'Translation'
}

export const TextArea: React.FC<Props> = ({
  loading,
  value,
  onChange,
  autoFocus,
  type
}: Props) => {
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
        <Form.Control
        disabled={type === SectionType.To}
        autoFocus={type === SectionType.From ? autoFocus : false}
        as='textarea'
        // @ts-ignore
        style={styles}
        placeholder={getPlaceholder({ type, loading })}
        value={value}
        onChange={handleChange}
        />
  )
}
