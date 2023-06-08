import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TypeBar from "../components/TypeBar"
import BrandBar from "../components/BrandBar"
import ToyList from "../components/ToyList"
import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { Context } from ".."
import { fetchBrands, fetchTypes, fetchToys } from "../http/toyAPI"
import Pages from "../components/Pages"

const Shop = observer(() => {
    const {toy} = useContext(Context)
    // если сервер не включен, то из-за юз эффекта вылетит куча ошибок!
    useEffect(() => {
        fetchTypes().then(data => toy.types = data)
        fetchBrands().then(data => toy.brands = data)
        fetchToys(null, null, 1, 2).then(data => {
            toy.toys = data.rows  //из-за пагинации товары находятся в rows
            toy.totalCount = data.count
        })
    }, [])

    useEffect(() => {
        fetchToys(toy.selectedType.id, toy.selectedBrand.id, toy.page, 2).then(data => {
            toy.toys = data.rows  //из-за пагинации товары находятся в rows
            toy.totalCount = data.count
        })
    }, [toy.page, toy.selectedType, toy.selectedBrand])
    return (
        <Container className="mx-10">
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar />
                </Col>

                <Col md={9}>
                    <BrandBar />
                    <ToyList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop