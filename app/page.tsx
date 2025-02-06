"use client";

import { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const addTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const taskText = (e.target as HTMLInputElement).value.trim();
      if (taskText) {
        setTasks([...tasks, { text: taskText, completed: false }]);
        (e.target as HTMLInputElement).value = "";
      } else {
        alert("Please enter a task!");
      }
    }
  };

  const filterTasks = (tasks: Task[], filter: string) => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  const toggleCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl text-center text-gray-800 mb-6">Todo List</h1>
      <input
        type="text"
        onKeyDown={addTask}
        placeholder="Add a task"
        className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-gray-400"
      />
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setFilter("all")}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none border-blue-600"
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400 focus:outline-none border-gren-500"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 focus:outline-none borded-yellow-400"
        >
          Pending
        </button>
      </div>
      <ul className="space-y-2">
        {filterTasks(tasks, filter).map((task, index) => (
          <li
            key={index}
            onClick={() => toggleCompletion(index)}
            className={`p-4 border-2 rounded-md cursor-pointer ${
              task.completed ? "bg-green-200 line-through" : "bg-yellow-200"
            } ${task.completed ? "text-gren-700" : "text-gray-800"}`}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
