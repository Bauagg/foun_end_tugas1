import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Nav, Tab, DropdownButton, Dropdown, InputGroup, Form } from "react-bootstrap";
import axios from "axios";

import styleGetProduct from './getProduct.module.css'
import { Link } from "react-router-dom";

const GetProduct = () => {
    const [getDatas, setGetDatas] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get(`https://sistemtoko.com/public/demo/product`)
            .then((resoult) => setGetDatas(resoult.data.aaData))
            .catch((error) => console.log('get datas error', error))
    }, [])

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
                                        <DropdownButton
                                            title="Category"
                                            id="input-group-dropdown-1"
                                        >
                                            <Dropdown.Item >Electronik</Dropdown.Item>
                                            <Dropdown.Item >Fesion</Dropdown.Item>
                                            <Dropdown.Item >Food</Dropdown.Item>
                                        </DropdownButton>
                                        <Form.Control value={search} aria-label="Text input with dropdown button" placeholder="Search Product"
                                            onChange={(e) => setSearch(e.target.value)} />
                                        <Button>Cari</Button>
                                    </InputGroup>
                                </Tab.Pane>
                                <Tab.Pane eventKey="search_option">
                                    <InputGroup className="mb-3">
                                        <DropdownButton
                                            title="Option"
                                            id="input-group-dropdown-1"
                                        >
                                            <Dropdown.Item >Digital</Dropdown.Item>
                                            <Dropdown.Item >Smartpone</Dropdown.Item>
                                            <Dropdown.Item >Laptop</Dropdown.Item>
                                            <Dropdown.Item >Jas</Dropdown.Item>
                                            <Dropdown.Item >Spatu</Dropdown.Item>
                                            <Dropdown.Item >Kemeja</Dropdown.Item>
                                            <Dropdown.Item >Roti</Dropdown.Item>
                                            <Dropdown.Item >Nasi</Dropdown.Item>
                                            <Dropdown.Item >Daging</Dropdown.Item>
                                        </DropdownButton>
                                        <Form.Control aria-label="Text input with dropdown button" placeholder="Search Product"
                                            onChange={(e) => setSearch(e.target.value)} />
                                        <Button>Cari</Button>
                                    </InputGroup>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Row>
            </Container>

            {/* cart section */}
            <div className="container">
                <div className="row custom-row">
                    {
                        getDatas.map((index) => {
                            return (
                                <div key={index.id} className='col-md-3 col-sm-6 my-2 ps-0'>
                                    < Card className={styleGetProduct.cart} >
                                        <Card.Img className={styleGetProduct.cart_img} variant="top" src={index.photo} />
                                        <Card.Body>
                                            <Card.Title>{index.name}</Card.Title>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h6>Price</h6>
                                                    <p>Rp. {index.price}</p>
                                                </div>
                                                <div>
                                                    <h6>Status</h6>
                                                    <p>{index.status}</p>
                                                </div>
                                            </div>
                                            <Button variant="primary" className={styleGetProduct.btn_beli}>
                                                <Link to={`/product-detail/${index.id}`} className={styleGetProduct.link_beli}>Beli</Link>
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

