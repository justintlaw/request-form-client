import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React from 'react'

import RequestForm from '../components/Submit/RequestForm';

export default function Submit({
  requestId = undefined,
  currentData = undefined,
  isEditForm = false,
  setEditing  = undefined
}) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" color="text.primary">
          {isEditForm ? `Edit Request for ${currentData.address}` : 'Submit a Maintenance Request'}
        </Typography>

        {!isEditForm &&
        <Typography variant="body2" color="text.secondary">
        All requests will receive a response within 24 hours.
        </Typography>        
        }

        <RequestForm
          currentData={currentData}
          isEditForm={isEditForm}
          setEditing={setEditing}
          requestId={requestId}
        />
      </CardContent>
    </Card>
  )
}
