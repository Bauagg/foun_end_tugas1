import axios from "axios"
import { useState } from "react"
import { Container, Row, Form, Button, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const UpdateAddress = () => {
    const dataAddress = {
        name: '',
        desa: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        detail: '',
        errorName: '',
        errorDesa: '',
        errorKecamatan: '',
        errorKabupaten: '',
        errorProvinsi: '',
        errorDetail: '',
        erroeMessage: ''
    }

    const [data, setData] = useState(dataAddress)
    const { token } = useSelector((state) => state)
    const Navigate = useNavigate()
    const { id } = useParams()

    const hendleAddress = (e) => {
        e.preventDefault()

        if (!data.name) {
            setData({ ...data, errorName: 'Name harus di isi' })
        }

        if (!data.desa) {
            setData({ ...data, errorDesa: 'Desa harus di isi' })
        }

        if (!data.kecamatan) {
            setData({ ...data, errorKecamatan: 'Kecamatan harus di isi' })
        }

        if (!data.kabupaten) {
            setData({ ...data, errorKabupaten: 'Kabupaten harus di isi' })
        }

        if (!data.provinsi) {
            setData({ ...data, errorProvinsi: 'Provinsi harus di isi' })
        }

        if (!data.detail) {
            setData({ ...data, errorDetail: 'Alamat Detail harus di isi' })
        }

        const requseBody = {
            name: data.name,
            kelurahan: data.desa,
            kecamatan: data.kecamatan,
            kabupaten: data.kabupaten,
            provinsi: data.provinsi,
            detail: data.detail
        }

        axios.put(`http://localhost:3000/address/${id}`, requseBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => Navigate('/address'))
            .catch((error) => setData({ ...data, erroeMessage: error }))
    }
    return (
        <div>
            <Container>
                <Row className="mt-4 justify-content-center">
                    <div className="col-md-6">
                        <h1 className="text-center">Update Address</h1>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Username" value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })} isInvalid={data.errorName} />
                                        <Form.Control.Feedback type="invalid">
                                            {data.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Name Desa</Form.Label>
                                        <Form.Control type="text" placeholder="Name Desa" value={data.desa}
                                            onChange={(e) => setData({ ...data, desa: e.target.value })} isInvalid={data.errorDesa} />
                                        <Form.Control.Feedback type="invalid">
                                            {data.errorDesa}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Kecamatan</Form.Label>
                                        <Form.Control type="text" placeholder="Kecamatan" value={data.kecamatan}
                                            onChange={(e) => setData({ ...data, kecamatan: e.target.value })} isInvalid={data.errorKecamatan} />
                                        <Form.Control.Feedback type="invalid">
                                            {data.errorKecamatan}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Kabupaten</Form.Label>
                                        <Form.Control type="text" placeholder="Kabupaten" value={data.kabupaten}
                                            onChange={(e) => setData({ ...data, kabupaten: e.target.value })} isInvalid={data.errorKabupaten} />
                                        <Form.Control.Feedback type="invalid">
                                            {data.errorKabupaten}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Provinsi</Form.Label>
                                <Form.Control type="text" placeholder="Provinsi" value={data.provinsi}
                                    onChange={(e) => setData({ ...data, provinsi: e.target.value })} isInvalid={data.errorProvinsi} />
                                <Form.Control.Feedback type="invalid">
                                    {data.errorProvinsi}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Alamat Detail</Form.Label>
                                <Form.Control as="textarea" rows={3} value={data.detail}
                                    onChange={(e) => setData({ ...data, detail: e.target.value })} isInvalid={data.errorDetail} />
                                <Form.Control.Feedback type="invalid">
                                    {data.errorDetail}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100" onClick={hendleAddress}>Submit</Button>
                        </Form>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateAddress