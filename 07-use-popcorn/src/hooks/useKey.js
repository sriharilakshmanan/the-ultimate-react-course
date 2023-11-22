import { useEffect } from "react";

function useKey(key, action) {
    useEffect(
        function () {
            function fn(e) {
                if (e.code === key) {
                    action();
                }
            }
            document.addEventListener("keydown", fn);
            return function () {
                document.removeEventListener("keydown", fn);
            };
        },
        [key, action]
    );
}
export { useKey };
