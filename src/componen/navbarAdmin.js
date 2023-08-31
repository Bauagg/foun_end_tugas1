import styleNavbar from './style.navbar.admin.module.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { LogoutAction } from '../redux/action/action.-login-logout'

// import componen
import CreateProduct from '../pages/product/controler_product/create.product'
import UpdateProduct from '../pages/product/controler_product/update.product'
import GetProductAdmin from '../pages-admin/getProduct.admin'
import OrderAdmin from '../pages-admin/Order/order-admin'



// import image 
import imageNavbar from '../images/Frame 10.png'
import iconProduct from '../images/Frame 1.png'
import iconOrder from '../images/Frame 1 (1).png'
import iconPengaturan from '../images/Frame 1 (2).png'

const NavbarAdmin = () => {
    const dispact = useDispatch()
    const Navigate = useNavigate()

    const hendleLogout = () => {
        const user = null
        dispact(LogoutAction(user))
        Navigate('/login')
    }

    return (
        <div className={styleNavbar.container}>
            <div className={styleNavbar.sidebar}>
                <div className={styleNavbar.header}>
                    <div className={styleNavbar.list_item}>
                        <Link className={styleNavbar.description_judul}>
                            <p>A. Mambaus sholihin</p>
                        </Link>
                    </div>
                    <div>
                        <img alt='image navbar' src={imageNavbar} className={styleNavbar.image_navbar} />
                    </div>
                </div>

                <div className={styleNavbar.main}>
                    <div className={styleNavbar.list_item}>
                        <Link to='/home' className={styleNavbar.link}>
                            <img className={styleNavbar.icon} alt='image icon' src={iconProduct} />
                            <span className={styleNavbar.desscription}>Product</span>
                        </Link>
                    </div>
                    <div className={styleNavbar.list_item}>
                        <Link to='/order' className={styleNavbar.link}>
                            <img className={styleNavbar.icon} alt='image icon' src={iconOrder} />
                            <span className={styleNavbar.desscription}>Order</span>
                        </Link>
                    </div>
                    <div className={styleNavbar.list_item}>
                        <Link className={styleNavbar.link}>
                            <img className={styleNavbar.icon} alt='image icon' src={iconPengaturan} />
                            <span className={styleNavbar.desscription}>Setting</span>
                        </Link>
                    </div>

                    <Button variant="warning" className={styleNavbar.btn_logout} onClick={hendleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            <div className={styleNavbar.main_content}>
                <Routes>
                    <Route path="/home" element={<GetProductAdmin />} />
                    <Route path="/create-product" element={<CreateProduct />} />
                    <Route path="/update-product/:id" element={<UpdateProduct />} />
                    <Route path="/order" element={<OrderAdmin />} />
                </Routes>
            </div>
        </div>
    )
}

export default NavbarAdmin