import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useState } from 'react';
import { createBrand, createType } from '../../http/toyAPI';

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addBrand = () => {
        createBrand({name: value}).then(data => setValue('')) //если создание прошло успешно то обнуляем value
        onHide()
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder='Введите название типа' />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={addBrand}>Добавить</Button>
                <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand