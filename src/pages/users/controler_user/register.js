import axios from "axios"
import { useState } from "react"
import { Container, Row, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import styleRegister from '../style.user/style.login.module.css'
import { Link } from "react-router-dom"

const Register = () => {

    const dataRegister = {
        full_name: '',
        email: '',
        password: '',
        role: '',
        errorEmail: '',
        errorPassword: '',
        errorRole: '',
        errorFull_name: ''
    }

    const [data, setData] = useState(dataRegister)
    const Navigate = useNavigate()

    const hendleregister = (e) => {
        e.preventDefault()

        if (!data.full_name) {
            setData({ ...data, errorFull_name: 'Username harus di isi' })
            return
        }

        const validateEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!validateEmail.test(data.email)) {
            setData({ ...data, errorEmail: 'Email Non Formate' })
            return
        }

        if (data.password.length < 3) {
            setData({ ...data, errorPassword: 'password kurang kuwat' })
            return
        }

        const requesBody = {
            full_name: data.full_name,
            email: data.email,
            password: data.password,
            role: data.role,
        }

        axios.post('http://localhost:3000/register', requesBody)
            .then(() => {
                alert('register succes')
                Navigate('/login')
            })
            .catch((errors) => setData({ ...data, errorEmail: errors.response.data.error }))
    }

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <div className="col-md-5 mt-5">
                        <h1 className="text-center">Register</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={data.full_name}
                                    onChange={(e) => setData({ ...data, full_name: e.target.value })} isInvalid={!!data.errorFull_name} />
                                <Form.Control.Feedback type="invalid">
                                    {data.errorFull_name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })} isInvalid={!!data.errorEmail} />
                                <Form.Control.Feedback type="invalid">
                                    {data.errorEmail}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })} isInvalid={!!data.errorPassword} />
                                <Form.Control.Feedback type="invalid">
                                    {data.errorPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="User"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                            value='user'
                                            checked={data.role === 'user'}
                                            onChange={(e) => setData({ ...data, role: e.target.value })}
                                        />
                                        <Form.Check
                                            inline
                                            label="Admin"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            value='admin'
                                            onChange={(e) => setData({ ...data, role: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>
                            <Button variant="primary" type="submit" className="w-100" onClick={hendleregister}>Register</Button>
                        </Form>
                        <p className="mt-3">Sudah punya akun <Link to='/login' className={styleRegister.btn_daftar}>Login</Link></p>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Register