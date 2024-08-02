import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import IItemOrder from "../../interfaces/IItemOrder";
import Ipedidos from "../../interfaces/Ipedidos";
import FormLogin from "../../pages/Login/login";
import { getItemOrders } from "../../services/getAllItemOrders";
import './orderHome.css';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { Tooltip } from '@mui/material';

const OrderHome = ({ pedidos, onClearPedidos }: { pedidos: Ipedidos[], onClearPedidos: () => void }) => {
    const [itemsByPedido, setItemsByPedido] = useState<{ [key: number]: IItemOrder[] }>({});
    const [totalsByPedido, setTotalsByPedido] = useState<{ [key: number]: number }>({});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn } = useAuth();
    const status = "CLOSED"
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
                setItemsByPedido(prevState => ({ ...prevState, [pedidoId]: response }));
                const total = response.reduce((sum: number, item: { quantity: number; price: number; }) => sum + (item.quantity * item.price), 0);
                setTotalsByPedido(prevState => ({ ...prevState, [pedidoId]: total }));

            } catch (error: any) {
                if (error.message === '403') {
                    setError("Você não tem permissão para acessar esses pedidos.");
                }
            }
        };

        if (pedidos && pedidos.length > 0) {
            pedidos.forEach(pedido => {
                fetchItemOrders(pedido.id);
            });
        }
    }, [pedidos, token, navigate]);

    const handleUpdate = (pedidoId: number) => {
        getItemOrders(pedidoId, status)
            .then(response => {
                setItemsByPedido(prevState => ({ ...prevState, [pedidoId]: response }));
                const total = response.reduce((sum: number, item: { quantity: number; price: number; }) => sum + (item.quantity * item.price), 0);
                setTotalsByPedido(prevState => ({ ...prevState, [pedidoId]: total }));
            })
            .catch(error => console.error("Erro ao buscar itens do pedido:", error));
    };

    if (!isLoggedIn || error === "Você não tem permissão para acessar esses produtos." || error === "Você precisa estar logado para acessar os produtos.") {
        return <FormLogin />;
    }

    return (
        <div>
            {pedidos && pedidos.length > 0 ? (
                <table style={{ width: '80%', margin: "auto", borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left' }}>
                            <th>Comanda</th>
                            <th>Funcionário</th>
                            <th>Estabelecimento</th>
                            <th>Instante</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <React.Fragment key={pedido.id}>
                                <tr style={{ borderBottom: '1px solid #ccc' }}>
                                    <td style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>{pedido.id}</td>
                                    <td>{pedido.employee}</td>
                                    <td>{pedido.establishment}</td>
                                    <td>{pedido.instant}</td>
                                    <td>{totalsByPedido[pedido.id]?.toFixed(2)}</td>
                                   
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ padding: "18% 30%" }}>Nenhum pedido disponível</p>
            )}
        </div>
    );
};
export default OrderHome;
