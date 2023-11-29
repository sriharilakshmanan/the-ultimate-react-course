import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

const slice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createdAt: new Date().toISOString(),
                    },
                };
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt;
            },
        },
        updateName(state, action) {
            state.fullName = action.payload;
        },
    },
});

const {
    reducer,
    actions: { createCustomer, updateName },
} = slice;

export { reducer as default, createCustomer, updateName };
