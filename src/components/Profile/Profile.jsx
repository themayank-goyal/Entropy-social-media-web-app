import React from 'react';
import Post from '../Post/Post.jsx';
import './Profile.css'

export default function Profile({ username, posts }) {
  return (
    <div className="profile">
      <div>
        <h1>Hello , I'm </h1>
        <img src="" alt="" />
      </div>
      <div className="profile__posts">
        {posts?.map((item) => {
          if (item.username == username) {
            return (
              <Post
                key={item.id}
                username={item.username}
                imageUrl={item.imageUrl}
                caption={item.caption}
                postId={item.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
