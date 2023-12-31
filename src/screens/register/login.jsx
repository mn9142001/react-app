import GenericForm from "../../utils/generic_form";
import {LOGIN} from "../../utils/constants";
import { useNavigate } from "react-router-dom";


const LogIn = () => {
    const fields = [
        { name: "username", placeholder: "username", type: "text" },
        { name: "password", placeholder: "password", type: "password" },
    ];

    const navigate = useNavigate()

    const handleSuccess = (response) => {
        console.log("success", response)
        navigate('/')
    };

    const handleError = (response) => {
        console.log("ops", response)
    };

    return <GenericForm onError={handleError} fields={fields} submitUrl={LOGIN} onSuccess={handleSuccess} />;
};

export default LogIn;
