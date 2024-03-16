import React, { SetStateAction } from "react";

interface IProps {
  setName: (value: SetStateAction<string>) => void;
  setLevel: (value: SetStateAction<string>) => void;
}

function SearchBar({ setName, setLevel }: IProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <input
        className="p-4  border-red-400 border-2"
        type="text"
        placeholder="Pesquise pelo Digimon "
        onChange={(e) => {
          //.log(e.target.value);
          setName(e.target.value);
        }}
      />

      <select
        name=""
        id=""
        className="px-4 py-5"
        onChange={(e) => {
          //console.log(e.target.value);
          // console.log(digimons);
          setLevel(e.target.value);
        }}
      >
        <option value="Todos">Todos</option>
        <option value="Rookie">Rookie</option>
        <option value="Champion">Champion</option>
        <option value="Ultimate">Ultimate</option>
        <option value="Mega">Mega</option>
        <option value="Training">Training</option>
        <option value="In Training">In Training</option>
        <option value="Fresh">Fresh</option>
        <option value="Armor">Armor</option>
      </select>
    </div>
  );
}

export default SearchBar;
