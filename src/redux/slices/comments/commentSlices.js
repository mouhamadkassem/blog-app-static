import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/utils";

const resetCommentUpdateAction = createAction("reset/comment-update");

export const createCommentAction = createAsyncThunk(
  "create/comment",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const { token } = user;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}api/comments`,
        comment,
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
export const deleteCommentAction = createAsyncThunk(
  "delete/comment",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const { token } = user;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.delete(
        `${baseUrl}api/comments/${commentId}`,
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
export const updateCommentAction = createAsyncThunk(
  "update/comment",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const { token } = user;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/comments/${comment?.id}`,
        {
          description: comment?.description,
        },
        config
      );
      dispatch(resetCommentUpdateAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const fetchOneCommentAction = createAsyncThunk(
  "fetch/comment",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const { token } = user;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${baseUrl}api/comments/${commentId}`,
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

const commentSlice = createSlice({
  name: "comment",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.comment = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //delete comment
    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDeleted = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // update comment
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetCommentUpdateAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentupdated = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // fetch one comment
    builder.addCase(fetchOneCommentAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(fetchOneCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentToUpdate = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchOneCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default commentSlice.reducer;
