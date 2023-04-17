import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import center from '@mui/material/center';
import { signInUser } from '../../utils/firebase.js';

export default function SignInForm({ style }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <React.Fragment>
      <button onClick={() => setOpen(true)} className="button-30" role="button">
        Sign In
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <center>
            <img
              className="app__headerImage"
              src="https://th.bing.com/th/id/OIP.cIAAAyM0qGOZXJMj10gcEAHaCe?w=342&h=116&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
            <form className="app__headerForm">
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
                  signInUser(email, password);
                  setOpen(false);
                }}
              >
                SignIn
              </Button>
            </form>
          </center>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
