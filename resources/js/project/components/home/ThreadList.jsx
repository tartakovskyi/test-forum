import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { destroyThread } from '../../api'
import InfoBlock from '../common/InfoBlock'
import Userpic from '../common/Userpic'


function ThreadList({ auth, counter, threads, editThread }) {

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const destroy = id => {
    destroyThread(id)
    .then(response => {
      if (response.status === 200 && response.data.status === 'success') {
        counter()
        if(response.data.info) {
          setMessage(response.data.info)
          setTimeout(() => setMessage(''), 1500)
        }
      }
    })
    .catch(function (error) {
      if(error.response && error.response.data && error.response.data.errors) {
        const errors = {}
        Object.keys(error.response.data.errors).forEach(key => errors[key] = error.response.data.errors[key][0])
        setErrors(errors)
      } else if(error.response && error.response.status && error.response.status === 401) {
        setErrors({auth:'You must be logged in'})
      }
    })
  }

  return (
    <div className="community-posts-wrapper bb-radius">
    {Object.keys(errors).length > 0 && <InfoBlock errors={errors} />}
    {message && <InfoBlock success={message} />}
    {threads && threads.map(thread => (
      <div className="community-post style-two" key={thread.id}>
        <div className="post-content">
          <Userpic user={thread.user} />
          <div className="entry-content">
            <h3 className="post-title">
              <Link to={'/thread/' + thread.id}>
                {thread.title}
              </Link>
            </h3>
            <ul className="meta">
              <li><i className="icon_calendar"></i> {thread.created_at}</li>
            </ul>
          </div>            
        </div>
        <div className="post-meta-wrapper">
          <ul className="post-meta-info">
            {auth && (auth.id === thread.user.id || auth.role_id == 1) &&
            <>
              <li className="post-meta-count">
                <span className="link" onClick={() => destroy(thread.id)}>Delete</span>
              </li>
              <li className="post-meta-count">
                <span className="link" onClick={() => editThread({ id: thread.id, title: thread.title })}>Edit</span>
              </li>
            </>
            }            
            <li className="post-meta-count">
              <Link to={'/thread/' + thread.id}>
                <i className="icon_chat_alt"></i> {thread.posts_count}
              </Link>
            </li>
          </ul>            
        </div>
      </div>        
    ))}
    </div>
  )
}


const mapStateToProps = function ({ user }) {
  return { 
    auth: user.auth
  }
}


export default connect(mapStateToProps)(ThreadList)