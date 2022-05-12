import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Massage from '../components/Massage'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loadnig, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const [name, setName] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    useEffect(()=> {
      if(!userInfo) {
        navigate('/login')
      }else{
          if(!user || !user.name || success ){
              dispatch({type: USER_UPDATE_PROFILE_RESET})
              dispatch(getUserDetails('profile'))
          }else{
                setName(user.name)
                setEmail(user.email)
          }
      }
    }, [dispatch, userInfo, user, success ])
    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmpassword){
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({
                'id': name._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }
    }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm Password' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Update</Button>

        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
