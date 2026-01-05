"use client";

interface Props {
  propertyId: string;
}

export function Addwishlist({ propertyId }: Props) {
  const addToWishlist = async () => {
    await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId }),
    });
    console.log(JSON.stringify({ propertyId }));
  };

  return (
    <button
      onClick={addToWishlist}
      className="bg-red-500 text-white rounded px-2 py-1 mt-1 font-semibold"
    >
      Heart
    </button>
  );
}

export default Addwishlist;
