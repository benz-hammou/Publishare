import { Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const getEditedContent = async () => {
    try {
      const res = await fetch(`http://localhost:4000/post/${id}`);
      const data = await res.json();
      const { title, content, summary } = data;
      setTitle(title);
      setContent(content);
      setSummary(summary);
    } catch (error) {
      console.log("Fetche error: ", error);
    }
  };

  useEffect(() => {
    getEditedContent();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const res = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (res.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div>
      <div className=" flex justify-center items-center h-full w-full m-auto">
        <Card
          className="w-70% min-h-50vh h-full"
          color="transparent"
          shadow={false}
        >
          <Typography
            className="mb-6 flex justify-center"
            variant="h4"
            color="blue-gray"
          >
            Update somethings !
          </Typography>
          <form className=" w-full" onSubmit={updatePost}>
            <div className="mb-4 flex flex-col gap-6">
              <Input
                color="deep-orange"
                size="lg"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input type="file" onChange={(e) => setFiles(e.target.files)} />
              <Input
                color="deep-orange"
                size="lg"
                label="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <Editor onChange={setContent} value={content} />
            </div>
            <button className="btn_submit w-full mb-8">Update Post</button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditPost;
