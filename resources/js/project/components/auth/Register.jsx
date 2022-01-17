import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register, uploadUserpic } from '../../api'
import InfoBlock from '../common/InfoBlock'
import setFormObject from '../common/FormUtils'


const initialData = {
    login: '',
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
    userpic: ''
}


const Register = () => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [tmpUserpic, setTmpUserpic] = useState('')
    const userpicInput = useRef()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validate(data)
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            register(data)
            .then(response => {
                navigate('/login', {
                    state: {
                        success: response.data.message
                    }
                })
            })
            .catch(error => {
                console.log(error)
                if (error.response) {}
                setErrors(error.response.data.errors)
            })
        }
    }

    const validate = (data) => {
        const errors = {}

        if (!data.login) errors.login = 'Login cannot be blank'
        if (!data.email) errors.email = 'Email cannot be blank'
        if (!data.phone) errors.phone = 'Phone cannot be blank'
        if (!data.password) errors.password = 'Password cannot be blank'
        if (!data.confirmPassword)
            errors.confirmPassword = 'Please, confirm password'
        if (data.password != data.confirmPassword) errors.confirmPassword = 'password and confirmation should match'

        return errors
    }

    const handleUserpic = (e) => {
        const file = e.target.files[0] 
        uploadUserpic(file)
        .then(response => {
            if (response.data.status && response.data.status === 'success') {
                setData({...data, userpic: response.data.file_name})
                setTmpUserpic(`/storage/tmp/${response.data.file_name}`)
            }
        })
        .catch(error => {
            console.log(error.response)
        }) 
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <h1 className="text-center">Sign Up</h1>
                    {Object.keys(errors).length > 0 && (
                        <InfoBlock errors={errors} />
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login" className="small-text">Login:</label>
                            <input
                                type="text"
                                className={
                                    errors.login
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="login"
                                name="login"
                                value={data.login}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name" className="small-text">First Name:</label>
                            <input
                                type="text"
                                className={
                                    errors.first_name
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="first_name"
                                name="first_name"
                                value={data.first_name}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name" className="small-text">Last Name:</label>
                            <input
                                type="text"
                                className={
                                    errors.last_name
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="last_name"
                                name="last_name"
                                value={data.last_name}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="small-text">E-mail:</label>
                            <input
                                type="email"
                                className={
                                    errors.email
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="small-text">Phone:</label>
                            <input
                                type="text"
                                className={
                                    errors.phone
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                         <div className="form-group">
                            <label htmlFor="userpic" className="small-text">Userpic:</label>
                            <label 
                                htmlFor="userpic" 
                                className={data.userpic ? 'd-none' : 'd-block'}
                            >
                                <div className="small-text">
                                    <em>Only jpg, jpeg, png, jpg, gif, webp or svg with maximum size of 128Kb are allowed!</em>
                                </div>
                                <button 
                                    className="btn light_btn"
                                    type="button"
                                    onClick={() => userpicInput.current.click()}
                                >
                                    Upload
                                </button>
                            </label>
                            <input
                                type="file"
                                className="d-none"
                                id="userpic-input"
                                name="userpic-input"
                                ref={userpicInput}
                                onChange={handleUserpic}
                            />
                            <div className={tmpUserpic ? 'author-avatar' : 'd-none'}>
                                <img alt="" src={tmpUserpic}  className="avatar photo" loading="lazy" />
                            </div>
                            </div>
                        <div className="form-group">
                            <label htmlFor="password" className="small-text">Password:</label>
                            <input
                                type="password"
                                className={
                                    errors.password
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                                }
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="small-text">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                className={
                                    errors.confirmPassword
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="confirmPassword"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn action_btn"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
