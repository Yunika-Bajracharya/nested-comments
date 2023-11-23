import React from "react";
import Operation from "./Operation";
import "../style.css";
import { useState, useRef, useEffect } from "react";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
import { ReactComponent as EditIcon } from "../assets/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete-icon.svg";

const Comment = ({
  comment,
  handleInsertComment,
  handleEditComment,
  handleDeleteComment,
  parentWidth,
  isChild,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditComment(comment.id, inputRef?.current?.innerText);
    } else {
      if (input.trim() !== "") {
        setExpand(true);
        handleInsertComment(comment.id, input);
        setShowInput(false);
        setInput("");
      }
    }
    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteComment(comment.id);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className={comment.id === 1 ? "inputContainer" : "comment"}>
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainter_input input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are your thoughts?"
            />
            <Operation
              className="commentButton reply"
              type="Comment"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              style={{ wordWrap: "break-word" }}
              ref={inputRef}
            >
              {comment.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Operation
                    className="reply"
                    type="Save"
                    handleClick={onAddComment}
                  />
                  <Operation
                    className="reply"
                    type="Cancel"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Operation
                    className="reply"
                    handleClick={handleNewComment}
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="12px" height="12px" />
                        ) : (
                          <DownArrow width="12px" height="12px" />
                        )}{" "}
                        Reply
                      </>
                    }
                  />
                  <Operation
                    className="reply"
                    type={
                      <>
                        <EditIcon width="12px" height="12px" /> Edit
                      </>
                    }
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Operation
                    className="reply"
                    type={
                      <>
                        <DeleteIcon width="12px" height="12px" /> Delete
                      </>
                    }
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div
        style={{
          display: expand ? "block" : "none",
          paddingLeft: 20,
          position: "relative",
        }}
      >
        {!isChild && comment.items && comment.items.length > 0 && (
          <div
            className="connector-line"
            style={{
              left: `${parentWidth + 5}px`,
            }}
          />
        )}
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainter_input input"
              autoFocus
              placeholder="What are your thoughts?"
              onChange={(e) => setInput(e.target.value)}
            />
            <Operation
              className="reply"
              type="Reply"
              handleClick={onAddComment}
            />
            <Operation
              className="reply"
              type="Cancel"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              className="comment"
              key={cmnt.id}
              handleInsertComment={handleInsertComment}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
