import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// import componen
import Navbar from "../componen/navbar";
import GetProduct from "../pages/product/controler_product/get.product";
import ProductDetail from "../pages/product/controler_product/product.detail";
import CreateProduct from "../pages/product/controler_product/create.product";
import UpdateProduct from "../pages/product/controler_product/update.product";
import Login from "../pages/users/controler_user/login";
import Register from "../pages/users/controler_user/register";
import CreateAddress from "../pages/address/create.addrees";
import UpdateAddress from "../pages/address/update.address";
import GetAddress from "../pages/address/get.adress";
import Keranjang from "../pages/kranjang/keranjang";
import Invoice from "../pages/invoice/invoice";
import NavbarAdmin from "../componen/navbarAdmin";
import GetProductAdmin from "../pages-admin/getProduct.admin";
import OrderAdmin from "../pages-admin/Order/order-admin";

const IndexRouter = () => {
    const { user, role } = useSelector(state => state)
    return (
        <div>
            {role !== 'admin' && (<Navbar />)}
            {
                role === 'admin' ? <NavbarAdmin /> :
                    <Routes>
                        <Route path="/order" element={<OrderAdmin />} />
                        <Route path="/home" element={<GetProductAdmin />} />
                        <Route path="/" element={<GetProduct />} />
                        <Route path="/product-detail/:id" element={<ProductDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Private Router */}
                        <Route path="/create-product" element={user ? <CreateProduct /> : <Login />} />
                        <Route path="/address" element={user ? <GetAddress /> : <Login />} />
                        <Route path="/invoice" element={user ? <Invoice /> : <Login />} />
                        <Route path="/keranjang" element={user ? <Keranjang /> : <Login />} />
                        <Route path="/create-address" element={user ? <CreateAddress /> : <Login />} />
                        <Route path="/update-address/:id" element={user ? <UpdateAddress /> : <Login />} />
                        <Route path="/update-product/:id" element={user ? <UpdateProduct /> : <Login />} />
                    </Routes>
            }

        </div >
    )
}

export default IndexRouter