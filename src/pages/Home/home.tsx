import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Order from "../../components/Order/order";
import Ipedidos from "../../interfaces/Ipedidos";
import TopMenu from "../../layouts/topMenu/TopMenu";
import { getPedidosService } from "../../services/getPedidosService";
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<Ipedidos[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      setLoading(true);


      try {
        const response = await getPedidosService(currentPage, token)
        console.log(response?.content)
        setPedidos(response?.content ?? []);
        setTotalPages(response?.totalPages ?? 0);
      } catch (erro) {
        if(erro)
          navigate("/login");
          setError("erro ao recuperar pedidos!")
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos(); // Initial fetch
    const interval = setInterval(fetchPedidos, 5000); // Re-fetch orders every 5 seconds

    return () => clearInterval(interval); // Cleanup interval

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
          <Order pedidos={pedidos} />
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