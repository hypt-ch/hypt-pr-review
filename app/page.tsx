"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Task = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [filter, setFilter] = useState<string>("all");

  console.log("Home render");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const toggleCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl text-center text-gray-800 mb-6">Todo List</h1>
      <TaskInput addTask={addTask} />
      <FilterButtons setFilter={setFilter} filter={filter} />
      <TaskList
        tasks={tasks}
        toggleCompletion={toggleCompletion}
        removeTask={removeTask}
        filter={filter}
      />
    </div>
  );
}

const TaskInput = ({
  addTask,
}: {
  addTask: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      onKeyDown={addTask}
      placeholder="Add a task"
      className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-gray-400"
    />
  );
};

const FilterButtons = ({
  setFilter,
  filter,
}: {
  setFilter: (filter: string) => void;
  filter: string;
}) => {
  console.log("FilterButtons render");
  return (
    <div className="flex justify-center mb-4 space-x-4">
      <FilterButton text="All" filter={filter} setFilter={setFilter} />
      <FilterButton text="Completed" filter={filter} setFilter={setFilter} />
      <FilterButton text="Pending" filter={filter} setFilter={setFilter} />
    </div>
  );
};

const FilterButton = ({
  text,
  filter,
  setFilter,
}: {
  text: string;
  filter: string;
  setFilter: (filter: string) => void;
}) => {
  const colors: Record<string, string> = {
    all: "border-blue-600 bg-blue-500 hover:bg-blue-500 hover:border-blue-600",
    completed:
      "border-green-600 bg-green-500 hover:bg-green-500 hover:border-green-600",
    pending:
      "border-yellow-600 bg-yellow-500 hover:bg-yellow-500 hover:border-yellow-600",
  };

  console.log("FilterButton render");

  return (
    <button
      onClick={() => setFilter(text.toLowerCase())}
      className={`py-2 px-4 rounded-md border-2 ${
        filter === text.toLowerCase()
          ? colors[text.toLowerCase()] + " text-white"
          : "border-gray-300 text-gray-800"
      } focus:outline-none`}
    >
      {text}
    </button>
  );
};

const TaskList = ({
  tasks,
  toggleCompletion,
  removeTask,
  filter,
}: {
  tasks: Task[];
  toggleCompletion: (index: number) => void;
  removeTask: (index: number) => void;
  filter: string;
}) => {
  const filterTasks = (tasks: Task[]) => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  return (
    <ul className="space-y-2">
      {filterTasks(tasks).map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          toggleCompletion={toggleCompletion}
          removeTask={removeTask}
        />
      ))}
    </ul>
  );
};

const TaskItem = ({
  task,
  index,
  toggleCompletion,
  removeTask,
}: {
  task: Task;
  index: number;
  toggleCompletion: (index: number) => void;
  removeTask: (index: number) => void;
}) => {
  return (
    <li
      className={`p-4 border-2 transition-colors rounded-md cursor-pointer flex justify-between items-center ${
        task.completed ? "bg-green-200" : "bg-yellow-200"
      } ${task.completed ? "text-green-700" : "text-gray-800"}`}
      onClick={() => toggleCompletion(index)}
    >
      <span className={task.completed ? "line-through" : undefined}>
        {task.text}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeTask(index);
        }}
        className="ml-4 p-1.5 transition-colors border-slate-900 text-slate-900 hover:text-white hover:bg-red-500 hover:border-red-500 rounded-md flex items-center"
      >
        <Image src="/thrash.svg" alt="Remove" width={16} height={16} />
      </button>
    </li>
  );
};
