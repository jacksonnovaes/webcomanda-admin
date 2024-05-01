import axios from "axios";
import { useEffect, useState } from "react";
import Ipedidos from "../../interfaces/Ipedidos";
import { IPaginacao } from "../../interfaces/Ipaginacao";
import Order from "../../components/Order/order";
import { useNavigate } from "react-router-dom";
import TopMenu from "../../layouts/topMenu/TopMenu";
import './home.css'
import Button from "@mui/material/Button";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<Ipedidos[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const response = await axios.get<IPaginacao<Ipedidos>>('http://localhost:8080/api/v1/order/list', {
          params: {
            page: currentPage,
            linesPerPage: 24,
            order: 'id',
            direction: 'DESC'
          },
          headers: {
            'accept': '*/*',
            'Authorization': `${token}`
          }
        });
        setPedidos(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Ocorreu um erro ao buscar os pedidos. Por favor, tente novamente mais tarde.');
        navigate("/login");
      } finally {
        setLoading(false);
      }

    }

    if (token) {
      fetchPedidos();
    } else {
      navigate("/login");
    }
    const interval = setInterval(fetchPedidos, 5000); // Rebusca os pedidos a cada 5 segundos

    // Limpamos o intervalo quando o componente é desmontado para evitar vazamentos de memória
    return () => clearInterval(interval);

  }, [navigate, token, currentPage]);
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
    <>
      <TopMenu />
      <section className="container">
        {loading && <div>Carregando...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <>
            <Order pedidos={pedidos} />
          </>
        )}
      </section>
      <div className="buttonGroup">
      <Button onClick={handlePreviousPage} disabled={currentPage === 0} variant="contained">Anterior</Button>
      <Button onClick={handleNextPage} disabled={currentPage === totalPages - 1} variant="contained">Próxima</Button>
      </div>
    </>
  )
}
export default Home;
