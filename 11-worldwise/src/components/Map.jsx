import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const navigate = useNavigate();
    return (
        <div
            className={styles.mapContainer}
            onClick={function () {
                navigate("form");
            }}
        >
            <h1>{`Position: ${lat}, ${lng}`}</h1>
            <button
                onClick={function () {
                    setSearchParams({ lat: 48, lng: 48 });
                }}
            >
                Change Pos
            </button>
        </div>
    );
}

export default Map;
