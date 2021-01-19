import { Button, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React from 'react'
import { useTabletLayout } from '../../../utils/hooks'

type Props = {
  onClick: () => void
  title: string
}

const AddMoreButton = ({ onClick, title }: Props) => {
  const isTablet = useTabletLayout()
  return (
    <div style={{ marginTop: isTablet ? 5 : 10 }}>
      <Button
        variant='contained'
        onClick={onClick}
        className={'add-more-button'}>
        <Typography variant={'button'} className={'add-more-label'}>
          {title}
        </Typography>
        <AddIcon
          style={{
            marginLeft: 8,
            width: 15,
            height: 15
          }}
        />
      </Button>
    </div>
  )
}

export default AddMoreButton
