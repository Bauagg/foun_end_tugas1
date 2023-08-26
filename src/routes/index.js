import { Route, Routes } from "react-router-dom";

// import componen
import Navbar from "../componen/navbar";
import GetProduct from "../pages/product/get.product";
import ProductDetail from "../pages/product/product.detail";

const IndexRouter = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<GetProduct />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
            </Routes>
        </div>
    )
}

export default IndexRouter