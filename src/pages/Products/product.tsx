import { useState } from "react";
import { useAuth } from "../../AuthProvider";
import Menu from "../../components/Menu/Menu";
import TopMenu from "../../layouts/topMenu/TopMenu";
import FormLogin from "../Login/login";
import EstoqueProducts from "../../components/EstoqueProducts/EstoqueProducts";

const Products = () => {
    const { isLoggedIn } = useAuth();
    const [idMenu, setIdMenu] = useState<number | undefined>(undefined);
    return (
        <>
            {isLoggedIn ? (
                <>
                <TopMenu />
                   <Menu setIdMenu={setIdMenu }/>
                   <EstoqueProducts idMenu={idMenu}/>
                  
                   </>
                ) : (
                <FormLogin />
            )
            }
        </>
    )
}
export default Products;