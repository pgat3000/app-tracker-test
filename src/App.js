import  Header from './Components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tasks from './Components/Tasks';
import { useState , useEffect } from "react"
import AddTask from './Components/AddTask';
import Task from './Components/Task';
import Footer from './Components/Footer';
import About from './Components/About';
import TaskDetails from './Components/TaskDetails';
function App() {
  const [showAddTask, setShowAddTask]=useState
  (false)

  const [tasks,setTasks] = useState([])
  useEffect(()=> {
    const getTasks = async () =>{
      const taskFromServer = await  fecthTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  },[])
//fetch
const fecthTasks = async() =>{
  const  res = await fetch(
    'http://localhost:5001/tasks'
  )
  const data = await res.json()
  return data
}
//fetch task
const fetchTask = async(id) =>{
  const  res = await fetch(
    `http://localhost:5001/tasks/${id}`
  )
  const data = await res.json()
  return data
}
//Delete Task
const deleteTask = async  (id) =>{
  await fetch(`http://localhost:5001/tasks/${id}`,
  {
    method: 'DELETE',
  }
  )
  setTasks(tasks.filter((task)=> task.id!==
  id))

}
  //toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask= {...taskToToggle,
    reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5001/tasks/${id}`,{
    method:'PUT',
    headers: {
      'Content-type' :'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
 
    setTasks(tasks.map((task)=> task.id===id ?
    {...task, reminder: data.reminder } : task))
}
const addTask = async (task) => {
  const res = await fetch(`http://localhost:5001/tasks/`,{
    method: 'POST',
    headers: {
    'Content-type' :'application/json'
    },
    body: JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([...tasks,data])
  //const id = Math.floor(Math.random()*10000)+1
  //const newTask ={id,...task}
  //setTasks([...tasks, newTask])
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
     

      <Routes>
        <Route path='/' exact element={<>
           {showAddTask && <AddTask onAdd={addTask} 
                />}
      {tasks.length > 0 ? 
      <Tasks tasks={tasks} onDelete={deleteTask}
      onToggle= {toggleReminder}
      /> : ('No Tasks to Show')}

        </>} 
      />

       <Route path='/about' element={<About/>} />
       <Route path='/task/:id' element={<TaskDetails/>} />
       </Routes>
      <Footer/>
   
    </div>
    </Router>
  );
}

export default App;
