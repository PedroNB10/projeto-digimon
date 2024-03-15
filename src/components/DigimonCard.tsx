interface IProps {
  name: string;
  imgUrl: string;
  level: string;
}

function DigimonCard({ name, imgUrl, level }: IProps) {
  return (
    <div className="flex flex-col gap-2 border-2 border-red-300 text-center rounded-3xl overflow-hidden mx-auto w-full">
      <picture>
        <img src={imgUrl} className="w-full" alt={name} />
      </picture>

      <h2>Nome: {name}</h2>
      <p>Level: {level}</p>
    </div>
  );
}

export default DigimonCard;
