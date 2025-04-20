import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTheme } from "./ThemeContext";

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const newTask = { id: Date.now(), text: "", completed: false, priority: "low" };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);
    setTasks(newTasks);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <button onClick={toggleTheme}>Toggle Dark Mode</button>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided,snapshot) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tasks
                .filter(task => task.text.includes(search))
                .map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <input
                          type="text"
                          value={task.text}
                          onChange={(e) => updateTask(task.id, e.target.value)}
                        />
                        <button onClick={() => toggleComplete(task.id)}>
                          {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoPage;