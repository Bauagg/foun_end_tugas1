import axios from "axios"
import { useState } from "react"
import { Container, Form, Col, Button, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate, useParams, Link } from "react-router-dom"

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [price, setPrica] = useState('')
    const [image, setimage] = useState('')
    const [category, setCategory] = useState('')
    const [tag, setTag] = useState([])
    const [errorName, setErrorName] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorStock, setErrorStock] = useState('')
    const [errorPrice, setErrorPrice] = useState('')
    const [errorImage, setErrorImage] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [errorTag, setErrorTag] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { token } = useSelector((state) => state)
    const Navigate = useNavigate()
    const { id } = useParams()

    const hendleProductTag = (option) => {
        if (tag.includes(option)) {
            setTag(tag.filter(item => item !== option));
        } else {
            setTag([...tag, option]);
        }
    }

    const hendleCreateProduct = (e) => {
        e.preventDefault()

        if (!name) {
            return setErrorName('Name harus di isi')
        }

        if (!description) {
            return setErrorDescription('Description harus di isi')
        }

        if (!stock) {
            return setErrorStock('Stock harus di isi')
        }

        if (!price) {
            return setErrorPrice('Price harus di isi')
        }

        if (!image) {
            return setErrorImage('Image harus di isi')
        }

        if (!category) {
            return setErrorCategory('Category harus di isi')
        }

        if (tag.length === 0) {
            return setErrorTag('pilih salah satu atau lebih')
        }

        const requesBody = { name, description, stock: parseInt(stock), price: parseInt(price), image, category, tag }
        axios.put(`http://localhost:3000/product/${id}`, requesBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => Navigate('/home'))
            .catch((error) => setErrorMessage(error))
    }

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <div className="col-md-8">
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h1>Update Product</h1>
                            <Button variant="primary" className='me-3'>
                                <Link to='/home' className="text-white fw-bold text-decoration-none"> Kembali</Link>
                            </Button>
                        </div>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama Product</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name Product"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            isInvalid={!!errorName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Stock Product</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Stock Product"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            isInvalid={!!errorStock}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorStock}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Category Product</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            isInvalid={!!errorCategory}
                                        >
                                            <option>Open this select menu</option>
                                            <option value="Elektronik">Electronik</option>
                                            <option value="Fesion">Fesion</option>
                                            <option value="Food">Food</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errorCategory}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Price Product</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Price Product"
                                            value={price}
                                            onChange={(e) => setPrica(e.target.value)}
                                            isInvalid={!!errorPrice}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorPrice}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/* Other form groups */}
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Image url</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name Product"
                                            value={image}
                                            onChange={(e) => setimage(e.target.value)}
                                            isInvalid={!!errorImage}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorImage}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            isInvalid={!!errorDescription}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorDescription}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <div> <Form.Label>Product Option</Form.Label></div>
                                        <div>
                                            {['digital', 'smartphone', 'laptop', 'jas', 'sepatu', 'kemeja', 'roti', 'nasi', 'daging'].map((option) => (
                                                <div key={option} className="md-2 d-inline">
                                                    <Form.Check
                                                        inline
                                                        label={option}
                                                        type="checkbox"
                                                        id={`inline-checkbox-${option}`}
                                                        onChange={() => hendleProductTag(option)}
                                                        checked={tag.includes(option)}
                                                        isInvalid={!!errorTag}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errorTag}
                                                    </Form.Control.Feedback>
                                                </div>
                                            ))}
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className="w-100" onClick={hendleCreateProduct}>
                                Submit
                            </Button>
                        </Form>

                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateProduct
