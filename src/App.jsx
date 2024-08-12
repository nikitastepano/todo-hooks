import { useState } from 'react'

import './index.css'

import { NewTaskForm } from './components/NewTaskForm'
import { TaskList } from './components/TaskList'
import { Footer } from './components/Footer'

export default function App() {

  const [data, setData] = useState([])

  return (
    <section className="todoapp">
      <NewTaskForm setData={setData} />
      <section className="main">
        <TaskList data={data} setData={setData} />
        <Footer data={data} setData={setData} />
      </section>
    </section>
  )
}