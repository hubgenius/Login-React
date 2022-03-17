/* eslint-disable default-case */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField} from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import axios from 'axios'
import {omit} from 'lodash'
import Alert from '@mui/material/Alert';

const For = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    
    // const { id } = useParams()
    let history = useHistory();
    useEffect(()=>{
        localStorage.removeItem("token"); 
   },[])
    const postData = (e) => {
    //    e.preventdefault()
        let item = {
            // username: values.username,
            email:values.email,
            // phonenumber:values.phonenumber,
            password:values.password
        }
        console.log(item)
        axios.put(`http://localhost:8080/forget`,item).then((res) => {
           localStorage.setItem("token", res.data.token)
        //     if(res.data.success) {
        //     }
        //     console.log("updare", res)
        })
        history.push('/')
    }
   

    const validate = (event, name, value) => {
        //A function to validate each input values

        switch (name) {
            case 'password':
                if ( !new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        password: 'passwordatleast have 10 to 15  digits'
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
            [name]:val,[email]:val,[password]:val
        })
    }
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const marginTop = { marginTop: 5 }


 return (
    <div>
        
       <Grid>
         <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
               <h2> Forfet Password</h2>
             </Grid>
              <form>
                   <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                   <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} />
                    <br />
                    <br />
                   
              <Grid align='center'>
                     <Button type='submit'  onClick={postData} >Submit</Button>
                     <Grid>
                  <Link to='/For'> forget Password  </Link>   
                </Grid>
              </Grid>
              <br/>
                <Grid>
                  <Link to='/l'> New Register   </Link>   
                </Grid>
        </form>
       </Paper>
      </Grid>
     </div>
    )
}

export default For