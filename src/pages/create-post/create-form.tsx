import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { db, auth } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

interface createPostForm {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("You need to add title"),
    description: yup.string().required("You need to add description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createPostForm>({
    resolver: yupResolver(schema),
  });

  //creating the reference for the dabase collection which takes two arguments, Database and the collection name
  const postRef = collection(db, "posts");

  const createPostOnSubmit = async (data: createPostForm) => {
    console.log(data);
    await addDoc(postRef, {
        title : data.title,
        description : data.description,
        userName : auth.currentUser?.displayName,
        userId : auth.currentUser?.uid
    })
  };

  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col offset-md-2 col-md-8 offset-lg-3 col-lg-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(createPostOnSubmit)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label text-start">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title..."
                    {...register("title")}
                  />
                  {errors.title?.message && (
                    <small className="text-danger">
                      {errors.title?.message}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label text-start">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Description..."
                    {...register("description")}
                  />
                  {errors.description?.message && (
                    <small className="text-danger">
                      {errors.description?.message}
                    </small>
                  )}
                </div>
                <input type="submit" className="btn btn-primary" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
