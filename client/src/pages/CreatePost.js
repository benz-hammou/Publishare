import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Card, Input, Typography } from "@material-tailwind/react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState("");

  const createNewPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();

    const res = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (res.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex justify-center items-center h-full w-full m-auto">
        <Card className="w-70% min-h-50vh h-full" color="transparent" shadow={false}>
          <Typography
            className="mb-6 flex justify-center"
            variant="h4"
            color="blue-gray"
          >
            Publish somethings !
          </Typography>
          <form className="w-full" onSubmit={createNewPost}>
            <div className="mb-4 flex flex-col gap-6">
              <Input
                color="deep-orange"
                size="lg"
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input type="file" onChange={(e) => setFiles(e.target.files)} />
              <Input
                color="deep-orange"
                size="lg"
                label="Summary"
                onChange={(e) => setSummary(e.target.value)}
              />
             <Editor onChange={setContent} value={content} />
            </div>
            <button className="btn_submit w-full mb-8">Publish</button>
          </form>
        </Card>
      </div>
  );
};

export default CreatePost;
