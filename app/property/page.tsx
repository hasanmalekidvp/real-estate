import Link from "next/link";
import PropertyItem, { IPropertyList } from "../component/PropertyItem";
import Pagination from "../component/Pagination";
import Search from "../component/Search";

interface IPropertyProps {
  params: Promise<object>;
  searchParams: Promise<{ page: string; per_page: string; title: string }>;
}

async function property({ searchParams }: IPropertyProps) {
  const page = (await searchParams).page ?? "1";
  const per_page = (await searchParams).per_page ?? "7";
  const title = (await searchParams).title ?? "";

  const result = await fetch(
    `http://localhost:3004/properties?_page=${page}&_per_page=${per_page}&title=${title}`
  );
  const data = (await result.json()) as IPropertyList;

  return (
    <div>
      <h1>Property</h1>
      <Search />
      <div className="grid grid-cols-4 gap-4 py-4">
        {data.data.map((item) => (
          <Link key={item.id} href={`/property/${item.id}`}>
            <PropertyItem {...item} />
          </Link>
        ))}

        <Pagination pageCount={data.pages} />
      </div>
    </div>
  );
}

export default property;
