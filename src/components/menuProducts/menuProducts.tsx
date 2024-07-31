import { useEffect, useState } from "react";
import { getProductsByMenu } from "../../services/ManuProducts";
import Iproduto from "../../interfaces/IProduto";
import { Button } from "@mui/material";
import { openOrder } from "../../services/openOrderService";
import Order from "../Order/order";
import IItemOrder from "../../interfaces/IItemOrder";
import Ipedidos from "../../interfaces/Ipedidos";
import { useLocation } from "react-router-dom";
import EditOrder from "../OpenOrder/EditOrder";

const MenuProducts = ({ idMenu }: { idMenu: number | undefined }) => {
    const [products, setProducts] = useState<Iproduto[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [itemOrders, setItemOrders] = useState<IItemOrder[]>([]);
    const [orders, setOrders] = useState<Ipedidos[]>([]);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            if (idMenu !== undefined) {
                try {
                    const response = await getProductsByMenu(currentPage, idMenu);
                    setProducts(response?.content ?? []);
                    setTotalPages(response?.totalPages ?? 0);
                } catch (error) {
                    console.error("Erro ao buscar produtos!", error);
                }
            }
        };
        fetchProducts();
    }, [idMenu, currentPage]);  // Fetch products when idMenu or currentPage changes

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const clearPedidos = () => {
        setOrders([]);
        setItemOrders([]);
    };

    const handleAddItemClick = (productId: number) => {
        setItemOrders(prevItemOrders => {
            const existingItemIndex = prevItemOrders.findIndex(item => item.productId === productId);
            const updatedItemOrders = [...prevItemOrders];

            if (existingItemIndex >= 0) {
                updatedItemOrders[existingItemIndex].quantity += 1;
            } else {
                updatedItemOrders.push({
                    itemOrderid: 0,
                    productId,
                    quantity: 1,
                    productName: "",
                    price: 0,
                    totalAmount:0
                });
            }

            return updatedItemOrders;
        });
    };

    const handleRemoveItemClick = (productId: number) => {
        setItemOrders(prevItemOrders => {
            const existingItemIndex = prevItemOrders.findIndex(item => item.productId === productId);
            const updatedItemOrders = [...prevItemOrders];

            if (existingItemIndex >= 0) {
                if (updatedItemOrders[existingItemIndex].quantity > 1) {
                    updatedItemOrders[existingItemIndex].quantity -= 1;
                } else {
                    updatedItemOrders.splice(existingItemIndex, 1);
                }
            }

            return updatedItemOrders;
        });
    };


    const handleOpenOrderClick = async () => {
        try {
            const response = await openOrder(itemOrders);
            setOrders(prevOrders => {
                const updatedOrders = orders.length > 0 ? [response] : [...prevOrders, response];
                return updatedOrders;
            });
            setItemOrders([]);
            console.log("Pedido criado/atualizado com sucesso!", response);
        } catch (error) {
            console.error("Erro ao abrir/atualizar pedido!", error);
        }
    };

    const getItemQuantity = (productId: number) => {
        const item = itemOrders.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    };

    return (
        <div style={{ margin: "3% auto", width: "80%", display: "flex" }}>
            <div style={{ width: "50%" }}>
                {products.length > 0 ? (
                    products.map((p) => (
                        <div style={{ display: "inline-flex", width: "100%" }} key={p.id}>
                            <span
                                style={{
                                    float: "none",
                                    width: "76%",
                                    margin: "1% 0"
                                }}
                            > {p.name} R$: {p.price}</span>
                            <div style={{

                            }}>
                                <Button size="small" onClick={() => handleAddItemClick(p.id)}>+</Button>
                                <span>{getItemQuantity(p.id)}</span>
                                <Button onClick={() => handleRemoveItemClick(p.id)}>-</Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto disponível</p>
                )}
                <div>
                    <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
                        Anterior
                    </Button>
                    <Button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                        Próximo
                    </Button>
                    <span>Página {currentPage + 1} de {totalPages}</span>
                </div>
                <div style={{ width: "100%", float: "left" }}>
                 
                    <Button
                        onClick={handleOpenOrderClick}
                        variant="contained"
                        color="primary"
                    >
                        {itemOrders.length > 0
                            ? 'Adiciona produto'
                            : orders.length > 0
                                ? 'Atualizar pedido'
                                : 'Iniciar Pedido'}
                    </Button>
                </div>
            </div>
            <Order pedidos={orders} onClearPedidos={clearPedidos} />
        </div>
    );
};

export default MenuProducts;
