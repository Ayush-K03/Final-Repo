import {createRoot} from "react-dom/client"
import {useState,useEffect} from "react"


const root = createRoot(document.getElementById("root"))


function App(){
  const [session,setSession]=useState([])
  const [sessionName,setSessionName]=useState("default")
  const [SessionTime,setSessionTime]=useState(15)
  const [running,setRunning] = useState(false);

  
  return(
    <>
      <div className="titleMsg"> Welcome to Student Timer Board</div>
      {!running && <SessionDetailsEdit setSessionName={setSessionName} setSessionTime={setSessionTime}/>}
      <Timer setSession={setSession} session={session} key={SessionTime} InitialTime={SessionTime} sessionName={sessionName} running={running} setRunning={setRunning}/>
      <CurrentSession sessionName={sessionName} SessionTime={SessionTime}/>
      <SessionHistory SessionTime={SessionTime} sessionName={sessionName} session={session} setSession={setSession}/>
    
    </>
  )
}

function Timer( {setSession,session,sessionName,running,setRunning,InitialTime} ){
  let timeString = new Date().toLocaleTimeString();
  const [time,setTime] = useState(InitialTime);
  const [success,setSuccess] = useState(false);


  useEffect(()=>{
    if (!running) return
    const id = setInterval(()=> {setTime(prev=>(prev > 0 ? prev - 1 : prev))}, 1000) 
    return ()=> clearInterval(id)
    },[running])
    
  useEffect(()=>{
    let id2;
    if (time===0){
      setSession((prev)=> [...prev,{sid:(crypto.randomUUID().split('-')[0]),completedAt:timeString,duration:InitialTime,sessionName:sessionName}])
      //stops the timer
        setRunning(false);
      //show completion msg with clock still 0
        setSuccess(true);
        id2 =setTimeout(()=>{setSuccess(false); setTime(InitialTime)},1200)
        console.log("here");
      }
    return ()=> clearTimeout(id2)
    },[time])


    return(
    <>
    <h1>{time} remaining</h1>
    {running ? <button onClick={()=>{setRunning(false)}}>Pause</button> : <button onClick={()=>{setRunning(true)}}>Start</button>}
    <button onClick={()=>{
      setTime(InitialTime)
      setRunning(false)
      }}>Reset</button>
    <div>{success ? "Timer Completed !!!":""}</div>
    </>
  )
}


function SessionHistory({ session, setSession,success}) {

  return (
    <>
      <div>No. of completed sessions : {session.length}</div>
      <div>Session History : </div>
      {!(session.length > 0) && "No session till now !"}
      {(session.length > 0) && session.map((s) => (
        <SessionItem s={s} session={session} setSession={setSession} key={s.sid}/>
      ))}

    </>
  )
}

function SessionItem({s,setSession,session}){
    const [editingId, setEditingId] = useState(null);
    const [editedValue, setEditedValue] = useState(" ");

    function handleDelete(){
    setSession(session.filter(item => item.sid != s.sid))
    }

    function handleEdit(){
      setEditingId(s.sid);
      setEditedValue(s.sessionName)
    }

    function handleSave(){
      setSession(
        prev => prev.map(obj => obj.sid == editingId ? { ...obj, sessionName: editedValue } : obj)
      );
      setEditingId(null);
    }


    return(
      <div>
        Session Id : {s.sid} | Duration : {s.duration} | Completed At: {s.completedAt} | Session Name : {(editingId == s.sid) ? <input type="text" value={editedValue} onChange={(e) => setEditedValue(e.target.value)} /> : s.sessionName} |
        <button key={s.sid} onClick={() => handleDelete()}>Delete</button>
        {(editingId === null)&& <button onClick={()=> handleEdit()}>Edit</button>}
        {(editingId === s.sid) && <button onClick={() => handleSave()}>Save</button>}
      </div>
    )
  }



function CurrentSession ({sessionName,SessionTime}){
  return (
    <>
      <pre>
      Name of this session : {sessionName} <br />
      Duration of this session : {SessionTime}
      </pre>
    </>
  )
}

function SessionDetailsEdit({setSessionName, setSessionTime}){
  return(
    <>
      Enter  duration of session : <input type="number" onChange={(e)=>setSessionTime(parseInt(e.target.value||15))}/><br />
      Enter name of the session : <input type="text" onChange={(e)=>setSessionName((e.target.value))}/>
      <br />
    </>
  )
}

root.render(<App/>)