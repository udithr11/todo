import React, { useState, useRef, useEffect } from "react";
import { MdEditDocument, MdDelete } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  }, [todo]);

  const addTodo = () => {
    if (todo) {
      setTodos([...todos, {list:todo,id:Date.now(),status:false}]);
      setTodo("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  }

  const onDelete = (id)=>{
    setTodos(todos.filter((t)=>t.id!==id))

  }

  const onDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, status: !t.status } : t
      )
    );
  };

  return (
    <div className="w-[40%] mt-20 bg-slate-200 mx-auto p-5 rounded-sm">
      <p className="text-2xl font-bold flex justify-center">to-do app</p>
      <div className="flex mt-5">
        <form onSubmit={(e) => e.preventDefault()} className="w-[100%]">
          <input
            placeholder="enter your text"
            type="text"
            className="border w-[100%] border-black p-1 rounded-sm justify-center"
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
        </form>
        <button
          className="mx-1 p-1 bg-black border font-semibold text-white rounded-sm border-black"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul className="mt-3 ">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`border my-2 p-1 flex items-center  justify-between border-black rounded-sm break-all ${
                todo.status ? 'line-through opacity-50  border-green-500' : ''
              }`}
          >
            {todo.list}
            <span className="flex justify-end items-center m-2">
              <MdEditDocument
                className="text-blue-900 mx-1"
                id="edit"
                title="edit"
              />
              <MdDelete
                className="text-red-400 mx-1"
                id="delete"
                title="delete"
                onClick={()=>onDelete(todo.id)}
              />
              <MdFileDownloadDone
                className="text-green-500"
                id="done"
                title="done"
                onClick={()=>onDone(todo.id)}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
