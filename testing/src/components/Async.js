import { useEffect, useState } from "react";

function Async() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
      res.json().then((data) => {
        setPosts(data);
      });
    });
  }, []);
  return (
    <div>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default Async;
