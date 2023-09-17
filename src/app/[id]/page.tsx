"use client";

import DetailPokemon from "./services/DetailPokemon";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <DetailPokemon id={params.id} />
    </div>
  );
}
