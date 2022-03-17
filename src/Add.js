// / eslint-disable default-case /

import React, { useState  } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useHistory ,Link } from "react-router-dom"
import axios from 'axios'
import { omit } from 'lodash'
import Alert from '@material-ui/lab/Alert'
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Material = () => {
    const [user,setuser] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [username, setUsername] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [phonenumber, setPhonenumber] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        email: "",
        phonenumber: "",
        // password: ''
    });

    
    let history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        let item = {
            username: values.username,
            email: values.email,
            phonenumber: values.phonenumber,
            // password: values.password
        }
        console.log(item)
        let token = localStorage.getItem('token')
        axios.post("http://localhost:8080/add", item,{ headers:{'x-access-token':token}}).then((res) => {
            console.log("Adduser", res)
        })
        history.push('/table')
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    // const postData = () => {
    //     let FD = new FormData();
    //     FD.append('username', username);
    //     FD.append('phonenumber', phonenumber);
    //     FD.append('email', email);
    //     FD.append('password', password);
    //     axios.post('http://localhost:8000/', FD)
    //     history.push("/")
    // } 
    // function postData() {
    //     let item = {
    //         username: values.username,
    //         email: values.email,
    //         phonenumber: values.phonenumber,
    //         password: values.password
    //     }
    //     console.log(item)
    //     axios.post("http://localhost:7005", item).then((res) => {
    //         console.log("updare", res)
    //     })
    //     history.push('/')
    //     alert('register succefuuly')

    // }


    const validate = (event, name, value) => {


        // eslint-disable-next-line default-case
        switch (name) {
            case 'username':
                if (!new RegExp(/([a-zA-Z]{3,20})/).test(value)) {
                    setErrors({
                        ...errors,
                        username: 'Username atleast have 3 letters'
                    })
                } else {
                    let newObj = omit(errors, "username");
                    setErrors(newObj);
                }
                break;
            case 'phonenumber':
                if (!new RegExp(/^((\+)?(\d{2}[-]))?/).test(value)) {
                    setErrors({
                        ...errors,
                        phonenumber: 'Phonenumber atleast have 10'
                    })
                } else {

                    let newObj = omit(errors, "phonenumber");
                    setErrors(newObj);

                }
                break;
            // case 'password':
            //     if (!new RegExp(/^((\+)?(\d{2}[-]))/).test(value)) {
            //         setErrors({
            //             ...errors,
            //             password: 'Password atleast have 8'
            //         })
            //     } else {

            //         let newObj = omit(errors, "password");
            //         setErrors(newObj);

            //     }
            //     break;
            case 'email':
                if (
                    !new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address just like mailto:xyz2@gmail.com'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
        }
    }

    const handleChange = (event) => {

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
                        <h2> Adduser Form</h2>
                    </Grid>
                    <form>
                        <TextField name='username' fullWidth label='Username' value={values.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username} />
                        <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                        <TextField name='phonenumber' fullWidth label='Phonenumber' value={values.phonenumber} onChange={handleChange} error={Boolean(errors.phonenumber)} helperText={errors.phonenumber} />
                        {/* {/ <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} /> /} */}
                        <br />
                        <br />
                        {/* {/ <Button type='submit' class='btn btn-info' onClick={postData}>Submit</Button> /} */}
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Button variant="outlined" onClick={handleClick}>
                               <Link to='/'>Submit</Link> 
                               {/* {/ Submit /} */}
                            </Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                   User Add Successfully
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