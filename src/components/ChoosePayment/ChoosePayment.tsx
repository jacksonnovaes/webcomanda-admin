import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import PagamentoDinheiro from "../PagamentoDinheiro/PagamentoDinheiro";
import PagamentoPix from "../pagamentoPix/PagamentoPix";
import Ipedidos from "../../interfaces/Ipedidos";

const ChoosePayment = ({ pedidos, onPaymentTypeChange, onValueReceived }: { pedidos: Ipedidos[], onPaymentTypeChange: (paymentType: string) => void, onValueReceived: (valueReceived: number) => void }) => {
    const [paymentType, setPaymentType] = useState('');
    
    const handleChange = (event: SelectChangeEvent) => {
        const selectedPaymentType = event.target.value as string;
        setPaymentType(selectedPaymentType);
        onPaymentTypeChange(selectedPaymentType); 
    };
    
    return (
        <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Forma de pagamento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paymentType}
                    label="forma de pagamento"
                    onChange={handleChange}
                >
                    <MenuItem value={'cartao'}>Cartão</MenuItem>
                    <MenuItem value={'dinheiro'}>Dinheiro</MenuItem>
                    <MenuItem value={'pix'}>Pix</MenuItem>
                </Select>
                <div id="payment" style={{ marginTop: "20%" }}>
                    {paymentType === 'dinheiro' && <PagamentoDinheiro pedidos={pedidos} onValueReceived={onValueReceived} />}
                    {paymentType === 'pix' && <PagamentoPix pedidos={pedidos} />}
                </div>
            </FormControl>
        </Box>
    )
}

export default ChoosePayment
