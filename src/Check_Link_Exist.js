import React from 'react'
import {Link} from 'react-router-dom'

export default ({path, search, children}) => (
<Link to={{path, search}} >{children}</Link>
)