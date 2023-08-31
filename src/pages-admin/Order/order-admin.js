import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const OrderAdmin = () => {
    const [dataInvoice, setDataInvoice] = useState([])
    const { token } = useSelector((state) => state)

    useEffect(() => {
        axios.get(`http://localhost:3000/invoice`, { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => setDataInvoice(resoult.data.datas))
            .catch((error) => console.log('get data invoice error', error))
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <div className='col-12 mt-3'>
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
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>1</td>
                                                <td>12000</td>
                                            </tr>
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