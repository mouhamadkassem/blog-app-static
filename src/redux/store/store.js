import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import categoryReducer from "../slices/category/categorySlices";
import post from "../slices/posts/postsSlices";
import comment from "../slices/comments/commentSlices";
import mail from "../slices/sendmail/sendEmailSlice";
import accVerifyToken from "../slices/accountVerify/acountVerifysendToken";

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer,
    post,
    comment,
    mail,
    accVerifyToken,
  },
});

export default store;
