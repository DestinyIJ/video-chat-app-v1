import React, { useState } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from "@mui/material"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material'
import { useSocketContext } from '../../context-providers/socket.provider'

import './Options.styles.css'

const Options = ({ children }) => {
  const { me, callAccepted, callEnded, name, setName, leaveCall, callUser } = useSocketContext()
  const [idToCall, setIdToCall] = useState('')

  return (
    <Container className='container' >
        <Paper elevation={10} className='paper'>
          <form className='root' noValidate autoComplete='off'>
            <Grid container spacing={2}  className='gridContainer'>
              <Grid item xs={12} md={6} className='padding'>
                <Typography gutterBottom variant='h6'>Account Info</Typography>
                <TextField  className='marginBottom' id='standard-basic' variant='standard' label='Name' value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                <CopyToClipboard text={me} className='margin'>
                  <Button variant='contained'color='primary' fullWidth startIcon={<Assignment fontSize='large' />} >
                    Copy Your ID
                  </Button>
                </CopyToClipboard>
              </Grid>

              <Grid item xs={12} md={6} className='padding'>
                <Typography gutterBottom variant='h6'>Make a call</Typography>
                <TextField  className='marginBottom' id='standard-basic' variant='standard' label='Caller ID to call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                {
                  callAccepted && !callEnded ? (
                    <Button onClick={() => leaveCall()} variant='contained' className='marginTop' color='secondary' fullWidth startIcon={<PhoneDisabled fontSize='large' />} >
                        Hang up 
                    </Button>
                  )
                  : (
                    <Button onClick={() => callUser(idToCall)} variant='contained'color='primary' fullWidth startIcon={<Phone fontSize='large' />} >
                        Call
                    </Button>
                  )
                }
                
              </Grid>
            </Grid>
          </form>
          { children }
        </Paper>
        
    </Container>
  )
}

export default Options