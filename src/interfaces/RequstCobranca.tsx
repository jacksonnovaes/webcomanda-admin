export default interface IPagamentoPix {
    calendario: {
      expiracao: number;
    };
    devedor: {
      cpf: string;
      nome: string;
    };
    valor: {
      original: string;
    };
    chave: string;
    solicitacaoPagador: string;
    orderId: number;
  }