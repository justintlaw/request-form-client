import React from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import { Link } from 'react-router-dom'

import MaintenanceInformation from '../components/Home/MaintenanceInformation'

export default function Home() {

  return (
    <div>
      <Alert elevation={3} severity="info">
        Maintenance operates Monday to Friday from 9:00 AM to 5:00 PM.
        For emergencies, please call us at (202) 555-0186.
      </Alert>

      <Paper
        elevation={3}
        sx={{ marginTop: '1rem' }}
      >
        <Box sx={{
          padding: '1rem'
        }}>
          <MaintenanceInformation />
          {/* <Link to="/submit">Submit a Maintenance Request</Link> */}
          <Button
            variant="text"
            component={Link}
            to="submit"
          >
            Submit a Maintenance Request
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
