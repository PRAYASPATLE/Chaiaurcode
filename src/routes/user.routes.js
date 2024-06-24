import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

//userRouter.route("/register").post(registerUser);
// userRouter.post(
//   "/register",
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverimage", maxCount: 1 },
//   ]),
//   registerUser
// );

userRouter.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default userRouter;
