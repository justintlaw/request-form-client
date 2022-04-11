// REFERENCE: https://github.com/Mohammad-Faisal/react-hook-form-material-ui/blob/master/src/form-components/FormInputText.tsx

import React from 'react'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

export default function FormInputText({ name, control, label, errorMessage }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState
      }) => (
        <TextField
          required
          label={label}
          variant="standard"
          style={{ width: '100%', maxWidth: 600 }}
          error={!!error}
          onChange={onChange}
          helperText={!!error ? errorMessage : ''}
          value={value}
        />
      )}
    />
  )
}