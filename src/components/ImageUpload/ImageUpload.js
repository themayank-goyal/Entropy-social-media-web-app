import React, {useState} from 'react';
import './ImageUpload.css'
import Button from '@mui/material/Button';
import {uploadTask} from '../../utils/firebase.js'


export default function ImageUpload () {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleUpload = () => {
    uploadTask(image, setProgress, caption);
  }

  return (
    <div className="imageUpload">
      <progress value={progress} max="100"/>
      <input className="imageUpload__caption" onChange={(e) => setCaption(e.target.value)} type="text" placeholder="write a caption..."/>
      <input className="imageUpload__file"  type="file" onChange={handleChange}/>
      <button className="button-41" onClick={handleUpload}>Post</button>
    </div>
  )
}