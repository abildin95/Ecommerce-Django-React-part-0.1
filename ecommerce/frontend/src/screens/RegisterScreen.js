import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Massage from '../components/Massage'
import { register } from '../actions/userAction'

function RegisterScreen() {

    const { search } = useLocation()
    const redirect = search ? search.split('=')[1] : '/'
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {error, loadnig, userInfo} = userRegister

    const [name, setName] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    useEffect(()=> {
      if(userInfo) {
        navigate(redirect)
      }
    }, [userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmpassword){
            setMessage('Password do not match')
        }
        dispatch(register(name, email, password))
    }
  
  return (
    <FormContainer>
        <h1>Register</h1>
        {message && <Massage variant='danger'>{message}</Massage>}
        {error && <Massage variant='danger'>{error}</Massage>}
        {loadnig && <Loader />}
        <Form onSubmit={submitHandler}>
        
        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control required type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control required type='password' placeholder='Confirm Password' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Register</Button>

        </Form>

        <Row className='py-3'>
        <Col>
          Have a account? <Link to={redirect ? `/login?riderect=${redirect}` : '/login'}>Sign In</Link>
        </Col>  
      </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen
