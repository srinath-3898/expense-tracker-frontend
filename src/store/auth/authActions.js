import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "http://localhost:8080/user/signup",
        user
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "http://localhost:8080/user/signin",
        user
      );
      localStorage.setItem("token", response.data?.data?.token);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
