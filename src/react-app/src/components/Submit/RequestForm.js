import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import Stack from '@mui/material/Stack'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import FormInputText from './Wrappers/FormInputText'
import FormAreaText from './Wrappers/FormAreaText'
import DismissableAlert from './DimissableAlert'
import ConstructionIcon from '@mui/icons-material/Construction'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { Auth } from 'aws-amplify'

import '../../Default.css'
import { API_BASE_URL } from '../../constants'

export default function RequestForm({
  isEditForm = false,
  setEditing = undefined,
  setRequests = undefined,
  currentData
}) {
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: currentData?.name ?? '',
      address: currentData?.address ?? '',
      email: currentData?.email ?? '',
      phone: currentData?.phone ?? '',
      issue: currentData?.issue ?? ''
    }
  })

  /** TODO
   * This function is being reused, it should be defined once
   * elsewhere in the code.
   */
  const getHeaders = async() => {
    const session = await Auth.currentSession()
    return {
      'Content-type': 'application/json',
      'Authorization': session.getIdToken().getJwtToken()
    }    
  }

  const [loading, setLoading] = useState(false)
  const [toastIsOpen, setToast] = useState(false)
  const [requestSucceeded, setRequestStatus] = useState(false)

  const iconStyle = loading
    ? { animation: 'spinner 1s linear infinite' }
    : {}

  const cancel = () => {
    reset()
    setEditing(false)
  }

  const handleFailure = () => {
    setLoading(false)
    setRequestStatus(false)
    setToast(true)
    setTimeout(() => setToast(false), 5000)
  }

  const handleSuccess = (data) => {
    reset()
    setLoading(false)
    setRequestStatus(true)
    setRequests(prevRequests => {
      const updateIndex = prevRequests.findIndex(req => req.id === currentData.id)
      const tempRequests = [...prevRequests]
      tempRequests.splice(updateIndex, 1, data)
      return tempRequests
    })
    setToast(true)
    setTimeout(() => setToast(false), 5000)
  }

  /** TODO
   * Refactor with async/await
   */
  const onSubmit = (data) => {
    setLoading(true)

    const url = isEditForm ? `${API_BASE_URL}/requests/${currentData.id}` : `${API_BASE_URL}/requests`


    getHeaders().then(headers => {
      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })
      .then(res => {
        // TODO: One function for repeated actions
        if (res.status >= 300) {
          handleFailure()
        } else {
          res.json().then(data => { handleSuccess(data) })
        }
  
        setEditing(false)
      })
      .catch(() => {
        handleFailure()
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormInputText
          name="name"
          label="Name"
          control={control}
          errorMessage="Name is required."
        />

        <FormInputText
          name="address"
          label="Address"
          control={control}
          errorMessage="Address is required."
        />

        <FormInputText
          name="email"
          label="Email"
          control={control}
          errorMessage="Email is required."
        />

        <FormInputText
          name="phone"
          label="Phone Number"
          control={control}
          errorMessage="Phone number is required."
        />

        <FormAreaText
          name="issue"
          control={control}
          label="Describe the issue*"
          error={errors.issue}
        />
        {errors.issue &&
        <Typography variant="caption" color="error">
          <span>Please describe the issue.</span>
        </Typography>
        }
      </Stack>

      <CardActions sx={{ marginTop: '1rem' }}>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </LoadingButton>
        {isEditForm &&
        <Button color="error" onClick={cancel}>Cancel</Button>
        }
        <ConstructionIcon
          style={iconStyle}
          sx={{ ml: 2 }} />
      </CardActions>

      <DismissableAlert handleClose={() => setToast(false)} isOpen={toastIsOpen} succeeded={requestSucceeded} />
    </form>
  )
}
