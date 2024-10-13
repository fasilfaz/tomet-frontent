import { axiosInstance } from "@/lib/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    isLoading: false,
    isError: false,
    dataIsLoading: false,
}

export const getCategories = createAsyncThunk(
    "get/categories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/category/categories");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong")
        }
    }
)

export const createCategory = createAsyncThunk(
    "create/category",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/v1/category/create", data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const categoryById = createAsyncThunk(
    "get/categoryById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/v1/category/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const updateCategoryById = createAsyncThunk(
    "update/categoryById",
    async ({data, id}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/v1/category/${id}`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const deleteCategoryById = createAsyncThunk(
    "delete/categoryById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/category/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)
const categorySlice = createSlice(
    {
        name: "category",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            // get all categories
            builder.addCase(getCategories.pending, (state) => {
                state.dataIsLoading = true;
                state.isError = false;
            });
            builder.addCase(getCategories.fulfilled, (state, action) => {
                state.dataIsLoading = false;
                state.categories = action.payload.data;
            });
            builder.addCase(getCategories.rejected, (state) => {
                state.dataIsLoading = false;
                state.isError = true;
            });

            // create category
            builder.addCase(createCategory.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            });
            builder.addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            });
            builder.addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });

            // get category by id
            builder.addCase(categoryById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            });
            builder.addCase(categoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            });
            builder.addCase(categoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
            
            // update category by id
            builder.addCase(updateCategoryById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            });
            builder.addCase(updateCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            });
            builder.addCase(updateCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });

            // delete category by id
            builder.addCase(deleteCategoryById.pending, (state) => {
                state.isError = false;
            });
            builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
                state.isError = false;
            });
            builder.addCase(deleteCategoryById.rejected, (state, action) => {
                state.isError = true;
            });
        }
    }
)

export default categorySlice.reducer;