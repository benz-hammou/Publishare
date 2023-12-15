import { useState } from "react";
import { Navigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const Delete = ({ id }) => {
  const [redirect, setRedirect] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const deletePost = async () => {
    try {
      const res = await fetch(`http://localhost:4000/post/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.log("Fetche error: ", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

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
          >
            DELETE
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Delete;
