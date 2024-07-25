import Button from "@mui/material/Button";
import TopMenu from "../../layouts/topMenu/TopMenu";
import { openOrder } from "../../services/openOrderService";
import { useState } from "react";
import Ipedidos from "../../interfaces/Ipedidos";
import Order from "../../components/Order/order";
import Products from "../../components/criarOrder/CreateOrderComponente";

const OpenOrders = () => {
    const [newOrders, setNewOrders] = useState<Ipedidos[]>([]);
    const [isOrderOpen, setIsOrderOpen] = useState(false);

   

    return (
        <>
            <TopMenu />
            <Products/>
        
        </>
    );
};

export default OpenOrders;
