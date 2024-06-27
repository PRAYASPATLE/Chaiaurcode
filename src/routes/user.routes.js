import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannnelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

userRouter.route("/login").post(loginUser);

//secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refreshtoken").post(refreshAccessToken);
userRouter.route("/changepassword").post(verifyJWT, changeCurrentPassword);
userRouter.route("/currentuser").get(verifyJWT, getCurrentUser);
userRouter.route("/updateaccount").patch(verifyJWT, updateAccountDetails);
userRouter
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
userRouter
  .route("/coverImage")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
userRouter.route("/c/:username").get(verifyJWT, getUserChannnelProfile);
userRouter.route("/history").get(verifyJWT, getWatchHistory);

export default userRouter;
