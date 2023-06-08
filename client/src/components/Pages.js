import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from ".."
import Pagination from 'react-bootstrap/Pagination';

const Pages = observer(() => {
    const {toy} = useContext(Context)
    const pageCount = Math.ceil(toy.totalCount / toy.limit)
    const pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <Pagination className="mt-5">
            {pages.map(page => 
                <Pagination.Item
                    active={toy.page === page} key={page} onClick={() => toy.page = page}
                >
                    {page}
                </Pagination.Item>    
            )}
        </Pagination>
    )
})
export default Pages