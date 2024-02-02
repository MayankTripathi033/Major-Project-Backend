import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../Controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
/*Show users data or Posts*/

/*UPDATE*/
router.patch("/:id/like", verifyToken, likePost);
/*Shows user which there are liking.*/

export default router;
