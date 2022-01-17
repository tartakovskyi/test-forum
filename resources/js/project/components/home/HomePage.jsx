import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getThreads } from '../../api'
import { convertDate } from '../../helpers'
import ThreadForm from './ThreadForm'
import ThreadList from './ThreadList'
import ShowMoreBtn from '../common/ShowMoreBtn'


function HomePage({ auth }) {

  const [formThread, setFormThread] = useState(null)
  const [newThreadCounter, setNewThreadCounter] = useState(0)
  const [limit, setLimit] = useState(10)
  const [threads, setThreads] = useState([])
  const ref = useRef()

  useEffect(() => {
    getThreads(limit)
    .then(response => {
      let treadsArr = response.data.map(threadObj => {
        threadObj.created_at = convertDate(threadObj.created_at)
        return threadObj
      })
      setThreads(treadsArr)
    })
    .catch(error => {
      console.log(error)
    })
  }, [limit, newThreadCounter])


  const counter = () => {
    setNewThreadCounter(newThreadCounter + 1)
  }

  const editThread = thread => {
    setFormThread(thread)
    if (thread) ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  const showMore = () => {
    setLimit(limit + 10)
  }
 

  return (
    <>
      <h1>Threads</h1>

      {threads && <ThreadList threads={threads} editThread={editThread} counter={counter}  />}

      {threads && threads.length >= limit && <ShowMoreBtn onClick={showMore} />}

      <div className="post-form-wrapper" ref={ref}>
        {auth === null
          ?
          <div className="alert alert-warning mt-5" role="alert">
              You must be <Link to='/login'>logged in</Link> to open a new thread
          </div>
          :
          <ThreadForm counter={counter} thread={formThread} editThread={editThread} />
        }
      </div>
    </>
  )
}


const mapStateToProps = function ({ user }) {
  return { 
    auth: user.auth
  }
}

export default connect(mapStateToProps)(HomePage)