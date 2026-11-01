"use client";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonThems({ children }) {
  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
      {children}
    </SkeletonTheme>
  );
}

export default SkeletonThems;