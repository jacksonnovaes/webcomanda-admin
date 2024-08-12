import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ipedidos from "../../interfaces/Ipedidos";
import IPagamentoPix from "../../interfaces/RequstCobranca";
import { GetResponsePaymentPix } from "../../services/generatedCodPix";
import QRCode from 'react-qr-code';


const PagamentoPix = ({ pedidos }: { pedidos: Ipedidos[] }) => {
  const navigate = useNavigate();
  const [cardName, setCardName] = useState('');
  const token = localStorage.getItem('token');
  const [pixCopiaECola, setPixCopiaECola] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCardName(event.target.value as string);
  };

  useEffect(() => {
    const generateQrCode = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      const transaction: IPagamentoPix = {
        calendario: {
          expiracao: 3600, // Expiração em segundos, ajuste conforme necessário
        },
        devedor: {
          cpf: "39219796848", // Substitua pelo CPF real do devedor
          nome: "Jackson B Novaes", // Substitua pelo nome real do devedor
        },
        valor: {
          original: pedidos[0].totalOrder.toFixed(2).toString(), // Substitua pelo valor real da transação
        },
        chave: "chave-pix-aqui", // Substitua pela chave PIX
        solicitacaoPagador: "Descrição do pagamento",
        orderId: pedidos[0].id
      };

      try {
        const response = await GetResponsePaymentPix(transaction);
        setPixCopiaECola(response.pixCopiaECola); // Armazena o valor do "Copia e Cola"
      } catch (error) {
        console.error("Erro ao gerar código PIX:", error);
      }
    };

    generateQrCode();
  }, [navigate, pedidos, token]);

  return (
    <div>
      {pixCopiaECola ? (
        <div>
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
