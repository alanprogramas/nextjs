'use client';
// src/app/page.tsx
import { useState } from "react";
import styles from './Home.module.css';

export default function Home() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  const deleteTask = (task: string) => {
    setTasks(tasks.filter((t) => t !== task));
    setCompletedTasks(completedTasks.filter((t) => t !== task));
  };

  const completeTask = (task: string) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter((t) => t !== task));
      setTasks([...tasks, task]);
    } else {
      setTasks(tasks.filter((t) => t !== task));
      setCompletedTasks([...completedTasks, task]);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>FocalPoint</div>
        <h1>Bem-vindo de volta, Marcus</h1>
        <div id="current-date">01 de dezembro de 2025</div>
      </header>

      <main className={styles.main}>
        <div className={styles.taskContainer}>
          {tasks.length > 0 && <p>Suas tarefas de hoje</p>}
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={() => completeTask(task)}
                />
                <span>{task}</span>
                <button onClick={() => deleteTask(task)}>&#128465;</button>
              </li>
            ))}
          </ul>

          {completedTasks.length > 0 && <p>Tarefas finalizadas</p>}
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked
                  onChange={() => completeTask(task)}
                />
                <span className={styles.taskDone}>{task}</span>
                <button onClick={() => deleteTask(task)}>&#128465;</button>
              </li>
            ))}
          </ul>

          {tasks.length === 0 && completedTasks.length === 0 && (
            <div>Nenhuma tarefa adicionada ainda</div>
          )}
        </div>
        <button className={styles.addTaskBtn} onClick={addTask}>
          Adicionar nova tarefa
        </button>
      </main>
    </>
  );
}
