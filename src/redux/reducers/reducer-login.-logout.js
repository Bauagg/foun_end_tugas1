const stateGlobal = {
    isAuthenticated: false,
    role: null,
    token: null,
    user: null,
    cart: 0
};

const counterReducersUser = (state = stateGlobal, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                role: action.payload.role,
                token: action.payload.token,
                user: action.payload.user
            }

        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                role: null
            }

        case 'INCREMENT_CART_COUNT':
            return {
                ...state,
                cart: state.cart + 1
            }

        case 'DECREMENT_CART_COUNT':
            return {
                ...state,
                cart: state.cart - 1
            }

        default:
            return state
    }
}

export default counterReducersUser