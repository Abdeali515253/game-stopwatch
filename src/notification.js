import React from 'react'
import './notification.css'

export default function Notification({ text, perform }) {
  return (
    <div className='modal-wrap' onAnimationEnd={perform}>
        <div className='modal-inner'>
            {text}
        </div>
    </div>
  )
}
