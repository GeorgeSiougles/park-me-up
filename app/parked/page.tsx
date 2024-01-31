"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { ParkedCar } from "../types/ParkedCar";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  calculateCost,
  calculateTimeDifference,
  displayTime,
  formatTimestamp,
} from "@/lib/utils";

const Page = () => {
  const [parkedCars, setParkedCars] = useState<ParkedCar[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getAllCars = async () => {
      try {
        const fetchedData = await fetch("/api/fetch-cars");
        const parsedData = await fetchedData.json();
        setParkedCars(parsedData);
        setDataLoaded(true);
        toast.success("Data Loaded");
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    getAllCars();
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(
      () => window.location.reload(),
      5 * 60 * 1000
    );

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  if (dataLoaded && parkedCars.length === 0) {
    return (
      <div>
        <LoaderIcon className="animate-spin" width={36} height={36} />
        <span className="text-3xl text-gray-700">Loading...</span>
      </div>
    );
  }

  const handleClick = (id: string) => {
    router.push(`/parked/${id}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-2 md:flex-row max-w-full">
      {parkedCars.length === 0 && dataLoaded && (
        <span className="text-5xl text-cyan-900">Parking lot is empty</span>
      )}
      {parkedCars.map((parkedCar) => {
        const formattedTime = formatTimestamp(parkedCar.createdAt!);
        const { hh, mm } = calculateTimeDifference(formattedTime);
        const parkingCost = calculateCost(hh, 2);
        return (
          <Card
            className="m-2 border-4 border-gray-700 bg-gray-200 text-gray-700 w-sm h-lg hover:bg-cyan-500"
            key={parkedCar._id}
            onClick={() => handleClick(parkedCar._id!)}
          >
            <CardHeader>
              <CardTitle>{parkedCar.carModel}</CardTitle>
              <CardTitle>
                {parkedCar.carPlateLetters} - {parkedCar.carPlateNumbers}
              </CardTitle>
              <CardDescription>Entry time: {formattedTime}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col ">
              <CardContent>
                <p>Phone:</p>
                <p>{parkedCar.ownerPhone}</p>
              </CardContent>
              <CardContent>
                <p>Car time Passed :{displayTime({ hh, mm })}</p>
                <p>
                  Current parking cost:
                  {parkingCost} &euro;
                </p>
              </CardContent>
            </CardContent>
            <CardFooter className="items-end justify-center">
              <p className="border-4 border-cyan-800 rounded-3xl p-4">View</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
export default Page;
