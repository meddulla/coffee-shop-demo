import { NavLink, Route, Routes } from "react-router-dom";

import { AboutPage } from "./pages/AboutPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrderPage } from "./pages/OrderPage";
import { OrdersPage } from "./pages/OrdersPage";

export function App() {
	return (
		<div className="app">
			<header className="header">
				<NavLink to="/" style={{ color: "inherit" }}>
					<h1>☕ Bean & Brew</h1>
				</NavLink>
				<nav>
					<NavLink to="/" end>
						Home
					</NavLink>
					<NavLink to="/menu">Menu</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/orders">My orders</NavLink>
					<NavLink to="/feedback">Feedback</NavLink>
				</nav>
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/menu" element={<MenuPage />} />
					<Route path="/order" element={<OrderPage />} />
					<Route path="/orders" element={<OrdersPage />} />
					<Route path="/checkout/:id" element={<CheckoutPage />} />
					<Route path="/feedback" element={<FeedbackPage />} />
					<Route path="/confirmation/:id" element={<ConfirmationPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
			<footer
				style={{
					marginTop: 64,
					paddingTop: 24,
					borderTop: "1px solid var(--border)",
					color: "var(--ink-2)",
					fontSize: 13,
				}}
			>
				© Bean & Brew — a demo app.
			</footer>
		</div>
	);
}
