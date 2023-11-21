// s - current state of a variable
import { useState } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

function App() {
    return (
        <>
            <Steps />
        </>
    );
}

function Steps() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);
    function handlePrevious() {
        if (step > 1) setStep((step) => step - 1);
    }
    function handleNext() {
        if (step < 3) setStep((step) => step + 1);
    }
    return (
        <>
            <button
                className="close"
                onClick={function () {
                    setIsOpen((s) => !s);
                }}
            >
                &times;
            </button>
            {isOpen && (
                <main className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>2</div>
                        <div className={step >= 3 ? "active" : ""}>3</div>
                    </div>
                    {/* prettier-ignore */}
                    <p className="message">{`Step ${step}: ${messages[step - 1]}`}</p>
                    <div className="buttons">
                        <Button
                            bgColor="#7950f2"
                            textColor="#fff"
                            onClick={handlePrevious}
                        >
                            Previous
                        </Button>
                        <Button
                            bgColor="#7950f2"
                            textColor="#fff"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </div>
                </main>
            )}
        </>
    );
}

function Button({ bgColor, textColor, onClick, children }) {
    return (
        <button
            style={{
                backgroundColor: bgColor,
                color: textColor,
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
export default App;
