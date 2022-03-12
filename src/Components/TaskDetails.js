import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "./Button"
function  TaskDetails(){
    const [loading, setLoading]=useState(true)
    const [task,setTask]=useState({})
    const [error,setError]=useState(null)
    const navigate = useNavigate()
    const params = useParams()
    useEffect(()=> {
        const fetchTask = async () =>{
            const res= await fetch(
            `http://localhost:5001/tasks/${params.id}`    
            )
            const data = await res.json()
            if (res.status===404){
                navigate('/')
            }
            setTask(data)
            
            setLoading(false)
        }
        fetchTask()
    },[params.id])
 
    return loading ? (
         <h3>Loading...</h3>
    ):(
        <div>
           <h3>{task.text}</h3> 
           <p>{task.day}</p>
           <Button onClick={() =>{
          navigate(-1)
        }}
        text='Go Back'/>
     
        </div>
    )
}

export default TaskDetails