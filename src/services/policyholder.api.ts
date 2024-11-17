import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Policyholder = {
  code: string;
  name: string;
  registration_date: string;
  introducer_code: string;
  l: Policyholder[];
  r: Policyholder[];
};

export const policyholderApi = createApi({
  reducerPath: 'policyholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPolicyholders: builder.query<Policyholder[], { code: string }>({
      query: ({ code }) => `policyholders?code=${code}`,
    }),
    getTopPolicyholder: builder.query<Policyholder[], { code: string }>({
      query: ({ code }) => `policyholders/${code}/top`,
    }),
  }),
});

export const {
  useGetPolicyholdersQuery,
  useGetTopPolicyholderQuery,
  useLazyGetTopPolicyholderQuery,
  useLazyGetPolicyholdersQuery,
} = policyholderApi;
