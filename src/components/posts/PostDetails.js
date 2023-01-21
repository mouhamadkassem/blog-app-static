import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  postDetailsAction,
  deletePostAction,
} from "../../redux/slices/posts/postsSlices";
import Loading from "../../utils/Loading";
import DateMoment from "../../utils/DateMoment";
import Comment from "../Comment/AddComment";
import CommentsList from "../Comment/CommentsList";

const PostDetails = () => {
  const id = useParams().id;

  const dispatch = useDispatch();

  const post = useSelector((state) => state?.post);

  const { details, serverErr, appErr, loading, isDeleted } = post;

  const comment = useSelector((state) => state?.comment);
  useEffect(() => {
    dispatch(postDetailsAction(id));
  }, [dispatch, comment]);

  const userId = useSelector((state) => state?.users?.userAuth?._id);
  const userLogin = useSelector((state) => state?.users?.userAuth);
  const postId = details?.user?._id;

  const checkMatchUser = userId === postId;

  if (isDeleted) {
    return <Navigate to={"/posts"} />;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : serverErr || appErr ? (
        <h1 className="text-red-600">
          {serverErr} {appErr}
        </h1>
      ) : (
        <section class="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div class="container px-4 mx-auto">
            {/* Post Image */}
            <img
              class="mb-24 w-full h-96 object-cover"
              src={details?.image}
              alt=""
            />
            <div class="max-w-2xl mx-auto text-center">
              <h2 class="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {details?.title}
              </h2>

              {/* User */}
              <div class="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  class="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={details?.user?.image}
                  alt=""
                />
                <div class="text-left">
                  <Link to={`/profile/${details?.user?._id}`}>
                    <h4 class="mb-1 text-2xl font-bold text-gray-50">
                      <span class="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                        {details?.user?.firstName} {details?.user?.lastName}
                      </span>
                    </h4>
                  </Link>

                  <p class="text-gray-500">
                    <DateMoment date={details?.createAt} />
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div class="max-w-xl mx-auto">
                <p class="mb-6 text-left  text-xl text-gray-200">
                  {details?.description}
                  {/* Show delete and update btn if created user */}
                  {checkMatchUser ? (
                    <p class="flex">
                      <Link to={`/posts-update/${details?.id}`} class="p-3">
                        <PencilAltIcon class="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(deletePostAction(id));
                        }}
                        type="button"
                        class="ml-3"
                      >
                        <TrashIcon class="h-8 mt-3 text-red-600" />
                      </button>
                    </p>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {userLogin ? <Comment postId={details?._id} /> : null}

          <div className="flex justify-center  items-center">
            <CommentsList />
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
