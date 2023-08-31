const stateCart = {
    qty: 1
}

const reducerCart = (state = stateCart, action) => {
    switch (action.type) {
        case 'INCREMEN':
            return {
                ...state,
                qty: action.paylaod.qty
            }
    }
}

export default reducerCart