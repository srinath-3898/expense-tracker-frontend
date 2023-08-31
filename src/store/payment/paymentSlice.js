const { createSlice } = require("@reduxjs/toolkit");

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default paymentSlice.reducer;
