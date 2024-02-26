import { FC } from "react";
import { CommentStatus, IComment } from "../../../types";

interface CommentListProps {
  comments: IComment[];
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
  const renderComments = comments.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.text} {translateStatus(comment.status)}
      </li>
    );
  });

  return <ul>{renderComments}</ul>;
};

export default CommentList;

const translateStatus = (status: CommentStatus) => {
  switch (status) {
    case "approved":
      return "מאושר";
    case "pending":
      return "ממתין";
    case "rejected":
      return "נדחה";
  }
};
