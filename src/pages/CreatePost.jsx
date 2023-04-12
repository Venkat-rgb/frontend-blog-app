import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { POST_API_URL } from "../config";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileData, setFileData] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("img", fileData);
    formData.set("content", content);

    try {
      const res = await fetch(`${POST_API_URL}/new`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${user?.accessToken && user.accessToken}`,
        },
        body: formData,
      });

      const data = await res.json();

      const error =
        typeof data.message === "object"
          ? data?.message?.title || data?.message?.content
          : data?.message;

      if (!res.ok) throw new Error(error);

      toast.success(data?.message);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      className="flex flex-col w-full gap-4 my-6 px-2"
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <input
        type="text"
        placeholder="Title"
        className="border border-gray-300 p-2 outline-none w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {fileData && (
        <img
          src={URL.createObjectURL(fileData)}
          alt={fileData.name}
          className="w-56"
        />
      )}
      <input type="file" onChange={(e) => setFileData(e.target.files[0])} />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
      />
      <button
        type="submit"
        className="w-full bg-[#333] p-2 rounded text-[#f1f1f1]"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
