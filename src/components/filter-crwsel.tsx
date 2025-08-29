import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface filterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onselect: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}
const FilterCrawsle = ({
  value,
  onselect,
  data,
  isLoading,
}: filterCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div>
      <div
        className={cn(
          "absolute left-12 top-0 bottom-0 w-12 z-10 from-white bg-gradient-to-t to-transparent pointer-events-none",
          current === 1 && "hidden"
        )}
      />

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full px-12"
      >
        <CarouselContent  className="-ml-3">
          {!isLoading && (
          <CarouselItem  className="pl-3 basis-auto" onClick={() => onselect(null)} >
            <Badge
              variant={!value ? "default" : "secondary"}
              className="cursor-pointer px-3 rounded-lg whitespace-nowrap text-sm py-1 "
            >
              WellWell
            </Badge>
          </CarouselItem>
          )}
          {isLoading &&
            Array.from({ length: 18 }).map((_, index) => (
              <CarouselItem key={index}  className="pl-3 basis-auto">
                <Skeleton className="px-3 py-1 rounded-lg text-sm font-semibold">
                  &nbsp;
                </Skeleton>
              </CarouselItem>
            ))}
          {!isLoading &&
            data.map((data) => (
              <CarouselItem key={data.value} onClick={() => onselect(data.value)} className="pl-3 basis-auto">
                <Badge
                  variant={value === data.value ? "default" : "secondary"}
                  className="cursor-pointer px-3 rounded-lg whitespace-nowrap text-sm py-1 "
                >
                  {data.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-20" />
        <CarouselNext className="right-0 z-20" />
      </Carousel>
      <div
        className={cn(
          "absolute right-12 top-0 bottom-0 w-12 z-10 from-white bg-gradient-to-t to-transparent pointer-events-none",
          current === count && "hidden"
        )}
      />
    </div>
  );
};

export default FilterCrawsle;
