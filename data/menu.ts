export type MenuItem = {
    id: string
    name: string
    price?: string
    description?: string
    tags?: string[]
}

export const starters: MenuItem[] = [
    {
        id: 'starter-fish-wing',
        name: 'Fish Wing',
        price: '$18.00',
        description: 'Crispy fried fish collar, copan mole, roasted garlic, sour cream tartar',
    },
    {
        id: 'starter-tuna-crudo',
        name: 'Arabic Roatan Tuna Crudo',
        price: '$18.00',
        description: 'Chickpeas-tahini emulsion, pear & balsamic relish, organic honey, sumac crispy coral rice',
    },
    {
        id: 'starter-paradise-salad',
        name: 'Paradise Garden Salad',
        price: '$15.00',
        description: 'Honduran lettuce, pistachio vinaigrette, grilled avocado, watermelon, beetroot hummus, pollen',
        tags: ['vegan'],
    },
    {
        id: 'starter-shrimp-empanadas',
        name: 'Caribbean Shrimp Empanadas',
        price: '$17.00',
        description: 'Corn empanadas filled with caribbean shrimp, roasted tomato sauce, pickles, honduran cheese',
    },
    {
        id: 'starter-burrata-papaya',
        name: 'Burrata & Grilled Papaya',
        price: '$18.00',
        description: 'Caramelized coconut, papaya chutney, basil, mint, toasted cashew dressing',
        tags: ['vegetarian'],
    },
    {
        id: 'starter-ceviche',
        name: 'Captain Catch Ceviche',
        price: '$19.00',
        description: 'Lionfish, sliced conch, nance leche de tigre, burnt orange, red onion, plantain chips, grapes',
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
        name: 'Island-Style Braised Short Ribs',
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
    { id: 'side-roasted-sweet-potato', name: 'Roasted Sweet Potato', price: '$6.00' },
    { id: 'side-creamed-corn', name: 'Creamed Sweet Corn', price: '$6.00' },
    { id: 'side-yuca-al-mojo', name: 'Yuca al Mojo', price: '$6.00' },
    { id: 'side-glazed-carrot', name: 'Glazed Carrot Purée', price: '$5.00' },
    { id: 'side-fried-plantains', name: 'Fried Plantains', price: '$5.00' },
    { id: 'side-pineapple-chimol', name: 'Pineapple Chimol', price: '$5.00' },
]

const menu = { starters, entrees, mains, sides }

export default menu
