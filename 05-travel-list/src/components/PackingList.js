import { useState } from "react";
import Item from "./Item";

// PackingList
function PackingList({ items, onDeleteItem, onPackItem, onDeleteAllItems }) {
    const [sortBy, setSortBy] = useState("input");
    let sortedItems = [];

    switch (sortBy) {
        case "description":
            sortedItems = [...items].sort((a, b) =>
                a.description.localeCompare(b.description)
            );
            break;
        case "packed":
            sortedItems = [...items].sort(
                (a, b) => Number(a.packed) - Number(b.packed)
            );
            break;
        default:
            sortedItems = [...items];
            break;
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onPackItem={onPackItem}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onDeleteAllItems}>Clear List</button>
            </div>
        </div>
    );
}

export default PackingList;
