import {
  Card,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import categoriesData from "../data/CategoriesData";
import { API_BASE_URL } from "../constants";
import { fetchAPI } from "../utiles/apiCallStorage";

const EditPost = ({ getPosts }) => {
  const { id } = useParams();
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

  const getEditedContent = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/post/${id}`);
      const data = await res.json();
      const { title, content, summary, category } = data;
      setTitle(title);
      setContent(content);
      setSummary(summary);
      setCategory(category);
    } catch (error) {
      console.log(
        "Fetche error: The previous content cannot be obtained.",
        error
      );
    }
  };

  useEffect(() => {
    getEditedContent();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = new FormData();
      data.set("title", title);
      data.set("category", category);
      data.set("summary", summary);
      data.set("content", content);
      data.set("id", id);
      if (files?.[0]?.name) {
        const convertedFile = await convertToBase64(files[0]);
        data.set("file", convertedFile);
        data.set("filename", files?.[0].name);
      }

      await fetchAPI(`${API_BASE_URL}/post`, {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(data)),
      });

      await getPosts();
      navigate(`/post/${id}`);
      console.log("The post has been edited");
    } catch (error) {
      console.log(
        "Fetche error: The post could not be edited, please try again",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

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

              <div className="flex w-72 flex-col gap-6">
                <Select
                  color="deep-orange"
                  label="Category"
                  onChange={setCategory}
                  value={category}
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
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <Editor onChange={setContent} value={content} />
            </div>
            <button className="btn_submit w-full mb-8" disabled={isLoading}>
              Update Post
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditPost;
