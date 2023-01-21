import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/utils";

const redirectUserToProfile = createAction("sendMail/redirect");

export const sendMailAction = createAsyncThunk(
  "send/mail",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const { token } = getState()?.users?.userAuth;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}api/SendMail`,
        {
          to: email?.recipientEmail,
          subject: email?.subject,
          message: email?.message,
        },
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

const sendMailSlice = createSlice({
  name: "mail",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(sendMailAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(redirectUserToProfile, (state, action) => {
      state.isMailSent = true;
    });
    builder.addCase(sendMailAction.fulfilled, (state, action) => {
      state.mailSent = action?.payload;
      state.loading = false;
      state.isMailSent = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(sendMailAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export default sendMailSlice.reducer;
