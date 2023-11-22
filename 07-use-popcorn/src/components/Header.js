import { Logo } from "./Logo";

export function Header({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
}
