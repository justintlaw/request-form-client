import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';

import Submit from '../../pages/Submit';

export default function RequestCard({ request, index, onSubmit }) {
  const [isLoading, setLoading] = useState(false)
  const [isEditing, setEditing] = useState(false)

  const markComplete = async () => {
    setLoading(true)
    await onSubmit({
      id: request.id,
      status: 'completed'
    })
    setLoading(false)
  }

  const markCanceled = async () => {
    setLoading(true)
    await onSubmit({
      id: request.id,
      status: 'canceled'
    })
    setLoading(false)
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
              <IconButton aria-label="edit" color="secondary" onClick={enterEditMode}>
                <EditIcon />
              </IconButton>
            </Box>
            <Typography variant="subtitle2" color="text.secondary">Submitted by {request.name} at {new Date(request.created_at).toLocaleString()}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Contact: {request.email} or {request.phone}</Typography>
            <Typography variant="subtitle1" color="text.primary">Issue:</Typography>
            <Typography variant="body1" color="text.secondary">{request.issue}</Typography>
          </CardContent>

          <CardActions>
            <Button loading={isLoading} color="success" onClick={markComplete}>Mark Complete</Button>
            <Button loading={isLoading} color="error" onClick={markCanceled}>Cancel Request</Button>
          </CardActions>
        </Card>
      </Collapse>    

      <Collapse in={isEditing}>
        <Submit currentData={request} isEditForm={true} setEditing={setEditing} />
      </Collapse>
    </Box>
  )
}
