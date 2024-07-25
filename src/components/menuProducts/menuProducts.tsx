import { useEffect, useState } from "react";
import { getProductsByMenu } from "../../services/ManuProducts";
import Iproduto from "../../interfaces/IProduto";
import { Button } from "@mui/material";
import { openOrder } from "../../services/openOrderService";
import Order from "../Order/order";
import IItemOrder from "../../interfaces/IItemOrder";
import { addItem } from "../../services/addItem";
import Ipedidos from "../../interfaces/Ipedidos";

const MenuProducts = ({ idMenu }: { idMenu: number | undefined }) => {
    const [products, setProducts] = useState<Iproduto[]>([]);
    const [orderId, setOrderId] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [itemOrders, setItemOrders] = useState<IItemOrder[]>([]);
    const [orders, setOrders] = useState<Ipedidos[]>([]);
    

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
    }, [idMenu, currentPage]);

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

    const handleAddItemClick = (productId: number) => {
        const existingItemIndex = itemOrders.findIndex(item => item.productId === productId);
        let updatedItemOrders = [...itemOrders];

        if (existingItemIndex >= 0) {
            updatedItemOrders[existingItemIndex].quantity += 1;
        } else {
            updatedItemOrders.push({
                productId, 
                quantity: 1,
                productName: "",
                price: 0
            });
        }
      
        setItemOrders(updatedItemOrders);
        
    };

    const handleOpenOrderClick = async ()=> {
        if (itemOrders.length === 0) {
            console.error("Nenhum item para adicionar ao pedido!");
            return;
        }

        try {
            const response = await openOrder(itemOrders);
            console.log(`ywoueur`,response)
            setOrders(prevOrders => [...prevOrders, response]);
            console.log("Pedido criado com sucesso!", orders);
        } catch (error) {
            console.error("Erro ao abrir pedido!", error);
        }
    };

    return (
        <>
            <div className="">
                {products && products.length > 0 ? (
                    products.map((p) => (
                        <div key={p.id}>
                            <Button onClick={() => handleAddItemClick(p.id)}>
                                {p.name} R$: {p.price}
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto disponível</p>
                )}
                <div>
                    <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                        Anterior
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                        Próximo
                    </button>
                    <span>Página {currentPage + 1} de {totalPages}</span>
                </div>
                <Button 
                    onClick={handleOpenOrderClick} 
                    variant="contained" 
                    color="primary"
                    disabled={orders.length>=1}
                >
                    Abrir Pedido {orders.length}
                </Button>
                <Order pedidos={orders} 
                        />
            </div>
         
        </>
    );
};

export default MenuProducts;
