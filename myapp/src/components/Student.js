import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default () => {

    const [students, setstudents] = useState({})
    const [name, setname] = useState('')
    const [surname, setsurname] = useState('')
    const [id, setid] = useState(0)

    useEffect(() => {
        getstudents()
    }, [])

    const getstudents = async () => {
        const result = await axios.get(`http://localhost/api/students`)
        console.log(result.data)
        setstudents(result.data)
    }

    const addstudent = async () => {
        const result = await axios.post(`http://localhost/api/students`, {
            name,
            surname,
            id
        })
        console.log(result.data)
        getstudents()
    }

    const getstudent = async (list) => {
        const result = await axios.get(`http://localhost/api/students/${list}`)
        console.log(result.data)
        setname(result.data.name)
        setsurname(result.data.surname)
        setid(result.data.id)
    }
    const updatestudent = async (list) => {
        const result = await axios.put(`http://localhost/api/students/${list}`, {
            name,
            surname,
            id
        })

        console.log(result.data)
        setname(result.data.name)
        setsurname(result.data.surname)
        setid(result.data.id)
        getstudents()
    }

    const delstudent = async (list) => {
        const result = await axios.delete(`http://localhost/api/students/${list}`)
        getstudents()
    }

    const printstudents = () => {
        if (students && students.length)
            return students.map((student, index) => {
                return (
                    <li key={index}>
                        {student.name}: {student.surname} : {student.id}
                        <button onClick={() => getstudent(student.list)}> Get </button>
                        <button onClick={() => delstudent(student.list)}> Del </button>
                        <button onClick={() => updatestudent(student.list)}> Update </button>
                    </li>
                )
            })
        else {
            return (<h2> No student </h2>)
        }

    }

    return (
        <div>
            Students
            <ul>
                {printstudents()}
            </ul>
            <h2>Get student</h2>
            Get: {name} : {surname} : {id}

            <h2>Add student</h2>
            name:
            <input
                placeholder="name"
                type="text"
                name="name"
                onChange={(e) => setname(e.target.value)}
            /> <br />
            surname:
                <input
                placeholder="surname"
                type="text"
                name="surname"
                onChange={(e) => setsurname(e.target.value)}
            /> <br />
            id:
            <input
                type="text"
                name="id"
                onChange={(e) => setid(e.target.value)}
            /><br />
            <button onClick={addstudent}>Add </button>
        </div>
    )
}