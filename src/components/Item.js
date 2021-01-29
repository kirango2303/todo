import React from 'react'

const Item = (props) => {
    const {task, id, onDeleteItem, onEditItem, completed} = props



    return (
        <div>
            <li> {task} {completed}
            <button id = {id} onClick={(e) => onDeleteItem(e, id)}> Delete </button>
            <button id = {id} onClick={(e) => onEditItem(e, id)}> Edit </button>
            </li>   
        </div>
    )
}

export default Item