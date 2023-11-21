// Item
function Item({
    item: { id, description, packed, quantity },
    onDeleteItem,
    onPackItem,
}) {
    function handleDeleteItem() {
        onDeleteItem(id);
    }
    function handlePackItem() {
        onPackItem(id);
    }
    return (
        <li>
            <input type="checkbox" checked={packed} onChange={handlePackItem} />
            <span style={packed ? { textDecoration: "line-through" } : {}}>
                {quantity} {description}
            </span>
            <button onClick={handleDeleteItem}>❌</button>
        </li>
    );
}
export default Item;
