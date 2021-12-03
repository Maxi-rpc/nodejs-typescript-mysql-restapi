import { Router } from "express";
const router = Router();

router.route("/").get((req, res) => {
  res.json("get post");
});

export default router;
