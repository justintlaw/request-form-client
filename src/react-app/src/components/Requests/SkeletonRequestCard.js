import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

export default function SkeletonRequestCard() {
  return (
    <Box>
      <Card sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <CardContent sx={{ display: 'block' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5"><Skeleton width={100} /></Typography>
            <IconButton disabled><Skeleton variant="circular" width={30} /></IconButton>
          </Box>
          <Typography variant="subtitle2"><Skeleton /></Typography>
          <Typography variant="subtitle2"><Skeleton /></Typography>
          <Typography variant="subtitle1"><Skeleton /></Typography>
          <Typography variant="body1"><Skeleton /></Typography>
        </CardContent>

        <CardActions>
          <LoadingButton disabled><Skeleton width={80} height={50} /></LoadingButton>
          <LoadingButton disabled><Skeleton width={80} height={50} /></LoadingButton>
        </CardActions>
      </Card>
    </Box>
  )
}
