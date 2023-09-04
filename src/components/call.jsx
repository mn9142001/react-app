
const CallAlert = ({myPeer, call, setCallStatus}) => {
    const acceptCall = e => {
        setCallStatus("started")
    }

    const denyCall = e => {
        call.close()
    }


    return <div className="p-2 flex items-center justify-center w-screen h-screen absolute bg-gray-600 text-white">
        <div className="flex flex-col p-2 w-1/2 h-1/2 items-center justify-center bg-gray-500 rounded-md">
            <p className="text-xl">Incoming call from : {call?.metadata?.userID}</p>
        
            <div className="flex p-2">
                <button onClick={acceptCall} className="m-2 p-4 rounded-md text-xl bg-blue-500">Accept</button>
                <button onClick={denyCall} className="m-2 p-4 rounded-md text-xl bg-red-500">Deny</button>
            </div>
        </div>

    </div>
}

const CallComponent = ({localVideoRef, remoteVidedoRef}) => {

    return <div className="flex flex-wrap">
        <video src="" className="w-72 p-2" ref={localVideoRef}></video>
        <video src="" className="w-72 p-2" ref={remoteVidedoRef}></video>
    </div>
}

export {CallAlert, CallComponent}