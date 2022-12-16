import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { useSocketContext } from '../../context-providers/socket.provider'

import './VideoPlayer.styles.css'


const VideoPlayer = () => {
  const { name, callAccepted, myVideo, otherUserVideo, callEnded, stream, call } = useSocketContext()
  console.log(otherUserVideo)
  console.log('my video', myVideo)
  
  return (
    <div>
      <Grid container className='gridContainer' >
        {/* My Video */}
        {/* {
          stream && (
            <Paper variant='outlined' className='paper'>
              <Grid item xs={12} md={6} >
                <Typography variant='h5' gutterBottom>{ name || 'User' }</Typography>
                <video ref={myVideo} muted playsInline autoPlay className='video' />
              </Grid> 
            </Paper>
          )
        } */}
        <Paper variant='outlined' className='paper'>
          <Grid item xs={12} md={6} >
            <Typography variant='h5' gutterBottom>{ name || 'User' }</Typography>
            <video ref={myVideo} muted playsInline autoPlay className='video' />
          </Grid>
        </Paper>


        {/* Other User's Video */}
        {
          (callAccepted && !callEnded) && (
            <Paper  elevation={24} className='paper'>
              <Grid item xs={12} md={6} >
                <Typography variant='h5' gutterBottom>{ call.callerName || 'User' }</Typography>
                <video ref={otherUserVideo} muted playsInline autoPlay className='video' />
              </Grid>
            </Paper>
          )
        }
      </Grid>
    </div>
  )
}

export default VideoPlayer
