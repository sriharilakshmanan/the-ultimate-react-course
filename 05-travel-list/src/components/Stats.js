// Stats
function Stats({ items }) {
    if (!items.length) {
        return (
            <footer className="stats">
                Start adding items to your packing list 🚀
            </footer>
        );
    }
    const noOfItems = items.length;
    const noOfPackedItems = items.filter((item) => item.packed).length;
    return (
        <footer className="stats">
            You have packed {noOfPackedItems} out of {noOfItems} items.
        </footer>
    );
}
export default Stats;
