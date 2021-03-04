import RichTextEditor from 'react-rte'
import { useState } from 'react'
import classes from '*.module.css'
import { makeStyles } from '@material-ui/core/styles'
import { useOnChange } from '../../../utils/hooks'

type editorProps = {
  handleTextChange: (val: string) => void
  placeholder: string
  resetValue: Boolean
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
  useOnChange(resetValue, (success: string | null) => {
    if (success) {
      setValue(RichTextEditor.createEmptyValue())
    }
  })

  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      className={classes.textEditor}
      autoFocus={true}
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
