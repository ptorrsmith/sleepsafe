// PARENT OF PROFILE LIST, LIVE EDIT, EDIT PROFILE, ADD PROFILE
// CHILD OF APP

import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProfileList from './AdminComponents/ProfileList'

const Admin = () => (
    <div>

        <div className="admin_header">
            <h1>ADMIN</h1>
        </div>

        <div className="admin_body">
        </div>

        <ProfileList />

        <div className="admin_link">
            <Link to='/'>Go back to the Landing Page.</Link>
            <br></br>
            <Link to='/liveupdate/:id'>Go to the Live Edit Page for this Profile. Must specify ID. </Link>
            <br></br>
            <Link to="/admin/providers/new">Add a new provider and services.</Link>
        </div>

    </div>

)

export default Admin