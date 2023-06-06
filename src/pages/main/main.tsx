import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);

  const collectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(collectionRef);
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row gy-3">
        {postsList?.map((post, key) => {
          return <Post key={key} post={post} />;
        })}
      </div>
    </div>
  );
};
