import React from 'react'

const Header = () => {
  return (
    <div className='header'>
      <div className='header__logo'>Asian Countries</div>
      <button className='showBtn' onClick={() => window.location.reload()}>
        Show
      </button>
    </div>
  )
}

export default Header
