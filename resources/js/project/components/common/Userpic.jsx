import React from 'react'
import { Link } from 'react-router-dom'


function Userpic({ user }) {

  const img = user.userpic ? user.userpic : '/img/user.svg'

  return (
    <Link to={"/user/" + user.id} className="author-avatar">
      <img alt="" src={img}  className="avatar photo" loading="lazy" />
    </Link>
  )
}


export default Userpic