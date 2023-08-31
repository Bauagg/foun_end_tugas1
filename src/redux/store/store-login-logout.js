import { createStore } from "redux"
import counterReducersUser from "../reducers/reducer-login.-logout"


const storeUser = createStore(counterReducersUser)

export default storeUser


