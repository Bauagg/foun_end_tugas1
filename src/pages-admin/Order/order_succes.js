import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const [dataInvoice, setDataInvoice] = useState([])
    const { token } = useSelector((state) => state)

    useEffect(() => {
        axios.get(`http://localhost:3000/invoice`, { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                setDataInvoice(resoult.data.datas)
                console.log(resoult.data.datas)
            })
            .catch((error) => console.log('get data invoice error', error))
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <div className='col-12 mt-3'>
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h3>Table Order</h3>
                            <Button><Link to='/order' className="text-white fw-bold text-decoration-none">Kembali</Link></Button>
                        </div>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Username</th>
                                    <th>Name Product</th>
                                    <th>Status</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            {
                                dataInvoice.map((index) => {
                                    return (
                                        <tbody key={index._id}>

                                            {
                                                index.carts.map((item) => {
                                                    if (index.isPaid === 'success') {
                                                        return (
                                                            <tr key={item._id}>
                                                                <td>{index._id}</td>
                                                                <td>{index.user.full_name}</td>
                                                                <td>{item.product.name}</td>
                                                                <td>{index.isPaid}</td>
                                                                <td>{item.qty}</td>
                                                                <td>{item.qty * item.product.price}</td>
                                                            </tr>
                                                        )
                                                    }

                                                })
                                            }


                                        </tbody>
                                    )
                                })
                            }
                        </Table>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default OrderSuccess


