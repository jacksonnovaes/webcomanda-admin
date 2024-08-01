import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { forwardRef, useEffect, useState } from 'react';
import IItemOrder from '../../interfaces/IItemOrder';
import Ipedidos from '../../interfaces/Ipedidos';
import { EditItem } from '../../services/editItem';
import { getItemOrders } from '../../services/getAllItemOrders';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const EditOrder = ({ pedidos, onUpdate     }: { pedidos: Ipedidos[], onUpdate:()=> void }) => {
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
                            onUpdate();
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
                            onUpdate();
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
                    onUpdate();    
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
            <Button disabled={itemOrders.length==0} color='info' variant="text" onClick={handleClickOpen}>
                <EditIcon/>
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
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
                         Sair
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditOrder;
