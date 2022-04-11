import React, { useState, useEffect } from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Account from '../components/Account/Account'
import RequestCard from '../components/Requests/RequestCard'
import { API_BASE_URL } from '../constants'
import { Auth } from 'aws-amplify'

export default function Requests() {
  const { user } = useAuthenticator((context) => [context.user])
  const [requests, setRequests] = useState([])

  const getHeaders = async() => {
    const session = await Auth.currentSession()
    return {
      'Content-type': 'application/json',
      'Authorization': session.getIdToken().getJwtToken()
    }    
  }

  const getMaintenanceRequests = async () => {
    const headers = await getHeaders()
    const options = {
      method: 'GET',
      headers
    }

    const res = await fetch(`${API_BASE_URL}/requests`, options)
    const data = await res.json()
    setRequests(data)
  }

  // TODO: Rename function or refactor
  // Current functionality is specific to updating status and
  // removing from array
  const handleSubmit = async ({ id, issue, status }) => {
    const headers = await getHeaders()
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({ issue, status })
    }

    const res = await fetch(`${API_BASE_URL}/requests/${id}`, options)
    const data = await res.json()

    setRequests(prevRequests => {
      const updateIndex = prevRequests.findIndex(req => req.id === id)
      const tempRequests = [...prevRequests]
      tempRequests.splice(updateIndex, 1, data)
      return tempRequests
    })
  }

  useEffect(() => {
    if (user) {
      getMaintenanceRequests()
    }
  }, [user])

  const requestsContent = requests.map((request, index) => (
    /**
     * Only display 'pending' cards.
     * TODO: Enable viewing of other cards.
     */
    request.status === 'pending' &&
    <RequestCard
      key={request.id}
      request={request}
      index={index}
      onSubmit={handleSubmit}
    />
  ))

  return (
    <Box>
      {!user &&
      <Account />
      }

      {!!user &&
      <Box>
        <Typography variant="h4" color="text.primary">Requests</Typography>
        <Divider></Divider>
        <Box sx={{ marginTop: '1rem' }}>
        {requestsContent}
        {/* TODO: DynamoDB should query only pending to begin with, using status as the sort key */}
        {requests.filter(req => req.status === 'pending').length < 1 &&
          <Typography variant="body1" color="text.primary">There are no active requests at this time.</Typography>
        }
        </Box>
      </Box>
      }
    </Box>
  )
}
