import React, { useState, useRef, useEffect} from "react"
import './Todo.css';
import { Button, Form} from 'react-bootstrap';
import Item from '../Item'
import {db} from '../../services/firebase'
import { Link, useHistory } from 'react-router-dom'


const Todo = () => {
        const [value, setValue] = useState("")
        const [idCurrentUpdate, setIdCurrentUpdate] = useState(0)
        const taskRef = useRef()
        const taskUpdateRef = useRef()
        const [todoFromApi, setTodoFromApi] = useState([])
        const [invalidate, setInvalidate] = useState(true)
      
        useEffect(() => { // co cai gi thay doi trong [] chay lai ham nay
          if(invalidate){
            db.collection("ToDo").onSnapshot((snapShot) => {
              setTodoFromApi(snapShot.docs.map((doc) => ({id: doc.id, data:doc.data()})))
            })     
            setInvalidate(false) 
          }
        }, [invalidate])
      
        const onDeleteItem = (e, id) => {
          db.collection("ToDo").doc(id).delete()
          .then(() => console.log("deleted"))
          .catch(err => console.log(err))
        }
        
        const onEditItem = (e, id) => {
          const updatePersonIndex = todoFromApi.findIndex((item) => id == item.id)
          setIdCurrentUpdate(todoFromApi[updatePersonIndex].id)
        }
      
        const handleUpdateForm = (e, id) => {
          e.preventDefault()
          db.collection("ToDo").doc(id).update({
            title: taskUpdateRef.current.value,
          })
         setIdCurrentUpdate(0)
        }
      
      
        const handleSubmitForm = (e) => {
          e.preventDefault()
          db.collection("ToDo").add({
            title: taskRef.current.value,
            completed: false,
            id: todoFromApi.length +1
      
          })
          taskRef.current.value = ""
        }
      
        return (
          <div className="ToDoApp">
            
            <h1 style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>ToDo App</h1>
            
      
            <div style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              
              <input type="text" placeholder="Search for task" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
           

      
      
      
            <Form  onSubmit={(e) => handleSubmitForm(e)}>
                
                <Form.Control className="ToDoInput" type="text" ref ={taskRef} placeholder="I need to..." />
                <Button className="ToDo-Add"  type="submit" > Add new task</Button>
            </Form>
            
              {todoFromApi && todoFromApi
                .filter((todo) => (todo.data.title).toLowerCase().includes(value.toLowerCase()))
                .map((todo) => {
                return (
                  <>
                  
                  <Item onDeleteItem={onDeleteItem} onEditItem={onEditItem} id={todo.id} task={todo.data.title} completed={todo.data.completed} />
                  {idCurrentUpdate && idCurrentUpdate == todo.id ? (
                    <Form style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}} onSubmit={(e) => handleUpdateForm(e, todo.id)}>
                        <Form.Control type="text" ref={taskUpdateRef} placeholder={todo.data.title} />
                      <Button variant="primary" type="submit" > Edit </Button>
                    </Form>
                  ) : null}
                  </>
                  )
                  
              })}
             
      
            </div>
          
          
        );
      }
      
      export default Todo;
