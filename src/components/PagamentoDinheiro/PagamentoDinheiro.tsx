import { TextField } from "@mui/material"
import Ipedidos from "../../interfaces/Ipedidos"
import { useState, useEffect } from "react"

const PagamentoDinheiro = ({ pedidos, onValueReceived }: { pedidos: Ipedidos[], onValueReceived: (valueRec: number) => void }) => {
    const [valueRec, setValueRec] = useState<number>(0)

    const handleValueRecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueRec(Number(event.target.value));
    };

    useEffect(() => {
        onValueReceived(valueRec);
    }, [valueRec, onValueReceived]);

    const troco = valueRec > 0 ? valueRec - pedidos[0].totalOrder : 0;
    return (
        <>
            <TextField
                id="outlined-basic"
                label="valor recebido"
                variant="outlined"
                size="small"
                onChange={handleValueRecChange} 
                value={valueRec}
            />
            <div>
                <span>Troco: {troco.toFixed(2)}</span>
            </div>
        </>
    )
}

export default PagamentoDinheiro
