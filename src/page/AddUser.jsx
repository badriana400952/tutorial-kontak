import React from 'react'
import { storage, db } from '../firebase'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const initialState = {
    name: "",
    email: "",
    info: "",
    contact: ""
}

const AddUser = () => {
    const [data, setData] = useState(initialState)
    const { name, email, info, contact } = data
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(null)
    const navigate = useNavigate()

    // const [errors, setErrors] = useState({})

    // const validate = () => {
    //     let errors = {}
    //     if (!name) {
    //         errors.name = "Harap Di Isi"
    //     }
    //     if (!email) {
    //         errors.email = "Harap Di Isi"
    //     }
    //     if (!info) {
    //         errors.info = "Harap Di Isi"
    //     }
    //     if (!contact) {
    //         errors.contact = "Harap Di Isi"
    //     }
    // }
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.tottalBytes) * 100
                setProgress(progress)
                switch (snapshot.state) {
                    case "paused":
                        console.log('upload in pouse')
                        break;
                        case "running":
                            console.log('upload in running')
                        break;
                        default:
                        break
                }
            }, (error) => {
                console.log(error)
            }, () => {
                getDownloadURL(uploadTask.snapshot.fer)
                .then((downloadURL) => {
                    setData((prev) => ({...prev, img: downloadURL}))
                })
            })
        }
        file && uploadFile()
    }, [file])
    const handleSubmit = async (e) => {
        e.preventDefault()
        // let errors = valiDate()
        // if (Object.keys(errors).length) return setErrors(errors)
        // return errors
        await addDoc(collection(db, "users"), {
            ...data,
            timestamp: serverTimestamp()
        })
            navigate("/")

    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <Container className='mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            name='name'
                            // error={errors.name ? { content: errors.name } : null}
                            type='text'
                            placeholder="Username"
                            onChange={handleChange}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Email"
                            type='text'
                            // error={errors.email ? { content: errors.email } : null}
                            name='email'
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Form.Group><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Info</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Info"
                            // error={errors.info ? { content: errors.info } : null}
                            type='text'
                            name='info'
                            aria-label="Info"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Contact</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Contact"
                            // error={errors.contact ? { content: errors.contact } : null}
                            type='number'
                            name='contact'
                            aria-label="Contact"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>file</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Contact"
                            aria-label="Contact"
                            type='file'
                            onChange={(e) => setFile(e.target.files[0])}
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={progress !== null && progress < 100}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddUser