import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

  return NextResponse.json(response.data);
}
