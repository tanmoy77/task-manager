import apiSlice from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks'
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: '/tasks',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;

                if (data?.id) {
                    dispatch(apiSlice.util.updateQueryData(
                        "getTasks",
                        undefined,
                        (draft) => {
                            draft.push(data)
                        }
                    ))
                }
            }
        }),
        getTask: builder.query({
            query: (id) => `/tasks/${id}`,
            providesTags: (result, error, arg) => [{type: "Task", id: arg}]
        }),
        editTask: builder.mutation({
            query: ({id, data}) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{type: "Task", id: arg.id}],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                const {data} = await queryFulfilled;

                console.log('edit data: ', data);

                if (data?.id){
                    dispatch(apiSlice.util.updateQueryData(
                        "getTasks",
                        undefined,
                        (draft) => {
                            return draft.map((t) => t.id === data.id ? data : t);
                        }
                    ))
                }
            }
        }), 
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                // optimistic cache update
                const patchResult = dispatch(apiSlice.util.updateQueryData(
                    "getTasks",
                    undefined, (draft) => {
                        return draft.filter(task => task.id !== arg)
                    }
                ));

                try {
                    await queryFulfilled;
                } catch(err) {
                    patchResult.undo();
                }
            }
        }),
        changeStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: {status}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                // optimistic update
                const patchResult = dispatch(apiSlice.util.updateQueryData(
                    "getTasks",
                    undefined,
                    (draft) => {
                        const draftTask = draft.find(t => t.id === arg.id);
                        draftTask.status = arg.status
                    }
                ));

                try {
                    await queryFulfilled;
                } catch(err) {
                    patchResult.undo();
                }
            }
        })
    })
})

export default tasksApi;
export const {useGetTasksQuery, 
              useGetTaskQuery,
              useAddTaskMutation, 
              useEditTaskMutation, 
              useChangeStatusMutation,
              useDeleteTaskMutation} = tasksApi;