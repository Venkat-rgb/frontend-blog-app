import React, { useEffect, useState } from "react";
import Post from "./Post";
import { POST_API_URL } from "../config";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`${POST_API_URL}`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Unable to get the Posts!");
        setPosts(data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="mt-10 flex flex-col sm:gap-4 gap-10 font-inter h-[80vh] overflow-y-scroll min-[500px]:pr-2">
      <p className="text-center text-2xl font-semibold">Posts</p>

      {posts?.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
