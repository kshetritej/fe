import Image from "next/image";
export interface TeamCardProps {
  image?: string;
  name: string;
  designation: string;
  description: string;
}

export default function TeamCard({
  image,
  name,
  designation,
  description,
}: TeamCardProps) {
  return (
    <div className="grid md:grid-cols-4 gap-4 items-start justify-start text-center bg-white w-full p-8 rounded-sm">
      <div className="h-42 w-42 overflow-hidden rounded-sm col-span-1">
        <Image
          src={image ?? "/assets/everest.jpg"}
          width={720}
          height={420}
          alt="Everest"
        />
      </div>
      <div className="flex items-start flex-col col-span-3 text-left space-y-2">
        <dt className="font-black">{name}</dt>
        <dd>{designation}</dd>
        <p>{description}</p>
      </div>
    </div>
  );
}
