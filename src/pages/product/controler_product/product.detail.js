import { useEffect, useState } from 'react';
import productDetail from '../style.product/product_detail.module.css'
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { CartActionIncremen } from '../../../redux/action/action.-login-logout';

const ProductDetail = () => {
    const { id } = useParams()
    const [productDetailById, setProductDetailById] = useState(null)
    const [qty, setQty] = useState(1)
    const { token } = useSelector(state => state)
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`http://localhost:3000/product/${id}`)
            .then((resoult) => setProductDetailById(resoult.data.datas))
            .catch((error) => console.log('lihat data by id error', error))
    }, [id])

    const hendleCartProduct = () => {

        const requesBody = {
            product: id,
            qty: parseInt(qty)
        }
        axios.post('http://localhost:3000/cart', requesBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                Navigate('/keranjang')
                dispatch(CartActionIncremen())
            })
            .catch((error) => console.log('create cart Error', error))
    }
    return (
        <div className='container'>
            {
                productDetailById === null ? (
                    <Row>
                        <div className='col-12'><p className='text-center'>Loading...</p></div>
                    </Row>
                ) : (
                    <div className={productDetail.container}>
                        <div>
                            <div>
                                <div className={productDetail.detail}>
                                    <img className={productDetail.img} src={productDetailById.image} alt='gambar product detail' />
                                </div>
                                <div>
                                    <div className={productDetail.container2}>
                                        <h2>{productDetailById.name}</h2>
                                        <h3 className={productDetail.h3}>{productDetailById.price}</h3>
                                        <div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Category</td>
                                                        <td>{productDetailById.category.name}</td>
                                                    </tr >
                                                    <tr>
                                                        <td>Description</td>
                                                        <td className={productDetail.td}>{productDetailById.description}</td>
                                                    </tr>
                                                </tbody >
                                            </table >
                                        </div >
                                        <div className={productDetail.btn_group}>
                                            <div>
                                                <button className={productDetail.btn1} onClick={() => {
                                                    if (qty > 1) {
                                                        setQty(qty - 1)
                                                    }
                                                }}>-</button>
                                                <input type="number" placeholder="0" className={productDetail.input1} value={qty} readOnly />
                                                <button className={productDetail.btn1} onClick={() => setQty(qty + 1)}>+</button>
                                            </div>
                                            <div>
                                                <button className={productDetail.btn2} onClick={hendleCartProduct}>
                                                    <AiOutlineShoppingCart className={productDetail.icons} /> Tambah ke keranjang
                                                </button>
                                            </div>
                                        </div>
                                    </div >
                                </div >
                            </div >
                            <div className={productDetail.text}>
                                <h3>Product Invormation</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,</p>
                            </div>
                        </div >
                    </div >
                )
            }
        </div>
    )
}

export default ProductDetail