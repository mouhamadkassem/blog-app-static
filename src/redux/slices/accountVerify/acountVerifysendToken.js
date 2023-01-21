import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/utils";

const redirectverified = createAction("redirect/verified");

export const accVerifySendTokenAction = createAsyncThunk(
  "token/verify-acc",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = getState()?.users?.userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}api/users/generate-verify-email-token`,
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

// verify Account
export const accVerifyAction = createAsyncThunk(
  "user/verify-acc",
  async (tokenVerify, { rejectWithValue, getState, dispatch }) => {
    const { token } = getState()?.users?.userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}api/users/verify-account`,
        { token: tokenVerify },
        config
      );
      dispatch(redirectverified());
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const accVerifyTokenSlice = createSlice({
  name: "token",
  initialState: {},
  extraReducers: (builder) => {
    // account verify send token
    builder.addCase(accVerifySendTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(accVerifySendTokenAction.fulfilled, (state, action) => {
      state.token = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(accVerifySendTokenAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    //accout verify
    builder.addCase(accVerifyAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(redirectverified, (state, action) => {
      state.isVerify = true;
    });
    builder.addCase(accVerifyAction.fulfilled, (state, action) => {
      state.accountVerify = action?.payload;
      state.loading = false;
      state.isVerify = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(accVerifyAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export default accVerifyTokenSlice.reducer;
