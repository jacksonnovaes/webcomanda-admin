import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import Iproduto from "../../interfaces/IProduto";
import { getEstoque } from "../../services/EstoqueProducts";


const EstoqueProducts = ({ idMenu }: { idMenu: number | undefined }) => {
    const [products, setProducts] = useState<Iproduto[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState<number>(0);


    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        const fetchProducts = async () => {
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                if (idMenu !== undefined) {
                    if (!token) {
                        navigate("/login");
                        return;
                    }
                    const response = await getEstoque(currentPage, idMenu);

                    setProducts(response?.content ?? []);
                    setTotalPages(response?.totalPages ?? 0);

                }
            } catch (error: any) {
                if (error.message === '403') {
                    setError("Você não tem permissão para acessar esses pedidos.");
                    navigate("/login")
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
    return (
        <>  <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nome do Produto</TableCell>
                        <TableCell align="center">Preço</TableCell>
                        <TableCell align="center">Descrição</TableCell>
                        <TableCell align="center">menu</TableCell>
                        <TableCell align="center">Quantidade estoque</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell align="center" component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center">{product.price}</TableCell>
                                <TableCell align="center">{product.name}</TableCell>
                                <TableCell align="center">{product.menuName}</TableCell>
                                <TableCell align="center">{product.estoque}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                Nenhum produto disponível
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>

            <div>
                <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Anterior
                </Button>
                <Button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                    Próximo
                </Button>
                <span>Página {currentPage + 1} de {totalPages}</span>
            </div>
        </>
    )
}
export default EstoqueProducts