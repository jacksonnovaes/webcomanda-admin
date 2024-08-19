import { SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import QRCode from 'react-qr-code';
import { useNavigate } from "react-router-dom";
import Ipedidos from "../../interfaces/Ipedidos";
import IPagamentoPix from "../../interfaces/RequstCobranca";
import { GetResponsePaymentPix } from "../../services/generatedCodPix";

const PagamentoPix = ({ pedidos }: { pedidos: Ipedidos[] }) => {
  const navigate = useNavigate();
  const [cardName, setCardName] = useState('');
  const [cpf, setCpf] = useState(''); // Estado para armazenar o CPF do usuário
  const [name, setName] = useState(''); // Estado para armazenar o nome do usuário
  const [cpfSubmitted, setCpfSubmitted] = useState(false); // Estado para controlar se o CPF foi submetido
  const token = localStorage.getItem('token');
  const [pixCopiaECola, setPixCopiaECola] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCardName(event.target.value as string);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCpfSubmit = () => {
    setCpfSubmitted(true);
  };

  useEffect(() => {
    const generateQrCode = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      if (cpfSubmitted) {
        const transaction: IPagamentoPix = {
          calendario: {
            expiracao: 3600,
          },
          devedor: {
            cpf :cpf || "39219796848", 
            nome: name || "Consumidor", // Utiliza o nome inserido pelo usuário ou o padrão "Consumidor"
          },
          valor: {
            original: pedidos[0].totalOrder.toFixed(2).toString(), // Substitua pelo valor real da transação
          },
          chave: "chave-pix-aqui", // Substitua pela chave PIX
          solicitacaoPagador: "Descrição do pagamento",
          orderId: pedidos[0].id,
        };

        try {
          const response = await GetResponsePaymentPix(transaction);
          setPixCopiaECola(response.pixCopiaECola); // Armazena o valor do "Copia e Cola"
        } catch (error) {
          console.error("Erro ao gerar código PIX:", error);
        }
      }
    };

    generateQrCode();
  }, [navigate, pedidos, token, cpfSubmitted, cpf, name]);

  return (
    <div>
      {!cpfSubmitted ? (
        <div>
          <p>Digite o CPF (opcional):</p>
          <TextField
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="Digite o CPF"
          />
          <p>Digite o Nome (opcional):</p>
          <TextField
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Digite o Nome"
          />
          <div style={{marginTop:"10px"}}>
          <Button variant="contained" 
          onClick={handleCpfSubmit}>Gerar QR Code
          </Button>
          </div>
        </div>
      ) : pixCopiaECola ? (
        <div style={{marginTop:"10px"}}>
          <p>Código PIX Copia e Cola:</p>
          <QRCode value={pixCopiaECola} size={256} />
        </div>
      ) : (
        <p>Gerando código PIX...</p>
      )}
    </div>
  );
};

export default PagamentoPix;
