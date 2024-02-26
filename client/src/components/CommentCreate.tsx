import axios from "axios";
import { FC, FormEvent, useState } from "react";

interface CommentCreateProps {
  postID: string;
}
interface ICommentCreate {
  postID: string;
  text: string;
}

const CommentCreate: FC<CommentCreateProps> = ({ postID }) => {
  const [text, setText] = useState("");
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const newComment: ICommentCreate = {
        postID,
        text,
      };
      await axios.post(`http://localhost:4001/posts/${postID}/comments`, newComment);
      setText("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>הוסף תגובה</label>
          <input placeholder="הגב..." value={text} onChange={(e) => setText(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary" style={{ margin: "1rem 0" }}>
          שלח
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
