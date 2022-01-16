import SingleProduct from "../../components/SingleProduct";

export default function SingleProductPage({ query }) {
    return <SingleProduct id={query.id}></SingleProduct>
}

// returns single product component and its ID from query since the file name is in square brackets next js returns as such