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
import {
  calculateCost,
  calculateTimeDifference,
  displayTime,
  formatTimestamp,
} from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ParkIdPageProps = {
  params: {
    parkId: string;
  };
};
/**
 * ParkIdPage component displays details of a parked car identified by the parkId parameter.
 *
 * @component
 * @param {ParkIdPageProps} props - The component properties.
 * @returns {JSX.Element} The rendered ParkIdPage component.
 */
const ParkIdPage = ({ params }: ParkIdPageProps): JSX.Element => {
  // State to hold parked car details, loading status, and notFound status
  const [parkedCar, setParkedCar] = useState<ParkedCar>();
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState<boolean>();

  // Next.js router instance
  const router = useRouter();

  /**
   * Effect to fetch car details when the component mounts or when parkId changes.
   */
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setIsLoading(true);
        // Make a POST request to fetch car details
        const response = await axios.post("/api/fetch-car", {
          parkId: params.parkId,
        });

        if (response.status === 200) {
          setParkedCar(response.data);
          toast.success("Data Loaded");
        }
      } catch (error: AxiosError | unknown | any) {
        if (error.response?.status === 404) {
          setNotFound(true);
          toast.error("Car not found");
        }
        toast.error("Something went wrong, try again later");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [params.parkId]);

  /**
   * Effect to refresh the page every 5 minutes.
   */
  useEffect(() => {
    const refreshInterval = setInterval(
      () => window.location.reload(),
      5 * 60 * 1000
    );

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  /**
   * Handler function to handle the checkout button click.
   * Attempts to delete the parked car and navigates to the "/parked" route on success.
   */
  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      // Make a DELETE request to remove the parked car
      await axios.delete("/api/remove-car", {
        data: {
          parkId: parkedCar?._id,
        },
      });
      router.push("/parked");
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  // If the car is not found, display an error message
  if (notFound) {
    return (
      <div className="flex justify-center my-4">
        <span className="text-4xl border-8 rounded-3xl border-red-700 text-red-700 px-8 py-2">
          Car Not Found
        </span>
      </div>
    );
  }

  // Calculate formatted time, time difference, and parking cost
  const formattedTime = formatTimestamp(parkedCar?.createdAt!);
  const { hh, mm } = calculateTimeDifference(formattedTime);
  const parkingCost = calculateCost(hh, 2);

  // Render the card with parked car details

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
            <CardContent>
              <p>Phone:</p>
              <p>{parkedCar?.ownerPhone}</p>
            </CardContent>
            <CardContent>
              <p>Car time Passed :{displayTime({ hh, mm })}</p>
              <p>
                Current parking cost:
                {parkingCost} &euro;
              </p>
            </CardContent>
            <CardFooter className="items-end justify-evenly">
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
export default ParkIdPage;
