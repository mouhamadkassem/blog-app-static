import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import UpdateCategory from "./components/Categories/UpdateCategory";
import CategoryList from "./components/Categories/CategoryList";
import AdminProtectRoutes from "./components/Navigation/privateProtectRoute/AdminProtectRoutes";
import PrivateProtectRoute from "./components/Navigation/privateProtectRoute/PrivateProtectRoutes";
import CreatePosts from "./components/posts/CreatePost";
import PostList from "./components/posts/PostsList";
import PostDetails from "./components/posts/PostDetails";
import UpdatePost from "./components/posts/UpdatePost";
import UpdateComment from "./components/Comment/UpdateComment";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import SendEmail from "./components/Users/Emailing/SendEmail";
import AccountVerified from "./components/Users/AccountVerify/AccountVerified";
import UsersList from "./components/Users/UserList/UsersList";
import UpdatePassword from "./components/Users/PasswordMangment/UpdatePassword";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/add-category"
          element={
            <AdminProtectRoutes>
              <AddNewCategory />
            </AdminProtectRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <AdminProtectRoutes>
              <UsersList />
            </AdminProtectRoutes>
          }
        />
        <Route
          path="/verify-account/:token"
          element={
            <PrivateProtectRoute>
              <AccountVerified />
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <PrivateProtectRoute>
              <UpdatePassword />
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/send-mail"
          element={
            <PrivateProtectRoute>
              <SendEmail />
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/update-profile/:id"
          element={
            <PrivateProtectRoute>
              <UpdateProfileForm />
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/update-comment/:id"
          element={
            <PrivateProtectRoute>
              <UpdateComment />
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateProtectRoute>
              <Profile />
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/upload-photo/:id"
          element={
            <PrivateProtectRoute>
              <UploadProfilePhoto />
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateProtectRoute>
              <CreatePosts />
            </PrivateProtectRoute>
          }
        />
        <Route
          exact
          path="/update-category/:id"
          element={
            <AdminProtectRoutes>
              <UpdateCategory />
            </AdminProtectRoutes>
          }
        />
        <Route
          exact
          path="category-list"
          element={
            <AdminProtectRoutes>
              <CategoryList />
            </AdminProtectRoutes>
          }
        />
        <Route
          exact
          path="posts-update/:id"
          element={
            <PrivateProtectRoute>
              <UpdatePost />
            </PrivateProtectRoute>
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts" element={<PostList />} />
        <Route exact path="/posts/:id" element={<PostDetails />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
