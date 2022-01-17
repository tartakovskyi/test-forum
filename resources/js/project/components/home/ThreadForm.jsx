import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import setFormObject from '../common/FormUtils'
import { saveThread } from '../../api'
import InfoBlock from '../common/InfoBlock'


const initialData = {
    title: '',
}


function ThreadForm({ auth, counter, editThread, thread }) {
console.log()
    const [data, setData] = useState(initialData)    
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (thread && thread.title) setData({ title: thread.title })
    }, [thread])

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validate(data)
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            const threadId = (thread && thread.id) ? thread.id : null
            const method = threadId ? 'put' : 'post'
            const threadData = {
                title: data.title
            }
            if (!threadId) threadData.user_id = auth.id;

            saveThread(method, threadId, threadData)
            .then(function (response) {
                if (response.status === 200 && response.data.status === 'success') {
                    setData(initialData)
                    counter()
                    editThread(null)
                    if(response.data.info) {
                        setMessage(response.data.info)
                        setTimeout(() => setMessage(''), 1500)
                    }
                }
            })
            .catch(function (error) {
                console.log(error)
                if(error.response && error.response.data && error.response.data.errors) {
                    const errors = {}
                    Object.keys(error.response.data.errors).forEach(key => errors[key] = error.response.data.errors[key][0])
                    setErrors(errors)
                } else if(error.response && error.response.status && error.response.status === 401) {
                    setErrors({auth:'You must be logged in to open a thread'})
                }
            })
        }

    }

    const validate = (data) => {
        const errors = {}

        if (!data.title) errors.title = 'Title cannot be blank';

        return errors
    }


    return (
        <form onSubmit={handleSubmit} className="post-form" id="postForm">
            <h2 className="mb-4">{thread ? 'Edit Thread' : 'Open New Thread'}</h2>
            {Object.keys(errors).length > 0 && <InfoBlock errors={errors} />}          
            {message && <InfoBlock success={message} />}
            <div className="form-group">
                <input
                    id="title"
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Thread title"
                    value={data.title}
                    onChange={setFormObject(data, setData)}
                />
            </div>
            <div className="text-center">
                <button type="submit" className="btn action_btn">Submit</button>
            </div>
        </form>
    )
}


const mapStateToProps = function ({ user }) {
  return {
    auth: user.auth,
  }
}

export default connect(mapStateToProps)(ThreadForm)
