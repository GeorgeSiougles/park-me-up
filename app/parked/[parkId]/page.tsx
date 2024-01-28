"use client";

import { ParkedCar } from "@/app/types/ParkedCar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios, { AxiosError } from "axios";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

type ParkIdPageProps = {
  params: {
    parkId: string;
  };
};
const Page = ({ params }: ParkIdPageProps) => {
  const [parkedCar, setParkedCar] = useState<ParkedCar>();
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState<boolean>();
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/fetch-car", {
          parkId: params.parkId,
        });
        if (response.status === 200) {
          setParkedCar(response.data);
        }
      } catch (error: AxiosError | unknown | any) {
        if (error.response.status === 404) {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCar();
  }, [params.parkId]);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/remove-car", {
        data: {
          parkId: parkedCar?._id,
        },
      });
    } catch (error) {
      console.log("something went wrong");
      setIsLoading(false);
    }
  };

  if (notFound) {
    return (
      <div className="flex justify-center my-4">
        <span className="text-4xl border-8 rounded-3xl border-red-700 text-red-700 px-8 py-2">
          Car Not Found
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md flex-1">
        {isLoading ? (
          <div>
            <LoaderIcon className="animate-spin" width={36} height={36} />
            <span className="text-3xl text-gray-700">Loading...</span>
          </div>
        ) : (
          <Card
            className="m-2 border-4 border-gray-700 bg-gray-200 text-gray-700 w-sm h-lg "
            key={parkedCar?._id}
          >
            <CardHeader>
              <CardTitle>{parkedCar?.carModel}</CardTitle>
              <CardTitle>
                {parkedCar?.carPlateLetters} - {parkedCar?.carPlateNumbers}
              </CardTitle>
              <CardDescription>Car Parked Date</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col ">
              <CardContent>
                <p>Phone:</p>
                <p>{parkedCar?.ownerPhone}</p>
              </CardContent>
              <CardContent>
                <p>Car time Passed</p>
                <p>Current parking cost</p>
              </CardContent>
            </CardContent>
            <CardFooter className="items-end justify-evenly">
              <p className="border-4 border-cyan-800 rounded-3xl px-8 py-2 hover:bg-cyan-700 hover:text-gray-200 hover:border-cyan-700">
                Edit
              </p>
              <p className="border-4 bg-cyan-800 text-gray-200 border-cyan-800 rounded-3xl px-4 py-2  hover:bg-green-700 hover:border-green-700">
                <button onClick={handleCheckout}>Checkout</button>
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};
export default Page;
