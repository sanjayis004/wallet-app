import React from 'react'
import { Box } from '@mui/material'
import '../styles/main.scss'

function SubmitButton(props) {
  return (
    <Box style={{ padding: '10px', 'margin': '10px' }}>
          <button className='submit-button' onClick={props.handleSubmit} >{props.buttonLable}</button>
        </Box>
  )
}

export default SubmitButton
