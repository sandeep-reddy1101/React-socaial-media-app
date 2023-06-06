import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { Post as Ipost } from "./main";
import { collection, getDocs, addDoc, query, where, doc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: Ipost;
}

interface LikesInterface {
    userId : string
}

export const Post = (props: Props) => {
    //to get the information of the logged in user.
    const [user] = useAuthState(auth);

    //to store the userId's of the users who likes this current post
    const [likes, setLikes] = useState<LikesInterface[] | null>(null);

    //creating the reference for the collection likes.
    const likesRef = collection(db, 'likes');

    //Getting all the docs in the likes collection where postId is equal to current postId.
    const getLikesQuery = query(likesRef, where('postId', '==', props.post.id));

    //boolean variable to find whether the logged in user liked the current post or not.
    const currentUserLiked = likes?.find(obj => obj.userId === user?.uid);

    const getLikesFromDB = async () => {
        const data = await getDocs(getLikesQuery);
        // console.log(data.docs.map(obj => obj.data().userId));
        setLikes(data.docs.map(obj => ({userId : obj.data().userId})));
    }

    const addLikesDocToDB = async () => {
        await addDoc(likesRef, {userId : user?.uid, postId : props.post.id});
        getLikesFromDB();
    }

    const deleteLikeFromDB = async () => {
        const getLikeQuery = query(likesRef, where('postId', '==', props.post.id), where('userId', '==', user?.uid));
        const likeData = await getDocs(getLikeQuery);

        const likeToDelete = doc(db, 'likes', likeData.docs[0].id);
        await deleteDoc(likeToDelete);
        getLikesFromDB();
    }

    useEffect(()=>{
        getLikesFromDB();
    }, [])

  return (
    <div className="col col-md-4 col-lg-3">
      <div className="card">
        <div className="card-body">
          <h4>{props.post.title}</h4>
          <p>{props.post.description}</p>
          <p>@{props.post.userName}</p>
          <div className="card-footer">
            <button onClick={currentUserLiked ? deleteLikeFromDB : addLikesDocToDB} className="btn">
                {currentUserLiked ? <>&#128078;</> : <>&#128077;</>}
            </button>
            {likes?.length && <p>Likes : {likes.length}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

