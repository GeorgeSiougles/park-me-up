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

const Page = () => {
  const [parkedCars, setParkedCars] = useState<ParkedCar[]>([]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const fetchedData = await fetch("/api/fetch-cars");
        const parsedData = await fetchedData.json();
        setParkedCars(parsedData);
      } catch (error) {
        console.log("Error fetching cars", error);
      }
    };
    getAllCars();
  }, []);

  return (
    <div className="flex flex-1 flex-col p-2 md:flex-row ">
      {parkedCars.map((parkedCar) => (
        <Card
          className="m-2 border-4 border-gray-700 bg-gray-100 max-w-sm "
          key={parkedCar.carPlates}
        >
          <CardHeader>
            <CardTitle>
              {parkedCar.carModel} - {parkedCar.carPlates}
            </CardTitle>
            <CardDescription>Car Parked Date</CardDescription>
          </CardHeader>
          <CardContent>
            <CardContent>
              <p>Phone:</p>
              <p>{parkedCar.ownerPhone}</p>
            </CardContent>
            <CardContent>
              <p>Car time Passed</p>
              <p>Current parking cost</p>
            </CardContent>
          </CardContent>
          <CardFooter>
            <p>Car Actions</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default Page;
