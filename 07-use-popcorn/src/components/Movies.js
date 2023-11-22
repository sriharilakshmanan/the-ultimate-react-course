import { useState } from "react";

// Composition of components (explicit prop)
// function Movies({ element }) {
//     const [isOpen, setIsOpen] = useState(true);
//     return (
//         <div className="box">
//             <button
//                 className="btn-toggle"
//                 onClick={() => setIsOpen((open) => !open)}
//             >
//                 {isOpen ? "–" : "+"}
//             </button>
//             {isOpen && element}
//         </div>
//     );
// }
export function Movies({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}
