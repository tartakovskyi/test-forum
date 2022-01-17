import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import InfoBlock from '../common/InfoBlock'
import setFormObject from '../common/FormUtils'


const initialData = {
    email: '',
    password: ''
}

const Login = (props) => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const location = useLocation()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validate(data)
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            axios
                .post('/login', data)
                .then(function (response) {
                    localStorage.setItem('token', response.data.token)
                    props.setIsLogged(true)
                    const nextPath = location.state && location.state.success ? '/' : -1
                    navigate(nextPath)
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        setErrors({ credentials: 'Invalid login or password' })
                    }
                    console.log(error)
                })
        }
    }

    const validate = (data) => {
        const errors = {}

        if (!data.email) errors.email = 'Email cannot be blank'
        if (!data.password) errors.password = 'Password cannot be blank'

        return errors
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <h1 className="text-center">Sign In</h1>
                    {Object.keys(errors).length > 0 && (
                        <InfoBlock errors={errors} />
                    )}
                    {location.state && location.state.success && (
                        <InfoBlock success={location.state.success} />
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn action_btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
