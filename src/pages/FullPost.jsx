import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { POST_API_URL } from "../config";
import toast from "react-hot-toast";
import moment from "moment";

const FullPost = () => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState();
  const navigate = useNavigate();

  const userId = user?.userInfo && user?.userInfo?.id;

  const getPost = async () => {
    try {
      const res = await fetch(`${POST_API_URL}/post/${postId}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message}`);

      setPost(data?.post);
    } catch (err) {
      toast.error(err);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await fetch(`${POST_API_URL}/post/${postId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message}`);

      toast.success(`${data.message}`);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="my-5 space-y-3 px-2">
      <div className="flex flex-col items-center space-y-2">
        <p
          className="text-2xl font-bold"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)" }}
        >
          {post?.title}
        </p>
        <p className="text-sm text-neutral-400 font-semibold">
          Published: {moment(post?.createdAt).fromNow()}
        </p>
        <p className="text-sm font-bold capitalize text-neutral-600">
          by @{post?.author?.username}
        </p>

        {userId === post?.author?._id && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="bg-[#333] py-2 px-4 rounded text-[#f1f1f1]"
              onClick={() => navigate(`/edit-post/${postId}`)}
            >
              Edit this post
            </button>
            <button
              type="button"
              className="bg-[#333] py-2 px-4 rounded text-[#f1f1f1]"
              onClick={deleteHandler}
            >
              Delete post
            </button>
          </div>
        )}
      </div>
      <div className="h-[350px]">
        <img
          src={`${process.env.BACKEND_URL}/${post?.img}`}
          alt={post?.title}
          className="w-full h-full object-center object-cover rounded"
        />
      </div>

      <div
        className="text-[#333]"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      />
    </div>
  );
};

export default FullPost;
