import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { ReactComponent as DownArrow } from '../assets/down-arrow.svg';
import { ReactComponent as UpArrow } from '../assets/down-arrow.svg';

const Comment = ({ comment }) => {
  return (
    <div>
      <div>
        <input
          type="text"
          className="inputContainter_input first_input"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type..."
        />
        <div className="comment reply" onClick={}>comment</div>
      </div>
    </div>
  );
};

export default Comment;
