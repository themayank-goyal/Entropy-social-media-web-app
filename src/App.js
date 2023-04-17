import React, { useState, useEffect } from 'react';
import Post from './components/Post/Post.jsx';
import SignInForm from './components/SignInForm/SignInForm.jsx';
import Profile from './components/Profile/Profile.jsx';
import ImageUpload from './components/ImageUpload/ImageUpload.js';
import './style.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import center from '@mui/material/center';
import {
  getAllPosts,
  createUser,
  authStatePersistence,
  signOutUser,
  db,
} from './utils/firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    authStatePersistence(setUser);
  }, []);

  useEffect(() => {
    const get = async () => {
      await getAllPosts(setPosts);
    };
    get();
  }, []);

  console.log(user);

  return (
    <div className="app">
      <ToastContainer />
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://th.bing.com/th/id/OIP.cIAAAyM0qGOZXJMj10gcEAHaCe?w=342&h=116&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        />
        {!user ? (
          <React.Fragment>
            {/* <h1>{user.displayName}</h1> */}
            <div>
              <SignInForm style={style} />
              <button className="button-30" onClick={handleOpen}>
                Sign Up
              </button>
            </div>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <center>
                  <img
                    className="app__headerImage"
                    src="https://th.bing.com/th/id/OIP.cIAAAyM0qGOZXJMj10gcEAHaCe?w=342&h=116&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  />
                  <form className="app__headerForm">
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      type="text"
                    />
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                    />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                      type="password"
                    />
                    <Button
                      onClick={() => {
                        createUser(username, email, password);
                        handleClose();
                      }}
                    >
                      Signup
                    </Button>
                  </form>
                </center>
              </Box>
            </Modal>
          </React.Fragment>
        ) : (
          <div className="app__profileIcon">
            {/* <h1>{user.displayName}</h1> */}
            <Avatar alt={username} src="/static/images/avatar/1.jpg" />
            <Button onClick={signOutUser}>SignOut</Button>
          </div>
        )}
      </div>
      <h1 className="app__tagLine">
        <span>Increase the entropy </span>
        <br /> of the site by sharing your Post
      </h1>
      {user ? (
        <React.Fragment>
          <Profile image={user?.photoUrl} name={user.displayName} />
          <ImageUpload />
        </React.Fragment>
      ) : (
        <></>
      )}
      {posts.map((item) => (
        <Post
          key={item.id}
          username={item.username}
          imageUrl={item.imageUrl}
          caption={item.caption}
          postId={item.id}
        />
      ))}
    </div>
  );
}
