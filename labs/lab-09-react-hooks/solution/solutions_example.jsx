/* Reference solution — Lab 9, Week 11, Session 36.
   UserList and PostList belong in separate files in the student project. */
import { useEffect, useState } from "react";
import { getUsers, getPosts } from "./api.js";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadUsers() {
    setLoading(true);
    setError(null);
    try {
      setUsers(await getUsers());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadUsers(); }, []);

  return (
    <section>
      <button type="button" disabled={loading} onClick={loadUsers}>Refresh</button>
      {loading ? <p>Loading…</p> : error ? <p role="alert">{error.message}</p> : (
        <ul>{users.map(user => <li key={user.id}>{user.name} — {user.email}</li>)}</ul>
      )}
    </section>
  );
}

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      setError(null);
      try {
        setPosts((await getPosts()).slice(0, 10));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p role="alert">{error.message}</p>;
  return <ul>{posts.map(post => <li key={post.id}><strong>{post.title}</strong> — {post.body}</li>)}</ul>;
}

export default function App() {
  return <main><h1>Lab 9</h1><h2>Users</h2><UserList /><h2>Posts</h2><PostList /></main>;
}

/* README: Show the first ten posts to keep the list readable. */
