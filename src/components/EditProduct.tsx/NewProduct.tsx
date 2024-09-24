import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Slide, TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import Iproduto from '../../interfaces/IProduto';
import Imenu from '../../interfaces/Imenu';
import { getMenuByEstablishment } from '../../services/getMenuByEstablishiment';
import { saveProduct } from '../../services/saveProduct';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewProdct = () => {
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Iproduto>({
        id: 0,
        name: "",
        menuName: "",
        price: 0,
        estoque: 0,
        idMenu: 0
    });
    const token = localStorage.getItem('token');
    const estab_id = localStorage.getItem('estab_id');
    const [menuId, setMenuId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [menu, setMenu] = useState<Imenu[]>([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await getMenuByEstablishment(token,estab_id);
                setMenu(response);
            } catch (erro: any) {
                if (erro.message === '403') {
                    setError("Você não tem permissão para acessar esses pedidos.");
                    console.log(erro);
                }
            }
        };
        fetchMenu();
    }, [token]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeMenu = (event: any) => {
        const selectedMenuId = event.target.value;
        console.log(selectedMenuId)
        setMenuId(selectedMenuId);
        
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === "price" || name === "estoque" ? parseFloat(value) : value,
        }));
    };

    const handleSave = async () => {
        if (menuId !== null) {
            try {
                const response = await saveProduct(newProduct, menuId);
                if (response) {
                   console.log(menuId); // Fecha o diálogo após salvar
                } else {
                    setError("Erro ao salvar o produto");
                }
            } catch (error) {
                setError("Erro ao salvar o produto");
            }
        } else {
            setError("Por favor, selecione um menu.");
        }
    };

    return (
        <>
            <Button color="info" variant="outlined" onClick={handleClickOpen}>
                <AddIcon />
                Novo
            </Button>
            <Dialog 
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Novo Produto
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
                   
                        <InputLabel id="demo-simple-select-label">Menu/categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={menuId || ''}
                            onChange={handleChangeMenu}
                            label="Menu/categoria"
                            fullWidth
                        >
                           {menu.map(m => (
                                <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                           ))}
                        </Select>
                        <TextField
                            name="name"
                            onChange={handleChange}
                            label="Nome do Produto"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            name="price"
                            onChange={handleChange}
                            label="Preço"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            name="estoque"
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

export default NewProdct;
