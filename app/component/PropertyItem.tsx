/* eslint-disable @next/next/no-img-element */

export interface IPropertyItemProps {
  id: string;
  title: string;
  image: string;
  price: number;
  address: string;
  bedroom: number;
  floor: number;
  area: number;
  forsale: boolean;
  property_type: string;
}

export interface IPropertyList {
  first: number | null;
  items: number | null;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
  data: IPropertyItemProps[];
}

export function PropertyItem({
  title,
  image,
  price,
  forsale,
  property_type,
}: IPropertyItemProps) {
  return (
    <div>
      <img src={image} alt=""></img>

      <div className="shadow-md">
        <h3 className="font-bold">{title}</h3>

        <p>
          Price: <span>${price.toLocaleString()}</span>
        </p>

        <p>
          Forsale: <span>{forsale ? "ForSale" : "ForRent"}</span>
        </p>

        <p>
          Property type: <span>{property_type}</span>
        </p>
      </div>
    </div>
  );
}

export default PropertyItem;
