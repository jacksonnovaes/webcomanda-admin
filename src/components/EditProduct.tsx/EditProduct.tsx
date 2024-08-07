import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Iproduto from "../../interfaces/IProduto";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditProdct = ({ product }: { product: Iproduto }) => {
    const [open, setOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState<Iproduto>({ ...product });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === "qtd_estoque" || name === "price" ? parseFloat(value) : value,
        }));
    };

    const handleSave = () => {
        // Aqui você pode adicionar a lógica para salvar as alterações
        console.log("Produto editado:", editedProduct);
        setOpen(false);
    };

    return (
        <>
            <Button color="info" variant="text" onClick={handleClickOpen}>
                <EditIcon />
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Editar Produto
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
                    <TextField
                        name="menuName"
                        value={editedProduct.menuName}
                        onChange={handleChange}
                        label="Nome do Menu"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="name"
                        value={editedProduct.name}
                        onChange={handleChange}
                        label="Nome do Produto"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                        label="Preço"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        name="estoque"
                        value={editedProduct.estoque}
                        onChange={handleChange}
                        label="Quantidade em Estoque"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditProdct;
