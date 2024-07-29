import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Ipedidos from '../../interfaces/Ipedidos';
import { getItemOrders } from '../../services/getAllItemOrders';
import IItemOrder from '../../interfaces/IItemOrder';
import ChoosePayment from '../ChoosePayment/ChoosePayment';
import { CloseOrderSer } from '../../services/closeOrder';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CloseOrder = ({ pedidos, onClearItemPedidos, onClearPedidos }: { pedidos: Ipedidos[], onClearItemPedidos: () => void, onClearPedidos: () => void}) => {
    const [open, setOpen] = useState(false)
    const [itemOrders, setItemOrders] = useState<IItemOrder[]>([]);
    const [orders, setOrders] = useState<IItemOrder[]>([]);
    const [paymentType, setPaymentType] = useState<string>('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseorder = async () => {
        try {
           const response = await CloseOrderSer(pedidos[0].id,paymentType);
           onClearItemPedidos();
           onClearPedidos();
            setOpen(false);
        } catch (error) {
            console.error("Erro ao fechar o pedido:", error);
            // Adicione um tratamento de erro apropriado aqui, se necessário
        }
    };

    useEffect(() => {

        const fetchItemOrders = async () => {
            if (pedidos && pedidos.length > 0) {
                try {
                    const response = await getItemOrders(pedidos[0].id);
                    setItemOrders(response);
                } catch (error) {
                    console.error("Erro ao buscar itens do pedido:", error);
                }
            }
        };

        fetchItemOrders();
    }, [pedidos]);

    return (
        <>
            <Button color="warning" variant="contained" onClick={handleClickOpen}>
                Fechar Pedido
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth='xl'

            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <h2 style={{
                        fontSize: "1.3em",
                        margin: "0 34%",
                        color: 'red'
                    }}> Finalizar Pedido</h2>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{
                        width: "50%",
                        float: "left"
                    }}>
                        {itemOrders.map((orderItem) => (
                            <div

                                key={orderItem.productId}>
                                <p>Nome: {orderItem.productName}</p>
                                <p>Quantidade: {orderItem.quantity}</p>
                                <p>Total R$: {orderItem.price}</p>
                            </div>
                        ))}
                    </div>
                    <div id="paymentCont" style={{
                        width: "50%",
                        float: "right"
                    }}>
                        <div style={{
                            width: "63%",
                            fontSize: "50px",
                            fontWeight: '400',
                            margin: "10% 0"

                        }}>
                            <span>Total: {pedidos[0].totalOrder}</span>
                        </div>
                        <ChoosePayment pedidos={pedidos}onPaymentTypeChange={setPaymentType} />
                    </div>
                </DialogContent>

                <DialogActions>

                    <span style={{
                        color: '#ffff'
                    }}>
                        ______________________________________________________________________________________
                    </span>
                    <Button 
                        color='success'
                        autoFocus onClick={handleCloseorder}>
                        Finalizar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

export default CloseOrder;
