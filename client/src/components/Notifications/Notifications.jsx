import React from 'react'
import { Button } from "@mui/material"

import { useSocketContext } from '../../context-providers/socket.provider'

const Notifications = () => {
  const { answerCall, call, callAccepted } = useSocketContext()
  
  return (
    <>
      {
        call.isReceivedCall && !callAccepted && (
          <div style={{ display: 'flex', justifyContent:'center' }}>
            <h1>{call.callerName} is calling</h1>
            <Button variant="contained" color="primary" onClick={() => {answerCall()}}>
              Answer
            </Button>
          </div>
        )
      }
    </>
  )
}

export default Notifications