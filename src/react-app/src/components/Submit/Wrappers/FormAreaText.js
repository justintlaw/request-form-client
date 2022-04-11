// REFERENCE: https://github.com/Mohammad-Faisal/react-hook-form-material-ui/blob/master/src/form-components/FormInputText.tsx

import React from 'react'
import { Controller } from 'react-hook-form'
import TextareaAutosize from '@mui/material/TextareaAutosize'

export default function FormAreaText({ name, control, label, error }) {
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
        <TextareaAutosize
          required
          aria-label="issue"
          placeholder={label}
          minRows={4}
          style={{ width: '100%', maxWidth: 600, marginTop: '2rem', backgroundColor: error ? '#ffcdd2' : 'white' }}
          onChange={onChange}
          value={value}
        />
      )}
    />
  )
}