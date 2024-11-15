import React, { useState, useEffect } from "react";
import InputArea from "./InputArea";
import ToDoItem from "./ToDoItem";

function App() {
  // Load items from localStorage or use an empty array if nothing is found
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("todoItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Update localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);

  function addItem(inputText) {
    setItems((prevItems) => [...prevItems, inputText]);
  }

  function deleteItem(id) {
    setItems((prevItems) => prevItems.filter((_, index) => index !== id));
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
