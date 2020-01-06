import { requestStart, requestEnd, requestsReset } from './../actions/http.actions';
import { createReducer, on, Action } from '@ngrx/store';


export interface Http {
  id: number | string;
  url: string;
}

export const httpFeatureKey = 'http';
export interface State {
    requests: Http[];
    loading: boolean;
}

export const initialState: State = {
    requests: [],
    loading: false
};

const _httpReducer = createReducer(
    initialState,
    on(requestStart, (state, { request }) => ({
        loading: true,
        requests: [...state.requests, request],
    })),
    on(requestEnd, (state, { request }) => {
        const activeRequests = state.requests.filter((req) => req.id !== request.id);
        return {
            requests: activeRequests,
            loading: activeRequests.length > 0
        };
    }),
    on(requestsReset, () => initialState));

export function httpReducer(state: State | undefined, action: Action) {
    return _httpReducer(state, action);
}
