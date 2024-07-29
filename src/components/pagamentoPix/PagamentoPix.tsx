import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react";

const PagamentoPix = () => {
    const [cardName, setCardName] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setCardName(event.target.value as string);

    };
    return (
      <span> pix</span>
    )
}
export default PagamentoPix