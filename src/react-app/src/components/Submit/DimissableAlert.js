import * as React from 'react'
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'

export default function DismissableAlert({ handleClose, isOpen, succeeded }) {
  return (
    <Collapse in={isOpen}>
      <Alert
        severity={succeeded ? 'success' : 'error' }
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mt: 2 }}
      >
        {succeeded ? 'Request has been submitted.' : 'Request failed, please try again later.'}
      </Alert>
    </Collapse>
  )
}
