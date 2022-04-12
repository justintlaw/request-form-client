import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';

import Submit from '../../pages/Submit';

export default function RequestCard({ request, index, onSubmit, setRequests }) {
  const [completeLoading, setCompleteLoading] = useState(false)
  const [canceledLoading, setCanceledLoading] = useState(false)
  const [isEditing, setEditing] = useState(false)

  const markComplete = async () => {
    setCompleteLoading(true)
    await onSubmit({
      id: request.id,
      status: 'completed'
    })
    setCompleteLoading(false)
  }

  const markCanceled = async () => {
    setCanceledLoading(true)
    await onSubmit({
      id: request.id,
      status: 'canceled'
    })
    setCanceledLoading(false)
  }

  const enterEditMode = () => {
    setEditing(true)
  }

  return (
    <Box>
      <Collapse in={!isEditing}>
        <Card sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} key={request.id}>
          <CardContent sx={{ display: 'block' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" color="text.primary">{request.address}</Typography>
              <IconButton aria-label="edit" color="secondary" onClick={enterEditMode} disabled={completeLoading || canceledLoading}>
                <EditIcon />
              </IconButton>
            </Box>
            <Typography variant="subtitle2" color="text.secondary">Submitted by {request.name} at {new Date(request.created_at).toLocaleString()}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Contact: {request.email} or {request.phone}</Typography>
            <Typography variant="subtitle1" color="text.primary">Issue:</Typography>
            <Typography variant="body1" color="text.secondary">{request.issue}</Typography>
          </CardContent>

          <CardActions>
            <LoadingButton loading={completeLoading} disabled={canceledLoading} color="success" onClick={markComplete}>Mark Complete</LoadingButton>
            <LoadingButton loading={canceledLoading} disabled={completeLoading} color="error" onClick={markCanceled}>Cancel Request</LoadingButton>
          </CardActions>
        </Card>
      </Collapse>    

      <Collapse in={isEditing}>
        <Submit currentData={request} isEditForm={true} setEditing={setEditing} setRequests={setRequests} />
      </Collapse>
    </Box>
  )
}
