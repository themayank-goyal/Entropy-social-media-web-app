import React, { useState,useEffect } from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addComment,getAllComments } from '../../utils/firebase.js';

export default function Post({ username, imageUrl, caption, postId }) {
  const [comment, setComment] = useState('');
  const [allComments,setAllComments] = useState([]);
  const [options, setOptions] = useState(false);

  useEffect(() => {
    getAllComments(postId, setAllComments);
  },[])

  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={username} src="/static/images/avatar/1.jpg" />
        <h4>{username}</h4>
        <MoreVertIcon  className="post__headerDots"/>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        {' '}
        <strong> {username} </strong>: {caption}
      </h4>
      <div className="post__comment">
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="post__commentForm">
          <input onChange={(e) => setComment(e.target.value)} placeholder="comment...." type="text" />
          <button onClick={() => addComment(comment, postId)}>post</button>
        </div>
        <div className="post__allComments">
          {
            allComments?.map((item) => (
              <div className="post__singleComment">
                <h3>{item.username}</h3>
                <p>{item.text}</p>
              </div>
            ))
          }
        </div>
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
  );
}
