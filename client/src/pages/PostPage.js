import { Typography } from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Delete from "../components/Delete";
import { API_BASE_URL } from "../constants";
import { fetchAPI } from "../utiles/apiCallStorage";
import Skeleton from "../components/Skeleton";

const PostPage = ({ getPosts, isLoading }) => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  const getPostId = async () => {
    try {
      const res = await fetchAPI(`${API_BASE_URL}/post/${id}`);
      console.log(res);
      return setPostInfo(res);
    } catch (error) {
      console.log("Fetche error: Your post cannot be displayed.", error);
    }
  };

  useEffect(() => {
    getPostId();
  }, []);

  if (!postInfo) return "";

  const { title, cover, author, createdAt, _id, content } = postInfo;

  return (
    <div>
      {isLoading && new Array(3).fill(null).map(() => <Skeleton />)}
      <h1 className="flex justify-center mb-8">{title}</h1>
      <div className=" flex justify-center items-center rounded-xl overflow-hidden mb-8 max-h-50vh lg:w-full">
        <img
          className=" aspect-11/8 object-cover object-center lg:w-full"
          src={cover}
          alt=""
        />
      </div>
      <div className="flex mb-4">
        <div>
          <Typography
            className="text-gray-800 font-semibold"
            variant="paragraph"
          >
            by @
            <span className="text-deep-orange-800 font-semibold">
              {author.username}
            </span>
            ,
            <time className="ml-2 font-medium">
              {format(new Date(createdAt), "d LLL y - HH:mm")}
            </time>
          </Typography>
        </div>
        {userInfo?.id === author?._id && (
          <div className="flex ml-4">
            <Delete id={id} getPosts={getPosts} />

            <Link to={`/edit/${_id}`}>
              <PencilSquareIcon className="h-6 w-6 ml-2 text-deep-orange-300 hover:scale-150" />
            </Link>
          </div>
        )}
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostPage;
