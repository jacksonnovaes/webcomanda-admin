import { useAuth } from "../../AuthProvider";
import TopMenu from "../../layouts/topMenu/TopMenu";
import FormLogin from "../Login/login";

const Products = () => {
    const { isLoggedIn } = useAuth();
    return (
        <>
            {isLoggedIn ? (
                <><TopMenu /><h1>produtos</h1></>
            ) : (
                <FormLogin/>
    )
            }
        </>
    )
}
export default Products;