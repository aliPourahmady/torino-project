"use client";
import { useTours } from "@/hooks/useTours";
import Image from "next/image";
import React, { useEffect } from "react";

function TourCard({ tour }) {
  const { image, title, price } = tour;
  return (
    <div>
      <div>
        <Image src={image} alt={title} width={327} height={159} />
        <h3>{title}</h3>
        <p></p>
      </div>
      <hr />
      <div>
        <button>رزرو</button>
        <p>
          <span>{price}</span>
          تومان
        </p>
      </div>
    </div>
  );
}

export default TourCard;
