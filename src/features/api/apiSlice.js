import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://task-manager-mock-backend.onrender.com/'
    }),
    tagTypes: ["Task"],
    endpoints: (builder) => ({
        
    })
});

export default apiSlice;