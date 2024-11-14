import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/policyholders', () => {
        return HttpResponse.json([]);
    }),
    http.get('/api/policyholders/:code/top', () => {
        return HttpResponse.json([]);
    }),
];
