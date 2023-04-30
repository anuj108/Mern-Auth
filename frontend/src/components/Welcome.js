import React from 'react'
import {Button} from "@mui/material"
import {Link} from 'react-router-dom';
const Welcome = () => {
  return (
    <div>
      <Button to="/logout" LinkedComponent={Link} variant="contained">Logout</Button>
    </div>
  )
}

export default Welcome