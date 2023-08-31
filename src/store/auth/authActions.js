import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/signup", user);
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
      const response = await api.post("/user/signin", user);
      localStorage.setItem("token", response.data?.data?.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export const profile = createAsyncThunk(
  "auth/profile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/profile");
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
