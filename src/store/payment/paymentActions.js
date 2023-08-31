import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "payment/createPayment",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.post("/payment/create-order", {
        orderId,
      });
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
