import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Card,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import categoriesData from "../data/CategoriesData";
import { API_BASE_URL } from "../constants";

const CreatePost = ({ getPosts }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const convertedFile = await convertToBase64(files[0]);
      const data = new FormData();
      data.set("title", title);
      data.set("category", category);
      data.set("summary", summary);
      data.set("content", content);
      data.set("file", convertedFile);
      data.set("filename", files[0].name);

      const res = await fetch(`${API_BASE_URL}/post`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (res.ok) {
        await getPosts();
        navigate("/");
        console.log("The post has been created");
      }
    } catch (error) {
      console.log(
        "Fetche error: The post could not be created, please try again",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };
  console.log(category);

  return (
    <div className="flex justify-center items-center h-full w-full m-auto">
      <Card
        className="w-70% min-h-50vh h-full"
        color="transparent"
        shadow={false}
      >
        <Typography
          className="mb-6 flex justify-center"
          variant="h4"
          color="blue-gray"
          disabled={isLoading}
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

            <div className="flex w-72 flex-col gap-6">
              <Select
                color="deep-orange"
                label="Category"
                onChange={setCategory}
              >
                {categoriesData.map((cat) => {
                  return (
                    <Option id={cat.key} value={cat.name}>
                      {cat.name}
                    </Option>
                  );
                })}
              </Select>
            </div>

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
