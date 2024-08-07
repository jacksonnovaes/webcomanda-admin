import Ipedidos from "../../interfaces/Ipedidos";
import { getItemOrders } from "../../services/getAllItemOrders";
import './order.css';
import IItemOrder from "../../interfaces/IItemOrder";
import { useEffect, useState } from "react";
import CloseOrder from "../CloseOrder/Closerder";
import EditOrder from "../EditOrder/EditOrder";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import FormLogin from "../../pages/Login/login";

const Order = ({ pedidos, onClearPedidos }: { pedidos: Ipedidos[], onClearPedidos: () => void }) => {
    const [itemOrders, setItemOrders] = useState<IItemOrder[]>([]);
    const [totalOrder, setTotalOrder] = useState<number>(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn } = useAuth();
    const status = "OPENED"
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        const fetchItemOrders = async (pedidoId: number) => {
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const response = await getItemOrders(pedidoId, status);
                setItemOrders(response);
                console.log(response[0].orderId);
            } catch (error:any) {
                if (error.message === '403') {
                    setError("Você não tem permissão para acessar esses pedidos.");
                  }
            }
        };

        if (pedidos && pedidos.length > 0) {
            const pedidoId = pedidos[0].id;
            fetchItemOrders(pedidoId);
        }
    }, [pedidos]);

    useEffect(() => {
        const calculateTotal = () => {
            const total = itemOrders.reduce((sum, item) => sum + (item.quantity * item.price), 0);
            setTotalOrder(total);
        };

        calculateTotal();
    }, [itemOrders]);

    const clearItemPedidos = () => {
        setItemOrders([]);
    };

    const handleUpdate = () => {
        if (pedidos && pedidos.length > 0) {
            const pedidoId = pedidos[0].id;
            getItemOrders(pedidoId, status)
                .then(response => setItemOrders(response))
                .catch(error => console.error("Erro ao buscar itens do pedido:", error));
        }
    };

    if (!isLoggedIn || error === "Você não tem permissão para acessar esses produtos." || error === "Você precisa estar logado para acessar os produtos.") {
        return <FormLogin />;
    }

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
                        <div style={{float: "right"}}> 
                            <EditOrder pedidos={pedidos} onUpdate={handleUpdate} />
                        </div>
                        <div style={{ width: "50%", textAlign: "left" }}>

                            <h1>Comanda</h1>
                            <p>Funcionário: {item.employee}</p>
                            <p>Estabelecimento: {item.establishment}</p>
                            <p>Instante: {item.instant}</p>
                            <p>Total: R$ {totalOrder.toFixed(2)}</p>
                        </div>
                        <div style={{
                            width: "50%",
                            float: "right",
                        }}>
                            <CloseOrder
                                pedidos={pedidos}
                                onClearItemPedidos={clearItemPedidos}
                                onClearPedidos={onClearPedidos}
                            />

                        </div>
                        <div style={{
                            width: "50%",
                            textAlign: "justify"
                        }}>

                            <h3>Itens:</h3>
                            {itemOrders && itemOrders.length > 0 ? (
                                itemOrders.map((orderItem) => (
                                    <div key={orderItem.itemOrderid}>
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
            )}
        </div>
    );
};

export default Order;
