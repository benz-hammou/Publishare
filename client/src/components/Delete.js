import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { API_BASE_URL } from "../constants";

const Delete = ({ id, getPosts  }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const deletePost = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/post/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        await getPosts();
        navigate("/");
        console.log("The post has been deleted");
      }
    } catch (error) {
      console.log(
        "Fetche error: The post could not be deleted, please try again",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <TrashIcon
        onClick={handleOpen}
        className="h-6 w-6 text-red-700 hover:scale-150"
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" className="text-red-700">
            Attention is Required !
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <TrashIcon className="h-12 w-12 text-red-700" />
          <Typography color="blue-gray" variant="h5">
            Your publication will be definitely removed, click on{" "}
            <span className="text-red-700">DELETE</span> to confirm !
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button
            className="bg-red-700 hover:shadow-lg hover:shadow-red-700/50"
            onClick={deletePost}
            disabled={isLoading}
          >
            DELETE
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Delete;
