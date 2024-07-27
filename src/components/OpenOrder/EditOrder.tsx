import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Ipedidos from '../../interfaces/Ipedidos';
import { getItemOrders } from '../../services/getAllItemOrders';
import IItemOrder from '../../interfaces/IItemOrder';
import { EditItem } from '../../services/editItem';
import { openOrder } from '../../services/openOrderService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const EditOrder = ({ pedidos }: { pedidos: Ipedidos[] }) => {
    const [open, setOpen] = useState(false);
    const [itemOrders, setItemOrders] = useState<IItemOrder[]>([]);

    useEffect(() => {
        const fetchItemOrders = async (pedidoId: number) => {
            try {
                const response = await getItemOrders(pedidoId);
                setItemOrders(response);
            } catch (error) {
                console.error("Erro ao buscar itens do pedido:", error);
            }
        };

        if (pedidos && pedidos.length > 0) {
            const pedidoId = pedidos[0].id; // Assuming you want to fetch items for the first order
            fetchItemOrders(pedidoId);
        }
    }, [pedidos]); // Adding pedidos as a dependency to refetch if it changes

    const handleAddItemClick = async (itemOrderId: number) => {
        try {
            const updatedItemOrders = await setItemOrders(prevItemOrders => {
                const existingItemIndex = prevItemOrders.findIndex(item => item.itemOrderid === itemOrderId);
                const updatedItemOrders = [...prevItemOrders];

                if (existingItemIndex >= 0) {
                    updatedItemOrders[existingItemIndex] = {
                        ...updatedItemOrders[existingItemIndex],
                        quantity: updatedItemOrders[existingItemIndex].quantity + 1,
                    };

                    EditItem(itemOrderId, updatedItemOrders[existingItemIndex].quantity)
                        .then(response => {
                            console.log('Item atualizado com sucesso!', response);
                        })
                        .catch(error => {
                            console.error('Erro ao atualizar item!', error);
                        });
                }

                return updatedItemOrders;
            });
        } catch (error) {
            console.error('Erro ao atualizar item na interface!', error);
        }
    };


    const handleRemoveItemClick = async (itemOrderId: number) => {
        setItemOrders(prevItemOrders => {
            const existingItemIndex = prevItemOrders.findIndex(item => item.itemOrderid === itemOrderId);
            const updatedItemOrders = [...prevItemOrders];

            if (existingItemIndex >= 0) {
                if (updatedItemOrders[existingItemIndex].quantity > 1) {
                    updatedItemOrders[existingItemIndex] = {
                        ...updatedItemOrders[existingItemIndex],
                        quantity: updatedItemOrders[existingItemIndex].quantity - 1,
                    };

                    // Atualizar o item no backend
                    EditItem(itemOrderId, updatedItemOrders[existingItemIndex].quantity)
                        .then(response => {
                            console.log('Item atualizado com sucesso!', response);
                        })
                        .catch(error => {
                            console.error('Erro ao atualizar item!', error);
                        });
                } else {
                    updatedItemOrders.splice(existingItemIndex, 1);

                    // Remover o item do backend
                    EditItem(itemOrderId, 0)
                        .then(response => {
                            console.log('Item removido com sucesso!', response);
                        })
                        .catch(error => {
                            console.error('Erro ao remover item!', error);
                        });
                }
            }

            return updatedItemOrders;
        });
    };
    const getItemQuantity = (itemOrderId: number) => {
        const item = itemOrders.find(item => item.itemOrderid === itemOrderId);
        return item ? item.quantity : 0;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button color='warning' variant="contained" onClick={handleClickOpen}>
                Editar pedido
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Editar Pedido
                </DialogTitle>
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
                <DialogContent dividers>
                    {pedidos.map((pedido) => (
                        <div key={pedido.id}>
                            <Typography variant="h6">Pedido {pedido.id}</Typography>
                            {itemOrders.map((item) => (
                                <div style={{ display: 'flow' }}
                                    key={item.itemOrderid}>
                                    {item.productName} R$: {item.price}
                                    <Button
                                        color='success'
                                        
                                        onClick={() => handleAddItemClick(item.itemOrderid)}>+</Button>
                                    {getItemQuantity(item.itemOrderid)}
                                    <Button
                                        color='error'
                                      
                                        onClick={() => handleRemoveItemClick(item.itemOrderid)}>-</Button>
                                </div>
                            ))}
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

export default EditOrder;
