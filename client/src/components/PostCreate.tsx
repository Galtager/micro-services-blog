import axios from "axios";
import { FC, FormEvent, useState } from "react";

interface PostCreateProps {}

const PostCreate: FC<PostCreateProps> = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/posts", {
        title,
      });
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            placeholder="מה בראש שלך?..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary " style={{ margin: "1rem 0" }}>
          הכנס פוסט
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
