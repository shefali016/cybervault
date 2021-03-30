import RichTextEditor from 'react-rte'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useOnChange } from '../../../utils/hooks'

type editorProps = {
  handleTextChange: (val: string) => void
  placeholder: string
  resetValue: boolean
}

const Editor = ({ handleTextChange, placeholder, resetValue }: editorProps) => {
  const classes = useStyles()
  const [value, setValue] = useState(RichTextEditor.createEmptyValue())
  const onChange = (value: any) => {
    setValue(value)
    if (handleTextChange) {
      handleTextChange(value.toString('html'))
    }
  }
  useOnChange(resetValue, (success) => {
    if (success) {
      setValue(RichTextEditor.createEmptyValue())
    }
  })

  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      className={classes.textEditor}
      placeholder={placeholder}
    />
  )
}

export default Editor

const useStyles = makeStyles((theme) => ({
  textEditor: {
    '& span': {
      color: 'black'
    }
  }
}))
