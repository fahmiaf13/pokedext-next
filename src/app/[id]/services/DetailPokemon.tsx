"use client";

import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { IPokemon } from "@/@types/pokemon";
import { setColorPokemon } from "@/lib/theme";
import { title } from "case";
import { Card } from "@/components/atoms/Card";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

export default function DetailPokemon({ id }: any) {
  const router = useRouter();
  const getDetailPokemon = async () => {
    const response = await axios.get(`/api/pokemon/${id}`);
    return response.data;
  };
  const { data: pokemon } = useQuery<IPokemon>({
    queryKey: ["detail-pokemon"],
    queryFn: () => getDetailPokemon(),
  });

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: pokemon?.stats?.map((item) => {
      return title(item.stat.name);
    }),
    datasets: [
      {
        backgroundColor: setColorPokemon(pokemon?.types[0]?.type?.name),
        data: pokemon?.stats.map((item) => item?.base_stat),
      },
    ],
  };
  return (
    <>
      <section style={{ backgroundColor: setColorPokemon(pokemon?.types[0]?.type?.name) }} className="min-h-screen">
        <div className="flex justify-center items-center">
          <Card className="w-1/2 min-h-[500px] p-10 rounded-xl relative my-[10rem]">
            <div className="flex">
              <div className="flex flex-col">
                <div className="text-6xl font-extrabold mt-9 mb-3">{title(pokemon?.name ?? "undefined")}</div>
                <div style={{ backgroundColor: setColorPokemon(pokemon?.types[0].type.name) }} className="text-base my-2 pb-1 px-3 w-fit rounded-lg text-secondary font-extralight">
                  {pokemon?.types[0].type.name}
                </div>
              </div>
              <Image width={200} height={200} className="h-[16rem] absolute -top-[5rem] right-[2rem] " src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon?.id}.svg`} alt="pokemon" />
            </div>
            <div className="flex w-full justify-between my-5 font-extrabold">
              <div className="flex flex-col">
                <div style={{ color: setColorPokemon(pokemon?.types[0].type.name) }}>Weight</div>
                <div className="text-center">{pokemon?.weight}</div>
              </div>
              <div className="flex flex-col">
                <div style={{ color: setColorPokemon(pokemon?.types[0].type.name) }}>Height</div>
                <div className="text-center">{pokemon?.height}</div>
              </div>
              <div className="flex flex-col">
                <div style={{ color: setColorPokemon(pokemon?.types[0].type.name) }}>Category</div>
                <div className="text-center">{pokemon?.weight}</div>
              </div>
              <div className="flex flex-col">
                <div style={{ color: setColorPokemon(pokemon?.types[0].type.name) }}>Abilities</div>
                <div className="text-center">{pokemon?.weight}</div>
              </div>
            </div>
            <div className="mt-10">
              <Bar data={data} options={options} height={150} />
            </div>
            <Icon icon="ion:arrow-back-circle" width={40} className="absolute top-5 left-5 cursor-pointer" onClick={() => router.push("/")} />
          </Card>
        </div>
      </section>
    </>
  );
}
