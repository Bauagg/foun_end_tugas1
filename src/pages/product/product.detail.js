import { useEffect, useState } from 'react';
import productDetail from './getProduct.module.css'
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
    const { id } = useParams()
    const [productDetailById, setProductDetailById] = useState(null)

    useEffect(() => {
        axios.get(`https://sistemtoko.com/public/demo/single/${id}`)
            .then((resoult) => setProductDetailById(resoult.data))
            .catch((error) => console.log('lihat data by id error', error))
    }, [id])

    console.log(productDetailById)
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
                                    <img alt="image product" className={productDetail.img} src={productDetailById.product_img} />
                                </div>
                                <div>
                                    <div className={productDetail.container2}>
                                        <h2>{productDetailById.product_name}</h2>
                                        <h3 className={productDetail.h3}>{productDetailById.product_price}</h3>
                                        <div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Status</td>
                                                        <td>{productDetailById.product_status}</td>
                                                    </tr >
                                                    <tr>
                                                        <td>Description</td>
                                                        <td className={productDetail.td}>giuhuhoij</td>
                                                    </tr>
                                                </tbody >
                                            </table >
                                        </div >
                                        <div className={productDetail.btn_group}>
                                            <div>
                                                <button className={productDetail.btn1}>-</button>
                                                <input type="number" placeholder="0" className={productDetail.input1} readOnly />
                                                <button className={productDetail.btn1}>+</button>
                                            </div>
                                            <div>
                                                <button className={productDetail.btn2}>
                                                    <AiOutlineShoppingCart className={productDetail.icons} /> Tambah ke keranjang</button>
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