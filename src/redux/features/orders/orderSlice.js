import { axiosInstance } from "@/lib/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isError: false,
    isLoading: false,
    dataIsLoading: false,
    orders: []
}

export const createOrder = createAsyncThunk(
    "create/order",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/v1/order/create", data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const getOrdersForAdmin = createAsyncThunk(
    "get/orders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/admin/orders-list", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const getUserOrders = createAsyncThunk(
    "get/user-orders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/user/orders-list", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const getSellerOrders = createAsyncThunk(
    "get/seller-orders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/seller/orders-list", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const getOrderCountForAdmin = createAsyncThunk(
    "get/order-count-for-admin",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/total-count", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const getTotalSalesForAdmin = createAsyncThunk(
    "get/sales-admin",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/total-sales", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)
export const getTotalSalesForSeller = createAsyncThunk(
    "get/sales-seller",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/seller/total-sales", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const getTotalSalesByDateForAdmin = createAsyncThunk(
    "get/total-sales-admin",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/total-sales-date", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error)
        }
    }
)
export const getTotalSalesByDateForSeller = createAsyncThunk(
    "get/total-sales-seller",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/seller/total-sales-date", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getOrderById = createAsyncThunk(
    "get/orderById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/v1/order/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const markAsPayment = createAsyncThunk(
    "update/payment-status",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/api/v1/order/${id}/pay`, {}, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const markAsDelivered = createAsyncThunk(
    "update/delivery-status",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.patch(`/api/v1/order/${id}/delivered`, {}, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
      }
    }
  );

export const getPaymentToken = createAsyncThunk(
    "getPaymentToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/order/payment/braintree", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const postPayment = createAsyncThunk(
    "post/payment",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch("/api/v1/order/payment/braintree", data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

const orderSlice = createSlice(
    {
        name: "order",
        initialState,
        reducers:{},
        extraReducers: (builder) => {
            // create order
          builder.addCase(createOrder.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          builder.addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
          })
          builder.addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
          
          // get orders for admin
          builder.addCase(getOrdersForAdmin.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getOrdersForAdmin.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getOrdersForAdmin.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   get user order list
        builder.addCase(getUserOrders.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getUserOrders.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getUserOrders.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   get seller order
        builder.addCase(getSellerOrders.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getSellerOrders.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getSellerOrders.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   get order count from admin
        builder.addCase(getOrderCountForAdmin.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getOrderCountForAdmin.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getOrderCountForAdmin.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })
          
        // get sales for admin
        builder.addCase(getTotalSalesForAdmin.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getTotalSalesForAdmin.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getTotalSalesForAdmin.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   get sales by date for admin
        builder.addCase(getTotalSalesByDateForAdmin.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getTotalSalesByDateForAdmin.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getTotalSalesByDateForAdmin.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        // get sales for seller
        builder.addCase(getTotalSalesForSeller.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getTotalSalesForSeller.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getTotalSalesForSeller.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   get sales by date for Seller
        builder.addCase(getTotalSalesByDateForSeller.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getTotalSalesByDateForSeller.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getTotalSalesByDateForSeller.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

          // get order by id
          builder.addCase(getOrderById.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getOrderById.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getOrderById.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   mark payment as done
        builder.addCase(markAsPayment.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(markAsPayment.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(markAsPayment.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   mark delivered
        builder.addCase(markAsDelivered.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(markAsDelivered.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(markAsDelivered.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   get payment token
        builder.addCase(getPaymentToken.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(getPaymentToken.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(getPaymentToken.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })

        //   create the payment
        builder.addCase(postPayment.pending, (state, action) => {
            state.dataIsLoading = true;
            state.isError = false;
          })
          builder.addCase(postPayment.fulfilled, (state, action) => {
            state.dataIsLoading = false;
            state.isError = false;
            state.orders = action.payload;
          })
          builder.addCase(postPayment.rejected, (state, action) => {
            state.dataIsLoading = false;
            state.isError = true;
          })
        }
    }
)

export default orderSlice.reducer;