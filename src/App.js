import './style.css';
import React from 'react';
import { useState } from 'react';
import Comment from './components/Comment';

const comments = {
  id: 1,
  items: [],
};

export default function App() {
  const [commentsData, setCommentsData] = useState(comments);
  return (
    <div className="App">
      <Comment comment={commentsData} />
    </div>
  );
}
