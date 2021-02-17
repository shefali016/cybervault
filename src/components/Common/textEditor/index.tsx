import RichTextEditor from 'react-rte'
import { useState } from 'react'
import classes from '*.module.css'
import { makeStyles } from '@material-ui/core/styles'
import { useOnChange } from '../../../utils/hooks'

type editorProps = {
  handleTextChange: (val: string) => void
  placeholder:string
  resetValue:Boolean
}

const Editor = ({ handleTextChange,placeholder ,resetValue}: editorProps) => {
  const classes = useStyles()
  const [value, setValue] = useState(RichTextEditor.createEmptyValue())
  const onChange = (value: any) => {
    console.log(value, 'valll')
    setValue(value)
    if (handleTextChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      handleTextChange(value.toString('html'))
    }
  }
  useOnChange(resetValue, (success: string | null) => {
    if (success) {
      console.log('gtgrgrgrfgrgrgrgrgrgrrrgtt')
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
