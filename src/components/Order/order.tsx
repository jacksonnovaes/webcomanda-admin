import { useEffect, useState } from "react";
import Ipedidos from "../../interfaces/Ipedidos";
import { getItemOrders } from "../../services/getAllItemOrders";
import './order.css';
import IItemOrder from "../../interfaces/IItemOrder";

const Order = ({ pedidos }: { pedidos: Ipedidos[] }) => {
    const [itemOrders, setItemOrders] = useState<IItemOrder[]>([]);
   
    useEffect(() => {
        const fetchItemOrders = async (pedidoId: number) => {
            try {
                const response = await getItemOrders(pedidoId);
                setItemOrders(response);
                console.log(response)
            } catch (error) {
                console.error("Erro ao buscar itens do pedido:", error);
            }
        };

        if (pedidos && pedidos.length > 0) {
            const pedidoId = pedidos[0].id;
            fetchItemOrders(pedidoId);
        }
    }, [pedidos]);

    return (
        <div className="row">
            {pedidos && pedidos.length > 0 ? (
                pedidos.map((item) => (
                    <div className="card" key={item.id}>
                        <h1>Comanda</h1>
                        <div>
                            <p>Funcionário: {item.employee}</p>
                            <p>Estabelecimento: {item.establishment}</p>
                            <p>Instante: {item.instant}</p>
                            <p>Total: {item.totalOrder}</p>
                        </div>
                        <div>
                            <h3>Itens:</h3>
                            {itemOrders && itemOrders.length > 0 ? (
                                itemOrders.map((orderItem) => (
                                    <div key={orderItem.productId}>
                                        <p>Nome: {orderItem.productName}</p>
                                        <p>Quantidade: {orderItem.quantity}</p>

                                        <p>R$: {orderItem.price}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhum item encontrado para este pedido.</p>
                            )}
                        </div>
                    </div>
                    ))
                            ) : (
                            <p>Nenhum pedido disponível</p>
                            )
            }
        </div>
    );
};

export default Order;
