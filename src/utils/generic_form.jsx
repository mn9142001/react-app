import React, { useState } from "react";
import isFormValid from "./validator";

const GenericForm = ({ fields, onSubmit }) => {
    const initialFormData = fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const is_valid = isFormValid(initialFormData, formData);
        if (is_valid) {
            onSubmit(formData);
        }
    };

    const inputStyle = "p-1 text-center border-black border-2 text-black rounded-md m-2";

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <form className="flex flex-col w-fit p-2" onSubmit={formSubmitHandler}>
                {fields.map((field) => (
                    <input
                        key={field.name}
                        className={inputStyle}
                        placeholder={field.placeholder}
                        type={field.type}
                        name={field.name}
                        onChange={inputChangeHandler}
                        value={formData[field.name]}
                    />
                ))}
                <button type="submit" className="p-2 bg-gray-500 text-white">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default GenericForm