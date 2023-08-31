import styleGetProduct from './style.product.admin.module.css'
import { Card, Button, Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const GetProductAdmin = () => {
    const [getDatas, setGetDatas] = useState([])
    const { token } = useSelector((state) => state)
    console.log(token)

    useEffect(() => {
        axios.get(`http://localhost:3000/product`)
            .then((resoult) => setGetDatas(resoult.data.datas))
            .catch((error) => console.log('get datas error', error))
    }, [])

    const hendleDeleteProduct = (id) => {
        axios.delete(`http://localhost:3000/product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get('http://localhost:3000/product')
                    .then((resoult) => setGetDatas(resoult.data.datas))
                    .catch((error) => console.log('get data dari fungsi hendle delete product error', error))
            })
            .catch((error) => console.log('delete product error', error))
    }

    return (
        <div>
            <Container>
                <div className='row custom-row'>
                    <div className='col-md-12'>
                        <div className='row'>

                            <div className='d-flex justify-content-between align-items-center my-3'>
                                <h1>Dasbord Admin</h1>
                                <Button variant="primary" className='me-3'>
                                    <Link to='/create-product' className={styleGetProduct.btn_beli}> Create Product</Link>
                                </Button>
                            </div>
                            {
                                getDatas.map((index) => {
                                    return (
                                        <div key={index._id} className='col-md-3 col-sm-6 my-1 ps-0'>
                                            < Card className={styleGetProduct.cart} >
                                                <Card.Img className={styleGetProduct.cart_img} variant="top" src={index.image} />
                                                <Card.Body>
                                                    <Card.Title>Laptop Asusu</Card.Title>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h6>Price</h6>
                                                            <p>Rp. 12000</p>
                                                        </div>
                                                        <div>
                                                            <h6 className="text-start ps-5">Category</h6>
                                                            <p className="text-start ps-5">Electronik</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="warning" className={styleGetProduct.btn_beli}>
                                                        <Link to={`/update-product/${index._id}`} className={styleGetProduct.btn_beli}>Update</Link>
                                                    </Button>
                                                    <Button variant="danger" className={styleGetProduct.btn_delete}
                                                        onClick={() => hendleDeleteProduct(index._id)}>
                                                        Delete
                                                    </Button>
                                                </Card.Body>
                                            </Card >
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default GetProductAdmin
