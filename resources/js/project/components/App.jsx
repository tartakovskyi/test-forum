import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAuthAction, logoutAction } from '../store/actions/userAction'
import Login from './auth/Login'
import Register from './auth/Register'
import Navigation from './common/Navigation'
import HomePage from './home/HomePage'
import ThreadPage from './thread/ThreadPage'


function App({ auth, getAuthAction, logoutAction }) {

  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
      if (auth === null) {
          getAuthAction()
      }
  }, [auth, isLogged, getAuthAction])

  const logout = () => {
      localStorage.removeItem('token')
      logoutAction()
      setIsLogged(false)
  }

  return (
    <>
      <Navigation logout={logout} />
      <main>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="/thread/:id" element={<ThreadPage />} />
          </Routes>
        </div>
      </main>
    </>
  )
}


const mapStateToProps = function ({ user }) {
  return {
    auth: user.auth,
  }
}

export default connect(mapStateToProps, { getAuthAction, logoutAction })(App)