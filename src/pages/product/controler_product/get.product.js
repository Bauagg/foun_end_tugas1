import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Nav, Tab, DropdownButton, Dropdown, InputGroup, Form } from "react-bootstrap";
import axios from "axios";
import styleGetProduct from '../style.product/getProduct.module.css'
import { Link } from "react-router-dom";

const GetProduct = () => {
    const [getDatas, setGetDatas] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [searchTag, setSearchTag] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3000/product`)
            .then((resoult) => setGetDatas(resoult.data.datas))
            .catch((error) => console.log('get datas error', error))
    }, [])

    const hendeleSearch = () => {
        if (search) {
            axios.get(`http://localhost:3000/product?searchProduct=${search}`)
                .then((resoult) => setGetDatas(resoult.data.datas))
                .catch((error) => console.log('get datas error', error))
        } else if (category) {
            axios.get(`http://localhost:3000/product?searchCategory=${category}`)
                .then((resoult) => setGetDatas(resoult.data.datas))
                .catch((error) => console.log('get datas error', error))
        } else if (searchTag) {
            axios.get(`http://localhost:3000/product?searchTag=${searchTag}`)
                .then((resoult) => setGetDatas(resoult.data.datas))
                .catch((error) => console.log('get datas error', error))
        }
    }

    return (
        <div>
            {/* search section */}
            <Container className={styleGetProduct.container_search}>
                <Row className="justify-content-center">
                    <div className={`col-md-8 ${styleGetProduct.btn_category}`}>
                        <Tab.Container defaultActiveKey='category'>
                            <Nav variant="tabs" defaultActiveKey="category">
                                <Nav.Item>
                                    <Nav.Link eventKey="category">Category</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="search_option">Option</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="category">
                                    <InputGroup className="mb-3">

                                        {/* dropdown category */}
                                        <DropdownButton
                                            title={category.length > 1 ? category : 'Category'}
                                            id="input-group-dropdown-1"
                                        >
                                            <Dropdown.Item
                                                onClick={() => {
                                                    setCategory('Elektronik')
                                                    setSearch('')
                                                    setSearchTag('')
                                                }}
                                            >
                                                Electronik
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setCategory('Fesion')
                                                    setSearch('')
                                                    setSearchTag('')
                                                }}
                                            >
                                                Fesion
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setCategory('Food')
                                                    setSearch('')
                                                    setSearchTag('')
                                                }}
                                            >
                                                Food
                                            </Dropdown.Item>
                                        </DropdownButton>
                                        {/* dropdown category */}

                                        <Form.Control value={search} aria-label="Text input with dropdown button" placeholder="Search Product"
                                            onChange={(e) => {
                                                setSearch(e.target.value)
                                                setCategory('')
                                            }} />
                                        <Button type="submit" onClick={hendeleSearch}>Cari</Button>
                                    </InputGroup>
                                </Tab.Pane>
                                <Tab.Pane eventKey="search_option">
                                    <InputGroup className="mb-3">

                                        {/* Dropdown Tag */}
                                        <DropdownButton
                                            title={searchTag.length > 1 ? searchTag : 'Option'}
                                        >
                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('digital')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Digital
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('smartphone')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Smartphone
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('laptop')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Laptop
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('jas')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Jas
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('sepatu')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Sepatu
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('kemeja')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Kemeja
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('roti')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Roti
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('nasi')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Nasi
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    setSearchTag('daging')
                                                    setSearch('')
                                                    setCategory('')
                                                }}
                                            >
                                                Daging
                                            </Dropdown.Item>
                                        </DropdownButton>
                                        {/* selesai dropdown tag */}

                                        <Form.Control value={search} aria-label="Text input with dropdown button" placeholder="Search Product"
                                            onChange={(e) => {
                                                setSearch(e.target.value)
                                                setSearchTag('')
                                            }} />
                                        <Button type="submit" onClick={hendeleSearch}>Cari</Button>
                                    </InputGroup>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Row>
            </Container>
            {/* serch section */}

            {/* cart section */}
            <div className="container">
                <div className="row custom-row">
                    {
                        getDatas.map((index) => {
                            return (
                                <div key={index._id} className='col-md-3 col-sm-6 my-2 ps-0'>
                                    < Card className={styleGetProduct.cart} >
                                        <Card.Img className={styleGetProduct.cart_img} variant="top" src={index.image} />
                                        <Card.Body>
                                            <Card.Title>{index.name}</Card.Title>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h6>Price</h6>
                                                    <p>Rp. {index.price}</p>
                                                </div>
                                                <div>
                                                    <h6 className="text-start ps-5">Category</h6>
                                                    <p className="text-start ps-5">{index.category.name}</p>
                                                </div>
                                            </div>
                                            <Button variant="primary" className={styleGetProduct.btn_beli}>
                                                <Link to={`/product-detail/${index._id}`} className={styleGetProduct.link_beli}>Beli</Link>
                                            </Button>
                                        </Card.Body>
                                    </Card >
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        </div>
    )
}

export default GetProduct

