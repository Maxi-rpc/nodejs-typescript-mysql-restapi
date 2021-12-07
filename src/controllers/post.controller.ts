import { Request, Response } from "express";
import { connect } from "../database";
import { Post } from "../interface/post.interface";

// get posts
export async function getPosts(req: Request, res: Response): Promise<Response> {
  const conection = await connect();

  const posts = await conection.query("SELECT * FROM posts");

  return res.json(posts);
}

// post posts
export async function createPost(req: Request, res: Response) {
  const newPost: Post = req.body;

  const conection = await connect();
  await conection.query("INSERT INTO posts SET ?", [newPost]);

  return res.json({
    message: "Post created",
  });
}

// get post
export async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;

  const conection = await connect();
  const post = await conection.query("SELECT * FROM posts WHERE id = ?", [id]);

  return res.json(post[0]);
}

// delete post
export async function deletePost(req: Request, res: Response) {
  const id = req.params.postId;

  const conection = await connect();
  await conection.query("DELETE FROM posts WHERE id = ?", [id]);

  return res.json({
    message: "Post Deleted",
  });
}

// update post
export async function updatePost(req: Request, res: Response) {
  const id = req.params.postId;
  const updatePost: Post = req.body;

  const conection = await connect();
  await conection.query("UPDATE posts set ? WHERE id = ?", [updatePost, id]);

  return res.json({
    message: "Post updated",
  });
}
