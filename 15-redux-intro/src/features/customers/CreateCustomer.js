import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function CreateCustomer() {
    const [fullName, setFullName] = useState("");
    const [nationalID, setNationalID] = useState("");

    const dispatch = useDispatch();

    function handleClick() {
        if (!fullName || !nationalID) return;
        dispatch(createCustomer(fullName, nationalID));
    }

    return (
        <div>
            <h2>Create an account</h2>
            <div className="inputs">
                <div>
                    <label>Full Name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>National ID</label>
                    <input
                        value={nationalID}
                        onChange={(e) => setNationalID(e.target.value)}
                    />
                </div>
                <button onClick={handleClick}>Create</button>
            </div>
        </div>
    );
}

export default CreateCustomer;
