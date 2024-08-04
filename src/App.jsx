import "./styles.css";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [replyValue, setReplyValue] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentValue.trim()) return;

    let newData = {
      id: data.length + 1,
      text: commentValue,
      replies: [],
    };
    setData((prevData) => [...prevData, newData]);
    setCommentValue("");
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyValue.trim()) return;

    setData((prevData) =>
      prevData.map((comment, index) =>
        index === activeCommentId
          ? { ...comment, replies: [...comment.replies, replyValue] }
          : comment
      )
    );

    setActiveCommentId(null);
    setReplyValue("");
  };

  return (
    <>
      <div className="App">
        <h1>Comment Box</h1>
        <form onSubmit={handleCommentSubmit} className="commentForm">
          <input
            type="text"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>
      <div className="post">
        {data.map((eachData, index) => (
          <div className="commentSection" key={eachData.id}>
            <div className="commentBox">{eachData.text}</div>
            <button
              className="replyButton"
              onClick={() => setActiveCommentId(index)}
            >
              Reply
            </button>
            {activeCommentId === index && (
              <form onSubmit={handleReplySubmit} className="replyForm">
                <input
                  type="text"
                  value={replyValue}
                  onChange={(e) => setReplyValue(e.target.value)}
                  placeholder="Write a reply..."
                />
                <button type="submit">Submit Reply</button>
              </form>
            )}
            {eachData.replies.map((reply, index) => (
              <div className="replies" key={index}>
                <div className="replyBox">{reply}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
