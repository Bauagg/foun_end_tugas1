const stateGlobal = {
    number: 1
}

const counterReduc = (state = stateGlobal, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                number: state.number + 1
            }

        case 'DECREMENT':
            if (state.number > 0) {
                return {
                    ...state,
                    number: state.number - 1
                }
            }

        default:
            return state
    }
}

export default counterReduc


export const increment = () => {
    return {
        type: 'INCREMENT'
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT'
    };
};