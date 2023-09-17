"use client";

import { useQuery } from "react-query";
import { setColorPokemon } from "@/lib/theme";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { addToFavorite, removeFromFavorite } from "@/redux/favoriteSlice";
import { IPokemon } from "@/@types/pokemon";
import { title } from "case";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/molecules";

export default function ListPokemon() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const [offset, setOffset] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(1);

  const getListPokemon = useCallback(async () => {
    const payload = {
      offset: offset,
    };
    const response = await axios.post("/api/pokemon", payload);
    setTotalPages(response.data.pagination.count);
    return response.data;
  }, [offset]);

  const { data: pokemons, refetch } = useQuery({
    queryKey: ["list-pokemon"],
    queryFn: () => getListPokemon(),
  });

  const handlePageChange = (newPage: number) => {
    refetch();
    setOffset((newPage - 1) * 21);
  };

  return (
    <div className="flex items-center flex-col">
      <div className="flex flex-wrap justify-center w-full gap-5">
        {pokemons?.results?.map((item: IPokemon) => {
          return (
            <Card
              key={item.id}
              style={{ backgroundColor: setColorPokemon(item.types[0].type.name), borderColor: setColorPokemon(item.types[0].type.name) }}
              onClick={() => router.push(`/${item.id}`)}
              className="border-2 w-96 h-52 p-5 gap-10 flex items-center cursor-pointer relative duration-500 scale-100 hover:scale-105"
            >
              <div className="w-7/12 flex flex-col">
                <div className="font-extrabold text-secondary text-xl my-5">{title(item.name)}</div>
                <div className="font-extrabold absolute top-2 left-4 text-secondary/50">{`#${item.id}`}</div>
                <div className="flex gap-2 w-full">
                  {item.types.map((color) => {
                    return (
                      <div key={color?.type.name} className="text-center text-sm pb-1 px-5 bg-secondary/20 rounded-full text-secondary ">
                        {color?.type?.name}
                      </div>
                    );
                  })}
                </div>
                {favorites.includes(item.id) ? (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeFromFavorite(item.id));
                    }}
                    className="mt-3 flex justify-center hover:bg-secondary border-secondary border-2 text-secondary bg-transparent hover:text-primary scale-100 hover:scale-105"
                  >
                    <Icon icon="ic:outline-bookmark-remove" width={24} />
                    <div className="text-sm w-full">Unfavorite</div>
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToFavorite(item.id));
                    }}
                    className="mt-3 flex justify-center bg-secondary border-secondary border-2 text-primary hover:bg-transparent hover:text-secondary scale-100 hover:scale-105"
                  >
                    <Icon icon="ic:round-bookmark-add" width={24} />
                    <div className="text-sm w-full">Favorite</div>
                  </Button>
                )}
              </div>
              <div className="w-5/12 flex items-center relative justify-center h-full">
                <Image className="h-full mt-5" src={item.sprites.other.dream_world.front_default ?? "/favicon.svg"} alt="img" width={150} height={150} />
              </div>
            </Card>
          );
        })}
      </div>
      <Pagination currentPage={Math.ceil(offset / 21) + 1} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
