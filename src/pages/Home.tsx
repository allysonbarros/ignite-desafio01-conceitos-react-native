import React, { useState } from 'react';
import { Alert } from "react-native";

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
      const taskAlreadyExists = tasks.find(task => task.title == newTaskTitle);

      if (taskAlreadyExists !== undefined) {
        Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome",
        );
      } else {
        const task = { id: new Date().getTime(), title: newTaskTitle, done: false };
        setTasks([...tasks, task]);
      }
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const task = tasks.find(item => item.id === id);
    if (task !== undefined) {
      task.done = !task.done;
      setTasks([...tasks]);
    }
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const task = tasks.find(item => item.id === taskId);
    if (task !== undefined) {
      task.title = taskNewTitle;
      setTasks([...tasks]);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: (() => {
            const newTasks = tasks.filter(x => x.id !== id);
            setTasks([...newTasks]);
          })
        }
      ]
    );
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        editTask={handleEditTask}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  )
}