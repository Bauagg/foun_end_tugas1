export const LoginAction = (role, token, user) => {
    return {
        type: 'LOGIN',
        payload: {
            role,
            token,
            user
        }
    }
}

export const LogoutAction = (user, role) => {
    return {
        type: 'LOGOUT',
        payload: {
            isAuthenticated: false,
            user,
            role
        }
    }
}

export const CartActionIncremen = () => {
    return {
        type: 'INCREMENT_CART_COUNT'
    }
}

export const CartActionDecremet = () => {
    return {
        type: 'DECREMENT_CART_COUNT'
    }
}