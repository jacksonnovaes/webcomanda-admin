import { TextField } from "@mui/material"
import Ipedidos from "../../interfaces/Ipedidos"
import { useState } from "react"

const PagamentoDinheiro = ({ pedidos }: { pedidos: Ipedidos[] }) => {
    const [valueRec, setValueRec] = useState<number>(0)

    const handleValueRecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueRec(Number(event.target.value));

    };
    const troco = valueRec > 0 ? valueRec - pedidos[0].totalOrder : 0;
    return (
        <><TextField
            id="outlined-basic"
            label="valor recebido"
            variant="outlined"
            size="small"
            onChange={handleValueRecChange} />
            <div>
                <span>Troco: {troco.toFixed(2)}</span>
            </div>
        </>
    )
}
export default PagamentoDinheiro