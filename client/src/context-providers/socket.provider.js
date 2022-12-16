import React, { useState, useEffect, createContext, useContext, useRef} from "react";
import { io } from 'socket.io-client'
import Peer from 'simple-peer'
import usePersistState from "../custom-hooks/usePersistState";

const SocketContext = createContext()

const socket = io('http://localhost:8000')

export const SocketProvider = ({ children }) => {
    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [name, setName] = usePersistState('name', '')
    const [call, setCall] = useState({
        isReceivedCall: false,
        from: null,
        callerName: '',
        signal: null
    })
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)

    const myVideo = useRef()
    const otherUserVideo = useRef()
    const connectionRef = useRef()
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio:true})
            .then((currentStream) => {
                setStream(currentStream)
                myVideo.current.srcObject = currentStream
            })
        
        socket.on('me', (id) => setMe(id))
        socket.on('calluser', ({ from, callerName, signal}) => {
            setCall({
                isReceivedCall: true,
                from,
                callerName,
                signal
            })
        })
    }, [])

    const answerCall = () => {
        setCallAccepted(true)
        console.log('call accepted') 

        const peer = new Peer({ initiator: false, trickle:false, stream })

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, caller: call.from })
        })

        peer.on('stream', (currentStream) => {
            console.log('stream', currentStream)
            otherUserVideo.current.srcObject = currentStream
        })

        peer.signal(call.signal)

        connectionRef.current = peer
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle:false, stream })

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name})
        })

        peer.on('stream', (currentStream) => {
            myVideo.current.srcObject = currentStream
        })

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true)
            
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)

        connectionRef.current.destroy()
        window.location.reload()
    }

    return (
        <SocketContext.Provider value={{
            call,
            callUser,
            callAccepted,
            answerCall,
            callEnded,
            leaveCall,
            myVideo,
            otherUserVideo,
            stream,
            name,
            setName,
            me
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => useContext(SocketContext)

