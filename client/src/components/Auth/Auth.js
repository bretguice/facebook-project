import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Avatar, Box, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';

import { AUTH } from '../../constants/actionTypes';
import Input from './Input';
import Icon from './Icon';
// import { signin, signup } from '../../features/asyncThunk';
import { signin, signup } from '../../actions/auth';

const Auth = () => {
    const [ isSignup, setIsSignup ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false);
    const [ formData, setFormData ] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (isSignup){
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    };

    // const googleSuccess = async (res) => {
    //     const result = jwt_decode(res.credential)
    //     const token = result.jti;
        
    //     try{
    //         dispatch({ type: AUTH, data: { result, token }});
    //         history('/');
    //     } catch (error) {
    //         console.log(error);
    //     } 
        
    // }

    // const googleFailure = (err) => {
    //     console.log(err);
    //     console.log('Google Sign In was unsucessful. Try again later.')
    // }

  return (
    <Container component='main' maxWidth='xs' >
        <Paper className={'paper'} elevation={3} >
            <Avatar className={'avatar'}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={'form'} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                        <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autofocus half />
                            <Input name='lastName' label='Last Name' handleChange={handleChange}  half />
                        </>
                    )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={'submit'}>
                    { isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                {/* <GoogleLogin  
                    clientId='636139791510-22pas2t4lphqs4ue4pd6icuade3pqt5r.apps.googleusercontent.com'
                    width='100'
                    render={(renderProps) => (
                        <Button className={'googleButton'} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                /> */}
                <Box container justifyContent='center'>
                    
                        <Button variant='solid' color='green' onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign In' : "Create New Account" }
                        </Button>
                 
                </Box>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth