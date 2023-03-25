import apiSlice from "../api/apiSlice";

const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/projects'
        }),
    })
});

export default projectApi;
export const {useGetProjectsQuery} = projectApi;