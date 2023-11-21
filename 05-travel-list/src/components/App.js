import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// App
function App() {
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }
    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }
    function handlePackItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }
    function handleDeleteAllItems() {
        setItems([]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={handleAddItem} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onPackItem={handlePackItem}
                onDeleteAllItems={handleDeleteAllItems}
            />
            <Stats items={items} />
        </div>
    );
}

export default App;
