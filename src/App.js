import "./style.css";
import React from "react";
import { useState } from "react";
import Comment from "./components/Comment";
import useComment from "./hooks/useComment";

const comments = {
  id: 1,
  items: [],
};

export default function App() {
  const [commentsData, setCommentsData] = useState(comments);

  const { insertComment, editComment, deleteComment } = useComment();

  const handleInsertComment = (folderId, item) => {
    const endStructure = insertComment(commentsData, folderId, item);
    setCommentsData(endStructure);
  };

  const handleEditComment = (folderId, value) => {
    const endStructure = editComment(commentsData, folderId, value);
    setCommentsData(endStructure);
  };

  const handleDeleteComment = (folderId) => {
    const endStructure = deleteComment(commentsData, folderId);
    const temp = { ...endStructure };
    setCommentsData(temp);
  };
  return (
    <div className="App">
      <Comment
        handleInsertComment={handleInsertComment}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        comment={commentsData}
      />
    </div>
  );
}
