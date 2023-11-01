import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminToken } from "../utils/adminAuth";

const token = AdminToken();
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    // prepareHeaders: (headers) => {
    //   const token = adminToken;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   headers.set("Content-type", "application/json; charset=UTF-8");
    //   return headers;
    // },
  }),
  tagTypes: ["Admin", "User", "Tasks"],
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "registration/admins",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Admin"],
    }),
    getUserProfile: builder.query({
      query: (userToken) => ({
        url: "user-update-tasks/my-profile",
        method: "GET",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${userToken}`,
        },
      }),
      providesTags: ["User"],
    }),

    getAdminProfile: builder.query({
      query: ({ testToken }) => ({
        url: `profile/admin`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${testToken}`,
        },
      }),
      providesTags: ["Admin"],
    }),
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "registration/loginAdmin",
        method: "POST",

        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Admin"],
    }),
    createTask: builder.mutation({
      query: ({ task, tokenTest }) => ({
        url: "tasks",
        method: "POST",
        body: task,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${tokenTest}`,
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
    createUser: builder.mutation({
      query: ({ user, tokenTest }) => ({
        url: "users/createUser",
        method: "POST",
        body: user,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${tokenTest}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({ _id, tokenTest }) => ({
        url: "users/",
        method: "DELETE",
        body: { _id },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${tokenTest}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: ({ currentPage, tokenTest }) => ({
        url: `users/all-users?page=${currentPage}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${tokenTest}`,
        },
      }),

      providesTags: ["User", "Admin"],
    }),
    getAllTasks: builder.query({
      query: (testToken) => ({
        url: `tasks/all-tasks`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${testToken}`,
        },
      }),

      providesTags: ["Tasks", "Admin"],
    }),
    deleteProject: builder.mutation({
      query: ({ assigned_to_role, testToken }) => ({
        url: `tasks/all-tasks/specific-tasks`,
        method: "DELETE",
        body: { assigned_to_role },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${testToken}`,
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ task_id, testToken }) => ({
        url: `tasks/update-task`,
        method: "PATCH",
        body: { task_id },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${testToken}`,
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateUser: builder.mutation({
      query: ({ _id, userName, role, tokenTest }) => ({
        url: `users/update-users`,
        method: "PATCH",
        body: { _id, userName, role },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${tokenTest}`,
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "users-login/login",
        method: "POST",

        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    getRoles: builder.query({
      query: ({ token, roles }) => ({
        url: `tasks/all-tasks/${roles}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }),

      providesTags: ["Tasks", "Admin"],
    }),

    getUserByRole: builder.query({
      query: ({ token, roles }) => ({
        url: `users/users/${roles}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }),

      providesTags: ["Tasks", "Admin"],
    }),
    getUserByTask: builder.query({
      query: (testToken) => ({
        url: `user-update-tasks/get-all-user-assigned-task`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${testToken}`,
        },
      }),

      providesTags: ["Tasks", "User"],
    }),
    updateUserTask: builder.mutation({
      query: ({ task_id, testToken }) => ({
        url: `user-update-tasks/update-task`,
        method: "PATCH",
        body: { task_id },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${testToken}`,
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
    taskSeen: builder.mutation({
      query: ({ task_id, userToken }) => ({
        url: `user-update-tasks/task-seen`,
        method: "PATCH",
        body: { task_id },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${userToken}`,
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});
export const {
  useCreateAdminMutation,
  useLoginAdminMutation,
  useGetAdminProfileQuery,
  useCreateTaskMutation,
  useCreateUserMutation,
  useGetAllTasksQuery,
  useDeleteUserMutation,
  useGetUserByTaskQuery,
  useGetAllUsersQuery,
  useDeleteProjectMutation,
  useUpdateTaskMutation,
  useUpdateUserTaskMutation,
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useLoginUserMutation,
  useGetRolesQuery,
  useGetUserByRoleQuery,
  useTaskSeenMutation,
} = apiSlice;
