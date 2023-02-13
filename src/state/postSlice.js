import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      // Because if I made a button (try again) we should make the error to be null as the default value
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.records.push(...action.payload);
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = postSlice.actions;

export default postSlice.reducer;
