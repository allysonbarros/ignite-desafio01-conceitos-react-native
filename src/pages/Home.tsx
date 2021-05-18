import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
      const task = { id: new Date().getTime(), title: newTaskTitle, done: false};
      setTasks([...tasks, task]);
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const task = tasks.find(item => item.id === id);
    if (task !== undefined) {
      task.done = !task.done;
      setTasks([...tasks]);
    }
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(x => x.id !== id);
    setTasks([...newTasks]);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}