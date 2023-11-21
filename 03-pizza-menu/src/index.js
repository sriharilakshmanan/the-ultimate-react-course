import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        imageSrc: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        imageSrc: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        imageSrc: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        imageSrc: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        imageSrc: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        imageSrc: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="header">
            <h1>Fast Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    return (
        <main className="menu">
            <h2>Our Menu</h2>
            <ul className="pizzas">
                {pizzaData.map((pizza) => (
                    <Pizza key={pizza.name} pizza={pizza} />
                ))}
            </ul>
        </main>
    );
}

function Pizza({ pizza: { name, ingredients, imageSrc, price, soldOut } }) {
    return (
        <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
            <img src={imageSrc} alt={name}></img>
            <div>
                <h3>{name}</h3>
                <p>{ingredients}</p>
                <span>{soldOut ? "Sold out" : price}</span>
            </div>
        </li>
    );
}

function Footer() {
    const isClosed = true;
    return isClosed ? (
        <>
            <footer className="footer">We're currently closed.</footer>
            <button className="btn">Order</button>
        </>
    ) : null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// < React v18
// ReactDOM.render(<App />, document.getElementById("root"));
