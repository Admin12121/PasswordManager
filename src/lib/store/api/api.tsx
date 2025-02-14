import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createHeaders = (
  token?: string,
  contentType: string = "application/json"
) => {
  const headers: HeadersInit = { "Content-type": contentType };
  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const buildQueryParams = (
  params: Record<string, string | number | string[] | undefined>
) => {
  const queryParams = Object.entries(params)
    .filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== 0 &&
        !(Array.isArray(value) && value.length === 0)
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryParams ? `?${queryParams}` : "";
};

export const userAuthapi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}`,
  }),
  endpoints: (builder) => ({
    userDevice: builder.mutation({
      query: (user) => ({
        url: "api/userauth/users/device/",
        method: "POST",
        body: user,
        headers: createHeaders(),
      }),
    }),
    allUsers: builder.query({
      query: ({ username, search, rowsperpage, page, exclude_by, token }) => {
        return {
          url: `api/userauth/admin-users/${
            username ? `by-username/${username}/` : ""
          }${buildQueryParams({
            search,
            page_size: rowsperpage,
            page,
            exclude_by,
          })}`,
          method: "GET",
          headers: createHeaders(token),
        };
      },
    }),
    getLoggedUser: builder.query({
      query: ({ token }) => ({
        url: "api/userauth/users/profile/",
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    getUserProfile: builder.query({
      query: ({ username }) => ({
        url: `api/userauth/users/?name=${username}`,
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ NewFormData, token }) => ({
        url: `api/userauth/users/12/`,
        method: "PATCH",
        body: NewFormData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData }) => ({
        url: "api/userauth/changepassword/",
        method: "POST",
        body: actualData,
        headers: createHeaders(),
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "api/userauth/token/refresh/",
        method: "POST",
        body: refreshToken,
        headers: createHeaders(),
      }),
    }),
    getLogins: builder.query({
      query: ({ token, slug }) => ({
        url: `/api/vault/logins/${buildQueryParams({ slug })}/`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
  }),
});

export const {
  useUserDeviceMutation,
  useAllUsersQuery,
  useGetLoggedUserQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangeUserPasswordMutation,
  useRefreshTokenMutation,
  useGetLoginsQuery,
} = userAuthapi;
