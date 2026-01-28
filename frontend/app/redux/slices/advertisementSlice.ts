import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchImagesThunk = createAsyncThunk(
    'fetchImages',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/advertisment`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch images');
        }
    }
);

const AdvertisementSlice = createSlice({
    name: 'Advertisement',
    initialState: {
        images: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImagesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchImagesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            })
            .addCase(fetchImagesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default AdvertisementSlice.reducer;