import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    // push to redux
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    //Remove the product from the basket
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"£"}
        />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              src="https://links.papareact.com/fdw"
              alt=""
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* right add and remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button mt-auto">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button mt-auto">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
