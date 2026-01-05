/* eslint-disable @next/next/no-img-element */

import { IPropertyItemProps } from "@/app/component/PropertyItem";

interface IPropertyProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<object>;
}

async function property({ params }: IPropertyProps) {
  const { id } = await params;

  const result = await fetch(`http://localhost:3004/properties/${id}`);
  const data = (await result.json()) as IPropertyItemProps;

  return (
    <div className="grid grid-cols-12 mt-9 shadow-md">
      <div className="col-span-3">
        <img src={data.image} alt="" />
      </div>
      <div className="col-span-9 p-4">
        <h2 className="font-bold text-2xl">{data.title}</h2>
        <h2>Address: {data.address}</h2>
        <p>
          Price: <span>${data.price.toLocaleString()}</span>
        </p>
        <h2>Bedroom: {data.bedroom}</h2>
        <h2>Floor: {data.floor}</h2>
        <h2>Area: {data.area} sqft</h2>
      </div>
    </div>
  );
}

export default property;
