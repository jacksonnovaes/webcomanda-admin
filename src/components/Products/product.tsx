import axios from "axios";
import Iproduto from "../../interfaces/IProduto";
import { useEffect, useState } from "react";

const Product = ({ orderId }: { orderId: number }) => {

    const [products, setProducts] = useState<Iproduto[]>([])
    useEffect(() => {
        axios.get<Iproduto[]>(`http://localhost:8080/api/v1/product/order/${orderId}`)
            .then(response => {
                setProducts(response.data)
            },) 
        },[orderId])
        return (
            <div>
                {products.map((p) => (
                    <div key={p.idProduto}>
                        {p.name}

                    </div>
                ))}
            </div>
        )
    }

export default Product