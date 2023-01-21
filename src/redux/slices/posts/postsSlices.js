import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl } from "../../../utils/utils";

const resetPostAction = createAction("rest/post");
const resetPostUpdatedAction = createAction("rest/update");
const deletePostResetAction = createAction("rest/delete");

export const createPostAction = createAsyncThunk(
  "create/post",
  async (post, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const token = user?.userAuth?.token;

    console.log(post);

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("category", post.category);
    formData.append("image", post.image);

    try {
      const { data } = await axios.post(
        `${baseUrl}api/posts`,
        formData,
        config
      );

      dispatch(resetPostAction());

      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

//update post action
export const updatePostAction = createAsyncThunk(
  "update/post",
  async (post, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const token = user?.userAuth?.token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}api/posts/${post?.id}`,
        post,
        config
      );
      dispatch(resetPostUpdatedAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

// delete post action

export const deletePostAction = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const { token } = user;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    console.log(postId);
    try {
      const { data } = await axios.delete(
        `${baseUrl}api/posts/${postId}`,
        config
      );
      dispatch(deletePostAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// get the posts
export const fetchPostsAction = createAsyncThunk(
  "posts/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}api/posts?category=${category}`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// post Details action
export const postDetailsAction = createAsyncThunk(
  "posts/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}api/posts/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

/// like the post

export const likeTogglePostAction = createAsyncThunk(
  "post/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const Id = {
      postId: postId,
    };
    const user = getState()?.users?.userAuth;
    const { token } = user;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(`${baseUrl}api/posts/like`, Id, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const disLikeTogglePostAction = createAsyncThunk(
  "post/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const Id = {
      postId: postId,
    };
    const user = getState()?.users?.userAuth;
    const { token } = user;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}api/posts/dislike`,
        Id,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetPostAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.createdPost = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // fetch all posts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // like posts
    builder.addCase(likeTogglePostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(likeTogglePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.like = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(likeTogglePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // dislike posts
    builder.addCase(disLikeTogglePostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(disLikeTogglePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.disLike = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(disLikeTogglePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // post Details
    builder.addCase(postDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(postDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.details = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(postDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // post Update
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetPostUpdatedAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updated = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // post delete
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletePostResetAction, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.deleted = action?.payload;
      state.isDeleted = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default postSlice.reducer;
