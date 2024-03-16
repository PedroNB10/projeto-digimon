import Image from "next/image";
interface IProps {
  name: string;
  imgUrl: string;
  level: string;
}

function DigimonCard({ name, imgUrl, level }: IProps) {
  return (
    <div className="p-3 bg-slate-700 rounded-3xl mx-auto">
      <div className="flex flex-col gap-2 border-2 bg-white border-blue-500 text-center rounded-3xl overflow-hidden mx-auto w-fit  cursor-pointer py-4 group px-4 ">
        <picture>
          <Image
            src={imgUrl}
            className="px-4 py-6 border-orange-500 border-4 rounded-full  group-hover:scale-105 transition-all duration-200"
            height={300}
            width={300}
            alt={name}
          />
        </picture>
        <h2 className="font-semibold text-blue-700">Nome: {name}</h2>
        <p className="font-semibold text-orange-600">Level: {level}</p>
      </div>
    </div>
  );
}

export default DigimonCard;
