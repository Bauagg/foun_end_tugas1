import { Button, Col, Container, Row, Form } from "react-bootstrap"
import styleKranjang from './style.keranjang.module.css'
import { BsFillTrashFill, BsFillBagCheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CartActionDecremet } from "../../redux/action/action.-login-logout";
import { useNavigate } from "react-router-dom";


const Keranjang = () => {
    const [dataCart, setDataCart] = useState([])
    const [address, setAddress] = useState([])
    const [invoice, setInvoice] = useState([])
    const [errorInvoice, setErrorInvoice] = useState('')
    const { token } = useSelector((state) => state)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/cart', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                setDataCart(resoult.data.datas)
            })
            .catch((error) => console.log('get data cart error', error))

        axios.get(`http://localhost:3000/address`, { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => setAddress(resoult.data.datas))
            .catch((error) => console.log(error))
    }, [])

    const updateCart = (id, qty) => {
        axios.put(`http://localhost:3000/cart/${id}`, { qty }, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get('http://localhost:3000/cart', { headers: { Authorization: `Bearer ${token}` } })
                    .then((resoult) => {
                        setDataCart(resoult.data.datas)
                    })
                    .catch((error) => console.log('get data cart error', error))
            })
            .catch((error) => console.log('update data cart error', error))
    }

    const hendleIncremenQty = (item, index) => {
        const updatedCart = [...dataCart];
        updatedCart[index].qty += 1;
        setDataCart(updatedCart);

        updateCart(item._id, updatedCart[index].qty);
    };

    const hendleDencremenQty = (item, index) => {
        const updatedCart = [...dataCart];
        if (updatedCart[index].qty > 1)
            updatedCart[index].qty -= 1;
        setDataCart(updatedCart);

        updateCart(item._id, updatedCart[index].qty);
    };

    const deleteCart = (id) => {
        axios.delete(`http://localhost:3000/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get('http://localhost:3000/cart', { headers: { Authorization: `Bearer ${token}` } })
                    .then((resoult) => {
                        setDataCart(resoult.data.datas)
                    })
                    .catch((error) => console.log('get data cart error', error))

                dispatch(CartActionDecremet())
            })
            .catch((error) => console.log('get data cart error', error))
    }

    const hendleChekoutInvoice = (cartId) => {
        if (invoice.includes(cartId)) {
            setInvoice(invoice.filter((item) => item !== cartId))
        } else {
            setInvoice([...invoice, cartId])
        }
    }

    const createInvoice = () => {

        if (address.length === 0) {
            return Navigate('/create-address')
        }

        if (invoice.length === 0) {
            return setErrorInvoice('isi dulu chekoutnya mana yang kau pilih')
        }

        const requeseBody = {
            cartId: invoice,
            addressId: address[0]._id
        }

        axios.post('http://localhost:3000/invoice', requeseBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => Navigate('/invoice'))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <Container>
                <Row>
                    <div className="col-12 mt-5">
                        {
                            dataCart.length === 0 ? (
                                <div>
                                    <h1 className="text-center">Anda belum memiliki cart</h1>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-center">Keranjang</h1>
                                    {
                                        dataCart.map((item, index) => {
                                            return (
                                                <div key={item._id}>
                                                    <Row>
                                                        <Col>
                                                            <div className={styleKranjang.btn_sampah}>
                                                                <Button className={styleKranjang.btn3} onClick={() => deleteCart(item._id)}><BsFillTrashFill /></Button>
                                                            </div>
                                                        </Col>

                                                        <Col  >
                                                            <div className={styleKranjang.container} >
                                                                <h4 className="text-center mb-3">Product</h4>
                                                                <div className="d-flex">
                                                                    <img className={styleKranjang.img_product} alt="image Product" src={item.product.image} />
                                                                    <div className="ps-3">
                                                                        <h5>{item.product.name}</h5>
                                                                        <h6>Description</h6>
                                                                        <p>{item.product.description}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>

                                                        <Col>
                                                            <div className={styleKranjang.btn_qty}>
                                                                <h4 className="text-center mb-4">Qty</h4>
                                                                <button className={styleKranjang.btn1} onClick={() => hendleDencremenQty(item, index)} >-</button>
                                                                <input type="number" placeholder={item.qty} className={styleKranjang.input1} value={item.qty} readOnly />
                                                                <button className={styleKranjang.btn1} onClick={() => hendleIncremenQty(item, index)} >+</button>
                                                            </div>
                                                        </Col>

                                                        <Col>
                                                            <div className={styleKranjang.container_price}>
                                                                <h4 className={styleKranjang.judul_price}>Price</h4>
                                                                <h6 className="text-center">Rp. {item.product.price}</h6>
                                                            </div>
                                                        </Col>

                                                        <Col>
                                                            <div className={styleKranjang.btn_chekout}>
                                                                <Form.Check
                                                                    aria-label="option 1"
                                                                    label='Chekout'
                                                                    isValid
                                                                    isInvalid={!!errorInvoice}
                                                                    className={styleKranjang.btn4}
                                                                    checked={invoice.includes(item._id)}
                                                                    onChange={() => hendleChekoutInvoice(item._id)}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }

                        {
                            dataCart.length === 0 ? (
                                <div ></div>
                            ) : (
                                <div>
                                    <Button className={styleKranjang.btn5} onClick={createInvoice}><BsFillBagCheckFill /> Bayar</Button>
                                </div>
                            )
                        }
                    </div>
                </Row>
            </Container>
        </div >
    )
}

export default Keranjang