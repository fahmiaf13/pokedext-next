import ListPokemon from "./services/ListPokemon";

export default async function Home() {
  return (
    <main className="min-h-screen mt-[10rem]">
      <ListPokemon />
    </main>
  );
}
