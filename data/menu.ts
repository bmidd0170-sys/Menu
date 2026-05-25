export type MenuItem = {
    id: string
    name: string
    price?: string
    description?: string
    tags?: string[]
}

export const starters: MenuItem[] = [
    {
        id: 'starter-ceviche',
        name: 'Captain Catch Ceviche',
        price: '$19.00',
        description: 'Lionfish, sliced conch, nance leche de tigre, burnt orange, red onion, plantain chips, grapes',
    },
    {
        id: 'starter-shrimp-empanadas',
        name: 'Caribbean Shrimp Empanadas',
        price: '$17.00',
        description: 'Corn empanadas filled with caribbean shrimp, roasted tomato sauce, pickles, honduran cheese',
    },
    {
        id: 'starter-chicken-wings',
        name: 'Chicken Wings',
        price: '$14.00',
        description: 'Crispy fried wings served with choice of sauces',
    },
]

export const entrees: MenuItem[] = [
    {
        id: 'entree-lamb-rack',
        name: 'Coffee-Rubbed Lamb Rack',
        price: '$38.00',
        description: 'Roasted sweet potato, red wine-xocote glaze, guava chimichurri, pomegranate',
    },
    {
        id: 'entree-braised-ribs',
        name: 'Island-Style Braised Short Ribs (Beef)',
        price: '$36.00',
        description: 'Creamed sweet corn, asparagus and mushrooms',
    },
    {
        id: 'entree-smoked-chicken',
        name: 'Smoked Chicken Supreme',
        price: '$32.00',
        description: 'Tamarind BBQ sauce, yuca al mojo, green sauce',
    },
]

export const mains: MenuItem[] = [
    {
        id: 'main-red-snapper',
        name: 'Grilled Red Snapper',
        price: '$36.00',
        description: 'Ripe plantain coconut curry, glazed carrot purée, pineapple chimol',
    },
    {
        id: 'main-pork-chops',
        name: 'Fried Pork Chops',
        price: '$35.00',
        description: 'Roasted red apple, fried plantain, pickled chili cabro',
    },
]

export const sides: MenuItem[] = [
    { id: 'side-mash-potatoes', name: 'Mash Potatoes', price: '$5.00' },
    { id: 'side-loaded-mixed-greens', name: 'Loaded Mixed Greens', price: '$6.00' },
    { id: 'side-rice-beans', name: 'Rice and Beans', price: '$6.00' },
]

const menu = { starters, entrees, mains, sides }

export default menu
