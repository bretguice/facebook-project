import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = ({loading}) => {
  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
        {loading === true ?
        <CircularProgress />
        : null
        }
    </Box>
  )
}

export default Loading