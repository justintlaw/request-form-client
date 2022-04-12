import React, { useState, useEffect } from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import Account from '../components/Account/Account'
import RequestCard from '../components/Requests/RequestCard'
import SkeletonRequestCard from '../components/Requests/SkeletonRequestCard'
import { API_BASE_URL } from '../constants'
import { Auth } from 'aws-amplify'

export default function Requests() {
  const { user } = useAuthenticator((context) => [context.user])
  const [requests, setRequests] = useState([])
  const [pageLoading, setPageLoading] = useState(false)

  const getHeaders = async() => {
    const session = await Auth.currentSession()
    return {
      'Content-type': 'application/json',
      'Authorization': session.getIdToken().getJwtToken()
    }    
  }

  const getMaintenanceRequests = async () => {
    setPageLoading(true)
    const headers = await getHeaders()
    const options = {
      method: 'GET',
      headers
    }

    const res = await fetch(`${API_BASE_URL}/requests?pending=true`, options)
    const data = await res.json()
    setRequests(data)
    setPageLoading(false)
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

  let requestsContent = null
  
  if (requests.length > 0) {
    requestsContent = requests?.map((request, index) => (
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
        setRequests={setRequests}
      />
    ))
  }

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
        {pageLoading &&
          <Box>
            <SkeletonRequestCard />
            <SkeletonRequestCard />
          </Box>
        }
        {!pageLoading && !requestsContent &&
          <Typography variant="body1" color="text.primary">There are no active requests at this time.</Typography>
        }
        {!pageLoading && !!requestsContent && requestsContent}
        </Box>
      </Box>
      }
    </Box>
  )
}
