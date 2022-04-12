import Task from "./Task";
const Tasks = ({ myActivities,onDelete , onToggle }) =>{
    return (
    <>
     {myActivities.map((task, index) => (<Task key={index} task={task} onDelete={ onDelete } onToggle={onToggle} />))}
    </>
    )
}

export default Tasks;