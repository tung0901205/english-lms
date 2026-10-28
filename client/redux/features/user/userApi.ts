import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: 'update-user-avatar',
        method: 'PUT',
        body: { avatar },
        credentials: 'include',
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: 'update-user-info',
        method: 'PUT',
        body: { name },
        credentials: 'include',
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: 'update-user-password',
        method: 'PUT',
        body: { oldPassword, newPassword },
        credentials: 'include',
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, code, newPassword }) => ({
        url: "reset-password",
        method: "POST",
        body: { email, code, newPassword },
      }),
    }),
  }),
});

export const { 
  useUpdateAvatarMutation, 
  useEditProfileMutation, 
  useUpdatePasswordMutation, 
  useForgotPasswordMutation,
  useResetPasswordMutation
} = userApi;