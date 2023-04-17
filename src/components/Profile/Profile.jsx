import React from 'react';

export default function Profile({image, name}) {
  return (
    <div className="profile">
      <div>
        <h1>Hello , I'm {name}</h1>
        <img src={image} alt="" />
      </div>
    </div>
  )
}