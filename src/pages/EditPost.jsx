import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AuthContext from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
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

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileData, setFileData] = useState("");
  const [catchError, setCatchError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  const userId = user?.userInfo && user.userInfo.id;

  useEffect(() => {
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

        setTitle(data?.post?.title);
        setContent(data?.post?.content);
        setFileData(data?.post?.img);
      } catch (err) {
        setCatchError(typeof err === "object" ? err.message : err);
      }
    };
    getPost();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    typeof fileData === "object" && formData.set("img", fileData);
    formData.set("content", content);
    formData.set("id", user?.userInfo && user.userInfo.id);

    try {
      if (catchError.trim())
        throw new Error(`User don't have privileges to edit this post!`);

      const res = await fetch(`${POST_API_URL}/post/${postId}`, {
        method: "PATCH",
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
      navigate(`/post/${postId}`, { replace: true });
    } catch (err) {
      toast.error(typeof err === "string" ? err : err.message);
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
          src={`${
            typeof fileData === "object"
              ? URL.createObjectURL(fileData)
              : `http://localhost:3000/${fileData}`
          }`}
          alt={title}
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
        Edit Post
      </button>
    </form>
  );
};

export default EditPost;
