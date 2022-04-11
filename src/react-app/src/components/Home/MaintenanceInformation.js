import React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function MaintenanceInformation() {
  return (
    <>
      <Typography
        variant="h5"
        color="text.primary"
      >
        General Information
      </Typography>

      <Divider />

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          marginTop: '1rem'
        }}
      >
        All maintenance requests will receive a response within 24 hours, or by Monday at 5pm
        if it was submitted after Thursday by 5pm. Maintenance will only be performed for appliances
        that are covered in the apartment contract.
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          marginTop: '1rem'
        }}
      >
        Areas Covered:
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <ul>
          <li>Regular maintenance of kitchen appliances</li>
          <li>Quarterly carpet cleanings</li>
          <li>Regular maintenance of washer and dryer</li>
          <li>Plumbing, where damage is not caused by negligence of tenet</li>
          <li>Other areas as covered in the housing contract</li>
        </ul>
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          marginTop: '1rem'
        }}
      >
        Areas NOT Covered:
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <ul>
          <li>Damage beyond reasonable use of kitchen appliances</li>
          <li>Pests that come after tenency begins</li>
          <li>Replacement of lightbulbs</li>
          <li>Other areas as stated in the housing contract</li>
        </ul>
      </Typography>
    </>
  )
}
