import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from ".."
import Card from "react-bootstrap/esm/Card"
import Row from "react-bootstrap/esm/Row"

const BrandBar = observer(() => {
    const {toy} = useContext(Context)
    return (
        <div>
            Бренды:
            <Row className="d-flex mt-2">
            
                {toy.brands.map(brand =>
                    <Card 
                        key={brand.id} className="p-3 mx-2" 
                        style={{width: '170px', cursor: "pointer", border: '2px solid pink'}} 
                        border={brand.id === toy.selectedBrand.id ? 'pink' : 'light'}
                        onClick={() => toy.selectedBrand = brand}
                    >
                        {brand.name}
                    </Card>   
                )}
            </Row>
        </div>
        
    )  
})

export default BrandBar