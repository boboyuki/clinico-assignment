import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { policyholderApi } from '../services/policyholder.api';

export type Policyholder = {
  code: string;
  name: string;
  registration_date: string;
  introducer_code: string;
  l: Omit<Policyholder, 'l' | 'r'>[];
  r: Omit<Policyholder, 'l' | 'r'>[];
};

export interface PolicyholderState {
  policyholders: Policyholder[];
  currentCode: string;
}

export const initialState: PolicyholderState = {
  policyholders: [],
  currentCode: '',
};

export const policyholderSlice = createSlice({
  name: 'policyholder',
  initialState,
  reducers: {
    setCurrentPolicyholderCode: (state, action: PayloadAction<string>) => {
      state.currentCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      policyholderApi.endpoints.getPolicyholders.matchFulfilled,
      (state, action) => {
        state.policyholders = action.payload;
        state.currentCode = action.payload[0].code;
      },
    );
    builder.addMatcher(
      policyholderApi.endpoints.getTopPolicyholder.matchFulfilled,
      (state, action) => {
        state.policyholders = action.payload;
        state.currentCode = action.payload[0].code;
      },
    );
  },
});

export const { setCurrentPolicyholderCode } = policyholderSlice.actions;
