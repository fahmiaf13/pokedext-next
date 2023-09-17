import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${req.offset !== 0 ? req.offset : 0}&limit=21`);
  const resPokemons = await Promise.all(
    response?.data.results.map(async (pokemon: { url: string; name: string }) => {
      const pokemonType = await axios.get(pokemon.url);
      return pokemonType.data;
    })
  );
  return NextResponse.json({ results: resPokemons, pagination: { count: response.data.count, next: response.data.next, previous: response.data.previous } });
}
