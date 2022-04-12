import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route ,Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from "./components/Footer";
import Tasks from './components/Tasks';
import Addtask from "./components/Addtask";
import About from "./components/About";

const App = () => {
  const[ showAddTask,  setShowAddTask ] = useState(false)
  const [myActivities, setMyActvities] = useState([])

useEffect(()=> {
  const getTasks = async () =>{
   const tasksFromServer = await fetchTasks()
   setMyActvities(tasksFromServer)
  }
 
   getTasks()
}, [])

// fetch Tasks
    const fetchTasks = async () =>{
     const res = await fetch('http://localhost:5000/myActivities')
     const data = await res.json()

     return data
   }

// fetch Task
    const fetchTask = async (id) =>{
     const res = await fetch(`http://localhost:5000/myActivities/${id}`)
     const data = await res.json()

     return data
   }

   //  Add Task
  const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/myActivities', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

    const data = await res.json()

    setMyActvities([...myActivities, data])
    
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([ ...myActivities, newTask])
}

//  Delete Task
const deleteTask = async (id) => {
await fetch(`http://localhost:5000/myActivities/${id}`, {
  method: 'DELETE',
})

  setMyActvities(myActivities.filter((task) => (task.id !== id)))
}

// Toggle Reminder
const toggleReminder = async (id) =>{
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, reminder : !taskToToggle.reminder}
const res = await fetch(`http://localhost:5000/myActivities/${id}`,{
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(updTask)
})
  const data = await res.json()

   setMyActvities(
     myActivities.map((task) => 
     task.id === id ? {...task, reminder: data.reminder} : task 
   ) 
  )
}



  return (
    <Router>
    <div className= "container">
      <Header 
      onAdd={()=> setShowAddTask (!showAddTask)} showAdd={ showAddTask }
      />

      <Routes>
      <Route path='/' element={
           <>
     { showAddTask && <Addtask onAdd={ addTask }/>}        
        {myActivities.length > 0 ? (
        <Tasks myActivities={myActivities} onDelete={ deleteTask }  onToggle={ toggleReminder } />
      ) : (
        'No task To show'
      )}
        </>
      } />
      <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  )
}

export default App;
