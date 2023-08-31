import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"

const Invoice = () => {
    const [dataInvoice, setDataInvoice] = useState([])
    const { token } = useSelector((state) => state)

    useEffect(() => {
        axios.get(`http://localhost:3000/invoice`, { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                console.log(resoult.data.datas)
                setDataInvoice(resoult.data.datas)
            })
            .catch((erroe) => console.log(erroe))
    }, [])

    return (
        <div>
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center">History</h1>
                        {
                            dataInvoice.length === 0 ? (
                                <div>
                                    <h5 className="text-center">Anda belum punya History</h5>
                                </div>
                            ) : (

                                dataInvoice.map((index) => {
                                    return (
                                        <div key={index._id}>
                                            <h4>Invoice</h4>
                                            {
                                                index.carts.map((itemCart) => {
                                                    return (
                                                        <div key={itemCart._id}>
                                                            <Table striped>
                                                                <thead>
                                                                    <tr>
                                                                        <th>No Resi</th>
                                                                        <th>Name Product</th>
                                                                        <th>Qty</th>
                                                                        <th>Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{index.invoiceNumber}</td>
                                                                        <td>{itemCart.product.name}</td>
                                                                        <td>{itemCart.qty}</td>
                                                                        <td>Rp. {itemCart.product.price}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Total</td>
                                                                        <td colSpan={2}></td>
                                                                        <td>Rp. {itemCart.qty * itemCart.product.price}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    )
                                                })
                                            }

                                            <div>
                                                <h4>ALamat</h4>
                                                <div>
                                                    <Table striped>
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Username</th>
                                                                <th>Name Desa</th>
                                                                <th>Kecamatan</th>
                                                                <th>Kabupaten</th>
                                                                <th>Provinsi</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>{index.address.name}</td>
                                                                <td>{index.address.kelurahan}</td>
                                                                <td>{index.address.kecamatan}</td>
                                                                <td>{index.address.kabupaten}</td>
                                                                <td>{index.address.provinsi}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Invoice