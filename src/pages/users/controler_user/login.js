import { Container, Row, Form, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import styleLogin from '../style.user/style.login.module.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { LoginAction } from "../../../redux/action/action.-login-logout";

const Login = () => {
    const stateMenejemen = {
        email: '',
        password: '',
        isSubmmiting: false,
        errorMessage: null,
        emailErrorMessage: null,
        passwordErrorMessage: null
    }

    const dispatch = useDispatch()
    const Navbar = useNavigate()
    const [data, setData] = useState(stateMenejemen)

    const hendleLogin = (e) => {
        e.preventDefault()

        setData({ ...data, isSubmmiting: true, errorMessage: null })

        const validateEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!validateEmail.test(data.email)) {
            setData({ ...data, isSubmmiting: false, emailErrorMessage: 'Invalide Email Vormate' })
            return
        }

        if (data.password.length < 3) {
            setData({ ...data, passwordErrorMessage: 'password harus di isi' })
            return
        }

        const requesBody = {
            email: data.email,
            password: data.password,

        }

        axios.post('http://localhost:3000/login', requesBody)
            .then((resoult) => {
                const { role, token, name } = resoult.data.datas
                dispatch(LoginAction(role, token, name))
                if (role === 'admin') {
                    Navbar('/home')
                } else {
                    Navbar('/')
                }
            })
            .catch((error) => setData({ ...data, errorMessage: error.response.data.message }))
    }

    return (
        <div>
            <Container>
                <Row className="justify-content-center align-items-center">
                    <div className="col-md-4 mt-5">
                        <h1 className="text-center">Login</h1>
                        {data.errorMessage && <p className="text-center text-danger">{data.errorMessage}</p>}
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={data.email} placeholder="Enter email"
                                    onChange={(e) => setData({ ...data, email: e.target.value })} isInvalid={!!data.emailErrorMessage} />
                                <Form.Control.Feedback type="invalid">
                                    {data.emailErrorMessage}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })} isInvalid={!!data.passwordErrorMessage} />
                                <Form.Control.Feedback type="invalid">
                                    {data.passwordErrorMessage}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" className="w-100" onClick={hendleLogin}>Login</Button>
                        </Form>
                        <p className="mt-3">Belum <Link to='/register' className={styleLogin.btn_daftar}>Daftar</Link> akun</p>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Login