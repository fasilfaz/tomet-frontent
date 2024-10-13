import { axiosInstance } from "@/lib/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    pageIsLoading: false,
    productLoading: false,
    filterData: null
}

export const getProducts = createAsyncThunk(
    "get/products",
    async ({data}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/v1/product/fetch/products/user?page=${data?.page}&search=${data?.search}`, data?.data , {withCredentials: true});
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message)
        }
    }
);

export const getProductsForAdmin = createAsyncThunk(
    "get/admin/products",
    async({search, page}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/api/v1/product/fetch/products?page=${page}&search=${search}`, {withCredentials: true});
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message)
        }
    }
)

export const createProduct = createAsyncThunk(
    "create/product",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/v1/product/create", data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)
export const getProductById = createAsyncThunk(
    "get/productById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/v1/product/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

// Frontend action using createAsyncThunk (Redux Toolkit)
export const updateProduct = createAsyncThunk(
    "update/product",
    async ({ data, id }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('brand', data.brand);
        formData.append('quantity', data.quantity);
        formData.append('category', data.category);
        
        if (data.images) {
          Array.from(data.images).forEach((image) => {
            formData.append('images', image);
          });
        }
  
        const response = await axiosInstance.put(`/api/v1/product/${id}`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
      }
    }
  );
  

export const deleteProductById = createAsyncThunk(
    "delete/productById",
    async ({id, path}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/${path}/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
)

export const getTopProducts = createAsyncThunk(
    "get/top-products",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/product/top/products");
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
)

export const getProductsForSeller = createAsyncThunk(
    "get/productsForSeller",
    async (search, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/v1/product/seller/products?search=${search}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
)

export const getLatestProduct = createAsyncThunk(
    "get/latest-product",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/product/new/products");
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
)

export const getAdminData = createAsyncThunk(
    "get/admin-data",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/product/admin/dashboard", {withCredentials: true});
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
)

export const getSellerData = createAsyncThunk(
    "get/seller-data",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/product/seller/dashboard", {withCredentials: true});
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
)

export const postReview = createAsyncThunk(
    "post/review",
    async (datas, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/v1/product/review`, datas, {withCredentials: true});
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
)

export const GetBrands = createAsyncThunk(
    "get/brands",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/product/all/brands", {withCredentials: true});
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)


const productSlice = createSlice(
    {
        name: 'products',
        initialState,
        reducers: {
            getFilterData: (state, action) => {
                state.filterData = action.payload
            }
        },
        extraReducers: (builder) => {
            // get products list 
            builder.addCase(getProducts.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
            })
            builder.addCase(getProducts.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
                state.products = action.payload.data;
            })
            builder.addCase(getProducts.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
            })

            // get products list for admin
            builder.addCase(getProductsForAdmin.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
            })
            builder.addCase(getProductsForAdmin.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
                state.products = action.payload;
            })
            builder.addCase(getProductsForAdmin.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
            })

            // create product
            builder.addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            builder.addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            builder.addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            
            // update product
            builder.addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            builder.addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            builder.addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

            // get product by id
            builder.addCase(getProductById.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
            })
            builder.addCase(getProductById.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
            })
            builder.addCase(getProductById.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
            })

            // get products for sellers
            builder.addCase(getProductsForSeller.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
            })
            builder.addCase(getProductsForSeller.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
            })
            builder.addCase(getProductsForSeller.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
            })

            // get top products
            builder.addCase(getTopProducts.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
                state.productLoading = true;
            })
            builder.addCase(getTopProducts.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
                state.productLoading = false;
            })
            builder.addCase(getTopProducts.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
                state.productLoading = false;
            })

            // get latest products
            builder.addCase(getLatestProduct.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
                // state.productLoading = true;
            })
            builder.addCase(getLatestProduct.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
                // state.productLoading = false;
            })
            builder.addCase(getLatestProduct.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
                // state.productLoading = false;
            })

            // get admin dashboard data
            builder.addCase(getAdminData.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
            })
            builder.addCase(getAdminData.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
            })
            builder.addCase(getAdminData.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
            })

            // get seller dashboard data
            builder.addCase(getSellerData.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
            })
            builder.addCase(getSellerData.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
            })
            builder.addCase(getSellerData.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
            })

            // GET ALL BRANDS
            builder.addCase(GetBrands.pending, (state) => {
                state.pageIsLoading = true;
                state.isError = false;
            })
            builder.addCase(GetBrands.fulfilled, (state, action) => {
                state.pageIsLoading = false;
                state.isError = false;
            })
            builder.addCase(GetBrands.rejected, (state, action) => {
                state.pageIsLoading = false;
                state.isError = true;
            })

            // post review
            builder.addCase(postReview.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            builder.addCase(postReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            builder.addCase(postReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
        }
    }
)
export const {getFilterData} = productSlice.actions
export default productSlice.reducer