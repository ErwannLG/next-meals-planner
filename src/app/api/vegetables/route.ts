import { NextResponse } from 'next/server'

const VEGETABLES = [
	{ name: 'Asperge', seasons: ['spring'] },
	{ name: 'Artichaut', seasons: ['spring', 'fall'] },
	{ name: 'Brocoli', seasons: ['spring', 'fall'] },
	{ name: 'Carotte', seasons: ['spring', 'summer', 'fall'] },
	{ name: 'Chou-fleur', seasons: ['spring', 'fall'] },
	{ name: 'Épinard', seasons: ['spring', 'fall'] },
	{ name: 'Pois', seasons: ['spring'] },
	{ name: 'Laitue', seasons: ['spring', 'fall'] },
	{ name: 'Radis', seasons: ['spring', 'fall'] },
	{ name: 'Concombre', seasons: ['summer'] },
	{ name: 'Tomate', seasons: ['summer'] },
	{ name: 'Courgette', seasons: ['summer'] },
	{ name: 'Poivron', seasons: ['summer'] },
	{ name: 'Aubergine', seasons: ['summer'] },
	{ name: 'Maïs', seasons: ['summer'] },
	{ name: 'Haricot Vert', seasons: ['summer'] },
	{ name: 'Patate Douce', seasons: ['fall'] },
	{ name: 'Citrouille', seasons: ['fall'] },
	{ name: 'Courge Musquée', seasons: ['fall'] },
	{ name: 'Betterave', seasons: ['fall'] },
	{ name: 'Chou de Bruxelles', seasons: ['fall', 'winter'] },
	{ name: 'Chou', seasons: ['fall', 'winter'] },
	{ name: 'Chou Frisé', seasons: ['fall', 'winter'] },
	{ name: 'Poireau', seasons: ['fall', 'winter'] },
	{ name: 'Oignon', seasons: ['fall', 'winter'] },
	{ name: 'Pomme de Terre', seasons: ['fall', 'winter'] },
	{ name: 'Panais', seasons: ['fall', 'winter'] },
	{ name: 'Navet', seasons: ['fall', 'winter'] },
	{ name: 'Courge', seasons: ['fall', 'winter'] },
	{ name: 'Ail', seasons: ['spring', 'summer', 'fall', 'winter'] },
	{ name: 'Oignon (Vert)', seasons: ['spring', 'summer', 'fall', 'winter'] },
	{ name: 'Champignon', seasons: ['spring', 'summer', 'fall', 'winter'] },
	{ name: 'Céleri', seasons: ['spring', 'summer', 'fall', 'winter'] },
]

export async function GET() {
	return NextResponse.json(VEGETABLES)
}
