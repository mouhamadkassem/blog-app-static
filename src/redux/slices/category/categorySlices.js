import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/utils";

const resetUpdateAction = createAction("reset/update");
const resetDeleteAction = createAction("reset/delete");
const resetCreateAction = createAction("reset/create");

// create category
export const createCategoryAction = createAsyncThunk(
  "create/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;

    const token = user?.userAuth?.token;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}api/category`,
        {
          title: category?.title,
        },
        config
      );
      dispatch(resetCreateAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch all categories
export const fetchCategoriesAction = createAsyncThunk(
  "fetch/category",
  async (categories, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;

    const token = user?.userAuth?.token;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}api/category`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update category
export const updateCategoryAction = createAsyncThunk(
  "update/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;

    const token = user?.userAuth?.token;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}api/category/${category.id}`,
        { title: category.title },
        config
      );
      dispatch(resetUpdateAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// delete category
export const deleteCategoryAction = createAsyncThunk(
  "delete/category",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;

    const token = user?.userAuth?.token;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseUrl}api/category/${id}`,
        config
      );
      dispatch(resetDeleteAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch category
export const fetchCategoryAction = createAsyncThunk(
  "details/category",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;

    const token = user?.userAuth?.token;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}api/category/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlices = createSlice({
  name: "category",
  initialState: {
    category: {},
  },
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetCreateAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    // fetch all
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    //update
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetUpdateAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.updatedCategory = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //delete
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedCategory = action?.payload;
      state.isDeleted = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //details
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;

      state.detailsCategory = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export default categorySlices.reducer;
