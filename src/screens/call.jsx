import Peer from "peerjs"
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";
import {CallComponent, CallAlert} from "../components/call";


const CallApp = _ => {
    let {userID} = useParams()
    const myPeer = new Peer(userID, {
        host : "localhost",
        port : 9000
    });
    const [incomingCall, setIncomingCall] = useState();
    const [callStatus, setCallStatus] = useState();
    const remoteUserIdRef = useRef()
    const remoteVidedoRef = useRef();
    const localVideoRef = useRef();
    const [remoteStream, setRemoteStream] = useState();
    const [localStream, setLocalStream] = useState();

    const getRemoteUserId = _ => {
        return remoteUserIdRef.current.value;
    }

    const setVideoStream = (ref, stream) => {
        const video = ref.current;
        video.srcObject = stream

        video.play()
    }

    const acceptCall = e => {
        navigator.mediaDevices.getUserMedia({video : true}).then(stream => {
            setLocalStream(stream)
            setVideoStream(localVideoRef, stream)
            incomingCall.answer(stream)
            incomingCall.on("stream", stream => {
                setRemoteStream(stream)
                setVideoStream(remoteVidedoRef, stream)
            })
        }).catch(error => {
            console.log("error", error)
        })
    }

    const startCall = e => {
        e.preventDefault();
        navigator.mediaDevices.getUserMedia({video:true}).then(
            stream => {
                setLocalStream(stream);
                const call = myPeer.call(getRemoteUserId(), stream, {metadata : {"userID" : userID}});
                call.on("stream", stream => {
                    setRemoteStream(stream);
                    setCallStatus("accepted")
                })
            }
        )
    }

    const callAccepted = e => {
        setVideoStream(localVideoRef, localStream)
        setVideoStream(remoteVidedoRef, remoteStream)
    }

    useEffect(_ => {
        if (callStatus === "started"){
            acceptCall()
        }
        if (callStatus === "accepted"){
            callAccepted()
        }

    }, [callStatus])

    myPeer.on('call', call => {
        setCallStatus("incoming")
        setIncomingCall(call)
    })

    if (incomingCall && callStatus === "incoming"){
        return <CallAlert call={incomingCall} setCallStatus={setCallStatus} myPeer={myPeer} />
    }

    if (callStatus === "starting"){
        return <div>
            <p>Starting a call for {getRemoteUserId()}</p>
        </div>
    }

    if (callStatus === "started"){
        return <CallComponent remoteVidedoRef={remoteVidedoRef} localVideoRef={localVideoRef} />
    }

    if (callStatus === "accepted"){
        return <CallComponent remoteVidedoRef={remoteVidedoRef} localVideoRef={localVideoRef} />
    }


    return <>
        <form action="" className="p-2">
            <input type="text" ref={remoteUserIdRef} placeholder="userID" /> <button onClick={startCall} className="p-2 rounded-md bg-slate-500 text-white text-xl px-4">call</button>
        </form>
    </>
}

export default CallApp