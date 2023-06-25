import React, { useEffect, useState } from 'react'
import Modal from '../../Modal/Modal'
import './CardInfo.css'
import { FiType } from 'react-icons/fi'
import { BiTask } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { BsCalendar2Date } from 'react-icons/bs'
import Editable from '../../Editable/Editable'
import { AiOutlineUnorderedList } from 'react-icons/ai'
const CardInfo = (props) => {
    const { title, desc, date, tasks } = props.card
    const [values, setValues] = useState({ ...props.card });

    const addTask = (value) => {
        const task = {
            id: Date.now() + Math.random(),
            text: value,
            completed: false
        }
        setValues({ ...values, tasks: [...values.tasks, task] })
    }

    const removeTask = (id) => {
        const index = values.tasks?.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempTasks = values.tasks?.splice(index, 1)
        setValues({ ...values, tasks: tempTasks })
    }

    const calculatePercent = () => {
        if (values.tasks?.length == 0) return "0"
        const completed = values.tasks?.filter(item => item.completed)?.length
        return (completed / values.tasks?.length) * 100 + ""
    }
    useEffect(() => {
        props.updateCard(props.card.id, props.boardId, values)

    }, [values])

    const updateTask = (id, completed) => {
        const index = values.tasks?.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempTasks = [...values.tasks]
        tempTasks[index].completed = completed
        setValues({ ...values, tasks: tempTasks })

    }
    return (

        <Modal
            onClose={() => props.onClose()}

        >
            <div className='cardInfo'>
                <div className='cardInfo_box'>
                    <div className='cardInfo_box_title'>
                        <FiType />
                        Titile

                    </div>
                    <div className='cardInfo_box_body'>
                        <Editable
                            text={values.title}
                            default={values.title}
                            placeholder="Enter title"
                            buttonText="Set Title"
                            onSubmit={(value) => setValues({ ...values, title: value })}
                        />
                    </div>
                </div>
                <div className='cardInfo_box'>
                    <div className='cardInfo_box_title'>
                        <AiOutlineUnorderedList />
                        Description

                    </div>
                    <div className='cardInfo_box_body'>
                        <Editable
                            text={values.desc}
                            default={values.desc}
                            placeholder="Enter Description"
                            buttonText="Set Description"
                            onSubmit={(value) => setValues({ ...values, desc: value })}
                        />
                    </div>
                </div>

                {/* Date */}
                <div className='cardInfo_box'>
                    <div className='cardInfo_box_title'>
                        <BsCalendar2Date />
                        Date

                    </div>
                    <div className='cardInfo_box_body'>
                        <input type='date'
                            defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : " "}
                            onChange={(e) => setValues({ ...values, date: e.target.value })}
                        />

                    </div>
                </div>

                {/* Task */}
                <div className='cardInfo_box'>
                    <div className='cardInfo_box_title'>
                        <BiTask />
                        Tasks

                    </div>
                    <div className='cardInfo_box_progress-bar'>
                        <div className={`cardInfo_box_progress`}
                            style={{
                                width: calculatePercent() + "%",
                                backgroundColor: calculatePercent() === "100" ? "limegreen" : " "

                            }} />
                    </div>
                    <div className='cardinfo_box_list'>
                        {
                            values.tasks?.map((item) => (
                                <div key={item.id}
                                    className='cardinfo_task'>
                                    <input type='checkbox'
                                        defaultValue={item.completed}
                                        onChange={(e) => 
                                    updateTask(item.id, e.target.checked)}

                                    />
                                    <p>{item.text}</p>
                                    <BsTrash onClick={() => removeTask(item.id)} />
                                </div>
                                ))};


                    </div>
                    <div className='cardInfo_box_body'>
                        <Editable
                            text="Add new Task"
                            placeholder="Enter Task"
                            buttonText="Add Task"

                            onSubmit={(value) => addTask(value)}
                        />
                    </div>
                </div>




            </div>


        </Modal>

    )
}

export default CardInfo
