import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const slice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose,
                    },
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                deposit(action.payload.amount);
            },
        },
        payLoan(state) {
            if (state.loan === 0) return;
            withdraw(state.loan);
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state) {
            state.isLoading = true;
        },
    },
});

function deposit(amount, currency) {
    if (currency === "USD") {
        return {
            type: "account/deposit",
            payload: amount,
        };
    }

    return async function (dispatch) {
        dispatch({
            type: "account/convertingCurrency",
        });
        const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
        );
        const data = await res.json();
        const amount_after_conversion = data.rates.USD;
        dispatch({
            type: "account/deposit",
            payload: amount_after_conversion,
        });
    };
}

const {
    reducer,
    actions: { withdraw, requestLoan, payLoan },
} = slice;

export { reducer as default, deposit, withdraw, requestLoan, payLoan };
