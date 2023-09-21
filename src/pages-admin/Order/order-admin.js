import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Container, Row, Table, Form, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const OrderAdmin = () => {
    const [dataInvoice, setDataInvoice] = useState([])
    const [status, setStatus] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const { token } = useSelector((state) => state)
    const Navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3000/invoice`, { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                setDataInvoice(resoult.data.datas)
            })
            .catch((error) => console.log('get data invoice error', error))
    }, [])

    const hendleUpdateStatus = (e) => {
        e.preventDefault()

        const pendingInvoiceIds = dataInvoice
            .filter((invoice) => invoice.isPaid === 'pending')
            .map((invoice) => invoice._id);

        if (!status || status === 'Update Status') {
            return setErrorStatus('Mohon pilih status yang valid.')
        }

        const requesBody = {
            invoiceId: [...pendingInvoiceIds],
            isPaid: status
        }

        axios.put('http://localhost:3000/invoice', requesBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => Navigate('/order-success'))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <Container>
                <Row>
                    <div className='col-12 mt-3'>
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h3>Table Order</h3>
                            <Button><Link to='/order-success' className="text-white fw-bold text-decoration-none">Table Order Success</Link></Button>
                        </div>
                        <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Update Status
                            </Form.Label>
                            <Col sm="10">
                                <div className='d-flex'>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        isInvalid={errorStatus}
                                        className='mx-2'
                                    >
                                        <option>Update Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="success">Success</option>
                                    </Form.Select>
                                    <Button type='submit' onClick={hendleUpdateStatus} className='fw-bold'>Update</Button>
                                </div>
                            </Col>
                        </Form.Group>

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
                                                    if (index.isPaid === 'pending') {
                                                        return (
                                                            <tr key={item._id}>
                                                                <td>{index._id}</td>
                                                                <td>{index.user.full_name}</td>
                                                                <td>{item.product.name}</td>
                                                                <td><p className='text-danger'>{index.isPaid}</p></td>
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

export default OrderAdmin