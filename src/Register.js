/* eslint-disable default-case */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import axios from 'axios'
import { omit } from 'lodash'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Material = () => {

    // eslint-disable-next-line no-unused-vars
    const [username, setUsername] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [phonenumber, setPhonenumber] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        username: '',
        email: "",
        phonenumber: "",
        password: ''
    });
    const { id } = useParams()
    let history = useHistory();

    useEffect(() => {
        getuser()


    }, [])

    const getuser = () => {
        // console.log("id----------", id)
        if (id === undefined || id === null) {
        } else {
            axios.get(`http://localhost:8080`).then((result) => {
                console.log("result.data", result)
                if (result.data.success === true) {
                    setUsername(result.data.user.username)
                    setEmail(result.data.user.email)
                    setPhonenumber(result.data.user.phonenumber)
                } else {
                    return;
                }

            })
        }
    }
    const handleClick = () => {
        let item = {
            username: values.username,
            email: values.email,
            phonenumber: values.phonenumber,
            password: values.password
        }
        console.log(item)
        axios.post("http://localhost:8080", item).then((res) => {
        })
        // history.push('/table')
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const validate = (event, name, value) => {
        //A function to validate each input values

        switch (name) {
            case 'username':
                if (!new RegExp(/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        username: 'Username atleast have 3 letters'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "username");
                    setErrors(newObj);

                }
                break;
            case 'phonenumber':
                if (!new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        phonenumber: 'Phonenumber atleast have 10 or <=15 digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "phonenumber");
                    setErrors(newObj);

                }
                break;
            case 'password':
                if (!new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        password: 'Password atleast have 10 or <=15 digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;
            case 'email':
                if (
                    !new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address just like xyz2@gmail.com'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
        }
    }

    const handleChange = (event) => {
        //To stop default events    
        event.persist();
        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);
        setValues({
            ...values,
            [name]: val,
        })
    }
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }


    return (
        <div>
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Register Form</h2>
                    </Grid>
                    <form>
                        <TextField name='username' fullWidth label='Username' value={values.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username} />
                        <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                        <TextField name='phonenumber' fullWidth label='Phonenumber' value={values.phonenumber} onChange={handleChange} error={Boolean(errors.phonenumber)} helperText={errors.phonenumber} />
                        <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} />
                        <br />
                        <br />
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Button variant="outlined" onClick={handleClick}> <Link to='/'>submit </Link></Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    This is a success message!
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default Material