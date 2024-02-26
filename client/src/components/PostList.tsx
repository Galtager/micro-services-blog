import axios from "axios";
import { FC, useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { IComment } from "../../../types";

interface PostListProps {}
interface IPost {
  id: string;
  title: string;
  comments: IComment[];
}

const PostList: FC<PostListProps> = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = posts.map((post) => {
    return (
      <div key={post.id} className="card" style={{ width: "30%", marginBottom: "20px" }}>
        <div className="card-body">
          <h3> {post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postID={post.id} />
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderPosts}</div>;
};

export default PostList;
