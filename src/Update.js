import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import { Redirect, useParams } from 'react-router-dom'
import { useParams, useHistory } from "react-router-dom"

const Copy = () => {
    const [username, setusername] = useState('')
    const [email, setEmail] = useState('')
        const [phonenumber, setphonenumber] = useState('')
    const token = localStorage.getItem("token");
    const { id } = useParams();
    let history = useHistory()

    const submitForm = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        data()
    }, [])
    function data() {
        if(id === null || id === undefined){
            return false;
        }else{
            axios.get(`http://localhost:8080/api/${id}`, { headers: { 'x-access-token': token } }).then((res) => {
                setusername(res.data.user.username)
                setEmail(res.data.user.email)
                setphonenumber(res.data.user.phonenumber)
                console.log("hbhj", res)
            })
        }
    }
    function updatebackenddat() {

        let item = {
            username: username,
            email: email,
            phonenumber: phonenumber,
        }
        axios.put(`http://localhost:8080/edit/${id}`, item, { headers: { 'x-access-token': token } }).then((res) => {
            console.log("data", res)
        })
        history.push('/table')

    }


    return (

        <>
            <p class="oo" ><span>Information Form</span></p>

            <form class="MM" onSubmit={submitForm}>
                <div class="bb">
                    <label htmlfor='name'>Enter Your Name:</label>
                    <input required type='text' name='name' value={username} onChange={(e) => setusername(e.target.value)}></input>
                    <br />
                </div>
                <br />
                <div class='A'>
                    <lable htmlFor='email'> Email:  </lable>
                    <input required type='text' name='email' autoComplete='off'
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <br />
                <div class='A'>
                    <lable htmlFor='phone'> Phone  </lable>
                    <input required type='number' name='phone' autoComplete='off'
                        value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} />
                </div>
                <br />
                <Button type='button' class='btn btn-success'>
                    <button type='submit' onClick={updatebackenddat}>Submit</button>
                </Button>
            </form>
            <br />


        </>
    )


}


export default Copy;
