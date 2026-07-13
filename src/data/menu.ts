export interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: number;
	tone?: "accent" | "success" | "warning" | "danger";
	tag?: string;
}

export const menu: MenuItem[] = [
	{
		id: "espresso",
		name: "Espresso",
		description: "Double shot, rich crema.",
		price: 3.0,
	},
	{
		id: "cortado",
		name: "Cortado",
		description: "Espresso with a splash of warm milk.",
		price: 4.5,
		tag: "Popular",
		tone: "accent",
	},
	{
		id: "flat-white",
		name: "Flat White",
		description: "Velvety microfoam over a double ristretto.",
		price: 5.0,
	},
	{
		id: "latte",
		name: "Latte",
		description: "Smooth steamed milk with espresso.",
		price: 5.25,
	},
	{
		id: "cappuccino",
		name: "Cappuccino",
		description: "Equal espresso, milk and foam.",
		price: 4.75,
	},
	{
		id: "mocha",
		name: "Mocha",
		description: "Espresso, chocolate and steamed milk.",
		price: 5.75,
		tag: "Sweet",
		tone: "warning",
	},
	{
		id: "cold-brew",
		name: "Cold Brew",
		description: "Slow-steeped 16 hours, served over ice.",
		price: 4.75,
		tag: "Iced",
		tone: "success",
	},
	{
		id: "chai",
		name: "Chai Latte",
		description: "Spiced tea concentrate with steamed milk.",
		price: 4.5,
	},
];
