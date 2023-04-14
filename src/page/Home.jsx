import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <h2>hallo</h2>
        <Button><Link to={'/add'} className="text-light text-decoration-none">Tambah Data</Link> </Button>
    </div>
  )
}

export default Home