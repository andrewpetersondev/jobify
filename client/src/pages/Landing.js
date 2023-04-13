import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const Landing = () => {
  const { user } = useAppContext()
  return (
    <>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby yuccie tilde you probably haven't heard of them, paleo
              master cleanse tacos cornhole bodega boys godard fit kombucha.
              Single-origin coffee fanny pack fashion axe tbh distillery next
              lfit vexillologist DSA, leggings 8-bit hoodie copper mug normcore
              keytar you probably haven't heard of them
            </p>
            {/* <button className='btn btn-hero'>Login/Register</button> */}
            <Link
              to='/register'
              className='btn btn-hero'
            >
              Login/Register
            </Link>
          </div>
          <img
            src={main}
            alt='job hunt'
            className='img main-img'
          />
        </div>
      </Wrapper>
    </>
  )
}

export default Landing
