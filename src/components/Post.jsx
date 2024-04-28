import moment from "moment";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Post = ({ title, content, author, createdAt, img, _id }) => {
  const navigate = useNavigate();
  return (
    <div className="grid sm:grid-cols-10 grid-cols-1 gap-5 p-3 rounded-md bg-white shadow-sm">
      <div
        className="w-full cursor-pointer flex-shrink-0 sm:col-span-3"
        onClick={() => navigate(`/post/${_id}`)}
      >
        <img
          src={`${BACKEND_URL}/${img}`}
          alt={title}
          className="rounded object-cover w-full h-full"
        />
      </div>
      <div className="space-y-2 sm:col-span-7">
        <p
          className="font-bold cursor-pointer text-neutral-600"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.25rem)" }}
          onClick={() => navigate(`/post/${_id}`)}
        >
          {title}
        </p>
        <div className="flex items-center gap-1">
          <p className="text-sm font-bold capitalize text-neutral-400">
            {author?.username} {"•"}
          </p>
          <p className="text-sm text-neutral-400/70 font-semibold">
            {moment(createdAt).fromNow()}
          </p>
        </div>
        <div
          className="text-neutral-600 line-clamp-[6]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Post;
