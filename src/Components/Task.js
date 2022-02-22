import {FaTimes} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from './Button'
const Task = ({task, onDelete, onToggle}) => {
  const navigate = useNavigate()
  return (
    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={() =>onToggle(task.id)}>
        <h3>
            {task.text} <FaTimes style={{color:'red', cursor:'pointer'}}
            onClick={() => onDelete(task.id)}
            />
        </h3>
        <p>{task.day}</p>
        <Button onClick={()=>{
          navigate(`/task/${task.id}`)
        }}
        text='View Details'/>
     
    </div>
  )
}

export default Task