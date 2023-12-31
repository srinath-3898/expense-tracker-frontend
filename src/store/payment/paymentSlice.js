import { createOrder } from "./paymentActions";

const { createSlice } = require("@reduxjs/toolkit");

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    resetPaymentData: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.message = payload?.data?.message;
      })
      .addCase(createOrder.rejected, (state, error) => {
        state.loading = false;
        if (error?.payload) {
          state.error = error?.payload?.data?.message;
        } else {
          state.error = error?.error?.message;
        }
      });
  },
});

export default paymentSlice.reducer;
export const { resetPaymentData } = paymentSlice.actions;
