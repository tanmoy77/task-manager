import apiSlice from "../api/apiSlice";

const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeamMembers: builder.query({
            query: () => '/team'
        }),
    })
})

export default teamApi;
export const {useGetTeamMembersQuery} = teamApi;