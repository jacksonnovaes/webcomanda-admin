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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CloseOrder = ({ pedido }: { pedido: Ipedidos }) => {
    const [open, setOpen] = useState(false);
    const [itemOrders, setItemOrders] = useState<IItemOrder[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchItemOrders = async (pedidoId: number) => {
            try {
                const response = await getItemOrders(pedidoId);
                setItemOrders(response);
            } catch (error) {
                console.error("Erro ao buscar itens do pedido:", error);
            }
        };

        if (pedido) {
            fetchItemOrders(pedido.id);
        }
    }, [pedido]);

    return (
        <>
            <Button color="warning" variant="contained" onClick={handleClickOpen}>
                Fechar Pedido
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Editar Pedido
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
                    <Typography variant="h6">Pedido {pedido.id}</Typography>
                    {itemOrders.map((orderItem) => (
                        <div key={orderItem.productId}>
                            <p>Nome: {orderItem.productName}</p>
                            <p>Quantidade: {orderItem.quantity}</p>
                            <p>Total R$: {orderItem.price}</p>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Salvar alterações
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

export default CloseOrder;
