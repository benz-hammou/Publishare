import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Post = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:4000/post");
      const data = await res.json();
      console.log(data);
      return setPosts(data);
    } catch (error) {
      console.log("Fetche error: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => {
          const { title, summary, cover, createdAt, author, _id } = post;

          return (
            <Card
              key={_id}
              className="w-full mb-5 shadow-shadowPost md:h-oneThirdScreen md:flex-row md:overflow-hidden"
            >
              <CardHeader
                shadow={false}
                floated={false}
                className=" flex justify-center items-center m-0 w-full relative h-56 shrink-0 rounded-b-none md:rounded-r-none md:w-1/2 md:h-full"
              >
                <Link to={`/post/${_id}`}>
                  <img
                    src={`http://localhost:4000/${cover}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </Link>
              </CardHeader>
              <CardBody className="py-3">
                <Typography
                  variant="h6"
                  color="deep-orange"
                  className="mb-1 uppercase"
                >
                  travel
                </Typography>
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="md:max-h-16 md:overflow-hidden mb-3"
                >
                  <Link to={`/post/${_id}`}>
                    {title}
                  </Link>
                </Typography>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="info mb-1"
                >
                  <a href className="autor font-semibold mr-2">{author.username}</a>
                  <time>{format(new Date(createdAt), "d LLL y - HH:mm")}</time>
                </Typography>
                <Typography
                  color="gray"
                  className="mb-4 font-normal md:max-h-14 md:overflow-hidden md:mb-2 lg:max-h-24 lg:mb-4 xl:overflow-visible xl:mb-8"
                >
                  {summary}
                </Typography>
                <div>
                  <Link
                    to={`/post/${_id}`}
                    className="inline-block"
                  >
                    <Button
                      variant="text"
                      className="flex items-center gap-2 text-amber-900  hover:bg-orange-100"
                    >
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          );
        })}

    </>
  );
};

export default Post;
