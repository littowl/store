import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown';
import { useContext, useState, useEffect } from 'react';
import { fetchBrands, fetchTypes } from "../../http/toyAPI"
import { Context } from '../..';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { observer } from 'mobx-react-lite';
import { createToy } from '../../http/toyAPI';

const CreateToy = observer(({show, onHide}) => {
    const {toy} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)
    const [info, setInfo] = useState('')

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    // отправка запроса на сервер и добавление нового устройства
    const addToy = () => {
        const formData = new FormData() // используем не строку, а формдату
        formData.append('name', name) // первый параметр - ключ, второй- значение
        formData.append('price', `${price}`) // конвертируем в строку стоимость
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        //formData.append('info', info)
        createToy(formData).then(data => onHide())
    }

    useEffect(() => {
        fetchTypes().then(data => toy.types = data)
        fetchBrands().then(data => toy.brands = data)
        console.log(toy.brands)
    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='d-flex align-items-center'>
                        <Dropdown variant="outline-dark">
                            <Dropdown.Toggle>{type=== null ? 'Выберите тип' : type.name}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {toy.types.map(type =>
                                    <Dropdown.Item onClick={() => setType(type)} key={type.id}>{type.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className='mx-2'>
                            <Dropdown.Toggle>{brand === null ? 'Выберите бренд' : brand.name}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {toy.brands.map(brand =>
                                    <Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    
                    <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder='Введите название товара' className='mt-3'/>
                    <Form.Control value={info} onChange={e => setInfo(e.target.value)} placeholder="Введите описание товара" className='mt-3'/>
                    <hr />
                    Введите стоимость:
                    <Form.Control value={price} onChange={e => setPrice(Number(e.target.value))} type="number" className='mt-3'/>
                    <hr />
                    Добавьте картинку товара:
                    <Form.Control type="file" onChange={selectFile} className='mt-3'/>
                    
                   
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={addToy}>Добавить</Button>
                <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateToy