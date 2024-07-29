import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react";
import "./pagamentocartao.css";

const PagamentoCartao = () => {
    const [cardName, setCardName] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setCardName(event.target.value as string);

    };
    return (
        <div 
            style={{
                width: "100%",
                height: "100px",
                backgroundColor: "blueviolet",
                borderRadius: "10px"
            }}>
            <span>cartao</span>
        </div>
    )
}
export default PagamentoCartao