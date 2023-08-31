import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Row, Table, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import CreateAddress from "./create.addrees"
import { Link, useNavigate } from "react-router-dom"

const GetAddress = () => {
    const [dataAddress, setDataAddress] = useState([])
    const { token } = useSelector(state => state)
    const Navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/address', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => setDataAddress(resoult.data.datas))
            .catch((error) => console.log(error))
    }, [])

    if (dataAddress.length === 0) {
        return Navigate('/create-address')
    }

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <div className="col-md-6">
                        <h1 className="text-center">Address</h1>
                        {
                            dataAddress.map((index) => {
                                return (
                                    <div key={index._id}>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>Username</td>
                                                    <td>{index.name}</td>

                                                </tr>
                                                <tr>
                                                    <td>Name Desa</td>
                                                    <td>{index.kelurahan}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kecamatan</td>
                                                    <td>{index.kecamatan}</td>
                                                </tr>
                                                <tr>
                                                    <td>kabupaten</td>
                                                    <td>{index.kabupaten}</td>
                                                </tr>
                                                <tr>
                                                    <td>Provinsi</td>
                                                    <td>{index.provinsi}</td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                        <div>
                                            <h3>Alamat detail</h3>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                                numquam blanditiis harum quisquam eius</p>
                                        </div>
                                        <Button><Link to={`/update-address/${index._id}`} className="text-white text-decoration-none">Update Address</Link></Button>
                                    </div>
                                )
                            })
                        }

                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default GetAddress