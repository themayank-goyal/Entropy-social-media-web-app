import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  onSnapshot,
} from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: 'AIzaSyBlhOua-L1Y2iKV_6KLz8Yvw5Nv4MBjJE8',
  authDomain: 'vibrate-543a2.firebaseapp.com',
  projectId: 'vibrate-543a2',
  storageBucket: 'vibrate-543a2.appspot.com',
  messagingSenderId: '423221861172',
  appId: '1:423221861172:web:16fcd2744f2b21e6442361',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const storage = getStorage();
const auth = getAuth();


export const addComment = async (comment,postId) => {
  const commentRef = collection(db, "posts", postId, "comments");

  try {
    const docRef = await addDoc(commentRef, {
      username: auth.currentUser.displayName,
      text: comment,
      timestamp: serverTimestamp(),
    });
    // console.log('Post successfull')
  } catch (error) {
    alert('Error' + error);
  }

}

export const getAllComments = (postId,setAllComments) => {
  const commentRef = collection(db, "posts", postId, "comments");
  onSnapshot(commentRef, (snapshot) => {
    let data = [];
    snapshot.docs.map((doc) => {
      console.log(doc.data());
      data = [...data, {...doc.data(), id: doc.id}];
    });
    setAllComments(data);
  });
}

export const uploadTask = (image, setProgress, caption) => {
  const storageRef = ref(storage, `images/${image?.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    },
    (error) => {
      alert('Error: ' + error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        try {
          const docRef = await addDoc(collection(db, 'posts'), {
            username: auth.currentUser.displayName,
            imageUrl: downloadURL,
            caption: caption,
            timestamp: serverTimestamp(),
          });
          toast.success("Posted Successfully 🎉")
          // console.log('Post successfull')
        } catch (error) {
          alert('Error' + error);
        }
      });
    }
  );
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const signInUser =  (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      toast("Signed In")
    })
    .catch((error) => {
      
    });
};


export const authStatePersistence = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
};

export const createUser = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        toast.success("Signed up 🎉");
        console.log('profile updated');
      })
      .catch((error) => {
        console.log('Error occured while profile updation');
      });
  } catch (error) {
    alert('Error:' + error);
  }
};

export const getAllPosts = async (setPosts) => {
  const colRef = collection(db, 'posts');

  onSnapshot(colRef, (snapshot) => {
    let data = [];
    snapshot.docs.map((doc) => {
      data = [...data, {...doc.data(), id: doc.id}];
    });
    setPosts(data);
  });
};

export const deletePost = async (id) => {
  try {
    await deleteDoc(doc(db, 'posts', id));
  } catch (error) {
    alert('Error' + error);
  }
};
