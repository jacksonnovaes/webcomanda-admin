
import Ipedidos from "../../interfaces/Ipedidos"
import Product from "../Products/product"
import './order.css'

const Order = ({ pedidos }: { pedidos: Ipedidos[] }) => {
    return (
      <div className="row">
            {pedidos.map((item) => (
                <div  className="card" key={item.id}>
                    <h1>Comanda {item.id}</h1>
                    <div>
                        {item.id}
                        {item.employee}
                        {item.establishment}
                    </div>
                    <Product key={item.id} orderId={item.id} />
                </div>
            
            ))}
        </div>
    );
}
export default Order