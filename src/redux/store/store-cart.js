import reducerCart from "../reducers/reducer-cart"
import { createStore } from "redux"

const storeCart = createStore(reducerCart)

export default storeCart
