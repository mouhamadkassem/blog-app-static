import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl } from "../../../utils/utils";

const redirectUserToProfile = createAction("image/upload-Profile");
const redirectAfterUpdateToProfile = createAction("update/data-Profile");
const passwordResetAction = createAction("password/reset");

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${baseUrl}api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}api/users/login`,
        userData,
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.message);
    }
  }
);

export const LogoutAction = createAsyncThunk(
  "user/Logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const userProfileAction = createAsyncThunk(
  "user/profie",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const { token } = user;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${baseUrl}api/users/profile/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        return rejectWithValue(error?.response?.data);
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

// upload profile image
export const uploadProfileImageAction = createAsyncThunk(
  "user/upload-image",
  async (image, { rejectWithValue, getState, dispatch }) => {
    const formData = new FormData();
    formData.append("image", image?.image);

    const userAuth = getState()?.users?.userAuth;

    const { token } = userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/users/pofileUpload-image`,
        formData,
        config
      );
      dispatch(redirectUserToProfile());
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update Profile Action
export const updateProfileAction = createAsyncThunk(
  "user/update-profile",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;

    const { token } = userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/users`,
        {
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          email: userData?.email,
        },
        config
      );
      dispatch(redirectAfterUpdateToProfile());
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// follow  Action
export const followAction = createAsyncThunk(
  "user/follow",
  async (followId, { rejectWithValue, getState, dispatch }) => {
    console.log(followId);

    const userAuth = getState()?.users?.userAuth;

    const { token } = userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/users/follow`,
        { id: followId },
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
// unfollow  Action
export const unFollowAction = createAsyncThunk(
  "user/unfollow",
  async (followId, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;

    const { token } = userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/users/unfollow`,
        { id: followId },
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

// fetch user Details Action
export const fetchUserDetailsAction = createAsyncThunk(
  "user/fetch-details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;

    const { token } = userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(`${baseUrl}api/users/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch All users  Action
export const fetchUsersAction = createAsyncThunk(
  "user/fetch-all",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;

    const { token } = userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(`${baseUrl}api/users`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// block user  Action
export const blockUserAction = createAsyncThunk(
  "user/block",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;

    const { token } = userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/users/block-user/${id}`,
        {},
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
// unblock user  Action
export const unblockUserAction = createAsyncThunk(
  "user/unblock",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;

    const { token } = userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/users/unblock-user/${id}`,
        {},
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

export const updatePasswordAction = createAsyncThunk(
  "update/password",
  async (password, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users?.userAuth?.token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/users/password`,
        {
          password,
        },
        config
      );

      dispatch(passwordResetAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const usersSlice = createSlice({
  name: "user",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    // register action
    // eslint-disable-next-line no-unused-expressions
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
      // eslint-disable-next-line no-sequences
    }),
      builder.addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = action.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      }),
      builder.addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
    //profile
    // eslint-disable-next-line no-unused-expressions
    builder.addCase(userProfileAction.pending, (state, _action) => {
      state.profileLoading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
      // eslint-disable-next-line no-sequences
    }),
      builder.addCase(userProfileAction.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
        state.profileAppErr = undefined;
        state.profileServerErr = undefined;
      }),
      builder.addCase(userProfileAction.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileAppErr = action?.payload?.message;
        state.profileServerErr = action?.error?.message;
      });
    //profile upload photo
    // eslint-disable-next-line no-unused-expressions
    builder.addCase(uploadProfileImageAction.pending, (state, _action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
      // eslint-disable-next-line no-sequences
    }),
      builder.addCase(redirectUserToProfile, (state, action) => {
        state.isUploaded = true;
      }),
      builder.addCase(uploadProfileImageAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isUploaded = false;
        state.profileImage = action.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      }),
      builder.addCase(uploadProfileImageAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    // login action
    // eslint-disable-next-line no-unused-expressions
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //logout
    builder.addCase(LogoutAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(LogoutAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = undefined;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(LogoutAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //update profile data
    builder.addCase(updateProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(redirectAfterUpdateToProfile, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUpdated = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch user details data
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all users data
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // user follow
    builder.addCase(followAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followAction.fulfilled, (state, action) => {
      state.loading = false;
      state.follow = action?.payload;
      state.unfollow = undefined;

      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followAction.rejected, (state, action) => {
      state.loading = false;
      state.followed = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // user unfollow
    builder.addCase(unFollowAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unFollowAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unfollow = action?.payload;
      state.follow = undefined;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unFollowAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // block
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.block = action?.payload;

      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // unblock
    builder.addCase(unblockUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unblockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unblock = action?.payload;

      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unblockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    /// update password

    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.password = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.loading = true;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default usersSlice.reducer;
