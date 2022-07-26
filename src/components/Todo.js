import React, { useEffect } from 'react'
import './style.css'
import { useState } from 'react'

const getLocalData=()=>{
  const lists =localStorage.getItem("mytodolist")
  if(lists){
    return JSON.parse(lists)
  }
  return []
}
const Todo = () => {
  const[inputData,setInputData]=useState("")
  const[items,setItems]=useState(getLocalData())
  const [isEditItem,setisEditItem]=useState("")
  const[toggle,setToggle]=useState(false)

  const addItem=()=>{
    if(!inputData ){
      return;
    }
    else if(inputData && toggle) {
       setItems(items.map((item)=>{
        if(item.id===isEditItem){
          return {...item,name:inputData}
        }
        return item
       }))
       setInputData("")
       setisEditItem(null)
       setToggle(false) 
    }
    else{
    const myNewInput={
      id: new Date().getTime().toString(),
      name: inputData,
    }
    setItems([...items,myNewInput])
    setInputData("")
    }
  }
  const deleteItem=(index)=>{
    const updatedItems=items.filter((item)=>{return item.id !==index})
    setItems(updatedItems)
  }
  const removeAll=()=>{
    setItems([])
  }
  const editItem=(index)=>{
    const updated=items.find((item)=>{return item.id===index})
    setInputData(updated.name)
    setisEditItem(index)
    setToggle(true)
  }
  useEffect(()=>{localStorage.setItem("mytodolist",JSON.stringify(items))},[items])
  return (
    <>
    <div className='main-div'>
      <div className='child-div'>
        <figure>
          <img src="./todo.svg" alt="todo logo"/>
          <figcaption>Add your list here</figcaption>
        </figure>
        <div className='addItems'>
          <input type="text" placeholder='✍️Add item....' className='form-control' value={inputData} onChange={(e)=>{setInputData(e.target.value)}}/>
          {toggle ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i> }
        </div>
        <div className='showItems'>
        {
          items.map((item)=>{
            return(
            <>
              <div className='eachItem' key={item.id}>
                <h3>{item.name}</h3>
               <div className='todo-btn'>
                 <i className="far fa-edit add-btn" onClick={()=>{editItem(item.id)}}></i>
                 <i className="far fa-trash-alt add-btn" onClick={()=>{deleteItem(item.id)}}></i>
               </div>
              </div>
            </>
            )
          })
        }
        </div>
        <div className='showItems'>
          <button className='btn effect04' data-sm-link-text="REMOVE ALL" onClick={removeAll}>
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Todo