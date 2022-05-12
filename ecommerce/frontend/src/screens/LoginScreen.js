import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Massage from '../components/Massage'
import { login } from '../actions/userAction'

function LoginScreen() {

    const { search } = useLocation()
    const redirect = search ? search.split('=')[1] : '/'
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {error, loadnig, userInfo} = userLogin

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=> {
      if(userInfo) {
        navigate(redirect)
      }
    }, [userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
  
    return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Massage variant='danger'>{error}</Massage>}
      {loadnig && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Sign in</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>  
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
