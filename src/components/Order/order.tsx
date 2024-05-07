
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
                        {item.employee}
                        {item.establishment}
                        <div>
                        {item.instant}
                        </div>
                    </div>
                    <Product key={item.id} orderId={item.id} />
                    <div>
                        {item.instant}
                    </div>
                </div>
            
            ))}
        </div>
    );
}
export default Order