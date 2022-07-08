import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { signin, signup, testDrive, getPosts, getUsers } from '../../features/asyncThunk';
import Loading from '../../components/Loading/Loading';

const Auth = () => {
    const [ isSignup, setIsSignup ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ formData, setFormData ] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const authLoading = useSelector((state) => state.auth.loading);
    const postLoading = useSelector((state) => state.posts.loading);
    const userLoading = useSelector((state) => state.users.loading);
    const loading = (authLoading || postLoading || userLoading); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleTestDrive = () => {
        dispatch(testDrive({email: 'test@test.com'})).unwrap()
            .then(() => dispatch(getPosts()))
            .then(() => dispatch(getUsers()))
            .then(() => navigate('/'));
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (isSignup){
            dispatch(signup(formData)).unwrap()
            .then(() => dispatch(getPosts()))
            .then(() => dispatch(getUsers()))
            .then(() => navigate('/'));        
        } else {
            dispatch(signin(formData)).unwrap()
            .then(() => dispatch(getPosts()))
            .then(() => dispatch(getUsers()))
            .then(() => navigate('/'));
        }
    };

  return (
    <Container component='main' maxWidth='xs' >
        <Paper className={'paper'} elevation={3} >
            <Avatar className={'avatar'}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={'form'} onSubmit={(e) => handleSubmit(e)}>
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
                <br></br>
                {/* <Button variant='contained' fullWidth color='secondary' onClick={handleTestDrive}>
                    Test Drive
                </Button> */}
                <Box container justifyContent='center'>                  
                    <Button variant='solid' color='green' onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign In' : "Create New Account" }
                    </Button>
                </Box>
            </form>
        </Paper>

                    <Loading loading={loading} />
                   
    </Container>
  )
}

export default Auth