import Ipedidos from "../../interfaces/Ipedidos";
import { getItemOrders } from "../../services/getAllItemOrders";
import './order.css';
import IItemOrder from "../../interfaces/IItemOrder";
import { useLocation } from "react-router-dom";
import CloseOrder from "../CloseOrder/Closerder";
import { useEffect, useState } from "react";

const Order = ({ pedidos, onClearPedidos }: { pedidos: Ipedidos[],onClearPedidos:()=>void }) => {
    const [itemOrders, setItemOrders] = useState<IItemOrder[]>([]);
    const location = useLocation()
    useEffect(() => {
        const fetchItemOrders = async (pedidoId: number) => {
            try {
                const response = await getItemOrders(pedidoId);
                setItemOrders(response);
                console.log(response[0].orderId)
            } catch (error) {
                console.error("Erro ao buscar itens do pedido:", error);
            }
        };

        if (pedidos && pedidos.length > 0) {
            const pedidoId = pedidos[0].id;
            fetchItemOrders(pedidoId);
        }

        
    }, [pedidos]);

    const clearItemPedidos = () => {
       
        setItemOrders([]);
    };

    return (
        <div style={{
            width: "40%",
            position: "relative",
            display: "flex",
            border: "1px solid #ccc",
            flexDirection: "row",
            borderRadius: "20px",
            float: "inline-end",
            margin: "0% 0%"
        }}>
            {pedidos && pedidos.length > 0 ? (
                pedidos.map((item) => (
                    <div className="card" key={item.id}>

                        <div style={{ width: "50%", textAlign: "left" }}>
                            <h1>Comanda</h1>
                            <p>Funcionário: {item.employee}</p>
                            <p>Estabelecimento: {item.establishment}</p>
                            <p>Instante: {item.instant}</p>
                            <p>Total: {item.totalOrder}</p>
                        </div>
                        <div style={{
                            width: "50%",
                            float: "right",
                        }}>

                                <CloseOrder 
                                pedidos={pedidos} 
                                onClearItemPedidos={clearItemPedidos}
                                onClearPedidos = {onClearPedidos}
                                />
                            </div>
                        <div style={{

                            width: "50 %",
                            textAlign: "justify"

                        }}>
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
                <p style={{ padding: "18% 30%" }}>Nenhum pedido disponível</p>
            )
            }
        </div >
    );
};

export default Order;