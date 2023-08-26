import GenericForm from "../../utils/generic_form";

const LogIn = () => {
    const fields = [
        { name: "email", placeholder: "email", type: "email" },
        { name: "password", placeholder: "password", type: "password" },
    ];

    const handleSubmit = (formData) => {
        // Handle form submission with the formData
        console.log("Form submitted:", formData);
    };

    return <GenericForm fields={fields} onSubmit={handleSubmit} />;
};

export default LogIn;
