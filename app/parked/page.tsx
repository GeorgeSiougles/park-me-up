'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useEffect, useState } from 'react';
import { ParkedCar } from '../types/ParkedCar';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  calculateCost,
  calculateTimeDifference,
  displayTime,
  formatTimestamp,
} from '@/lib/utils';
/**
 * Page component displays a list of parked cars with relevant information.
 *
 * @component
 * @returns {JSX.Element} The rendered Page component.
 */
const Page = () => {
  // State to hold parked car details, loading status, and dataLoaded status
  const [parkedCars, setParkedCars] = useState<ParkedCar[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();

  /**
   * Effect to fetch the list of parked cars when the component mounts.
   */
  useEffect(() => {
    const getAllCars = async () => {
      try {
        const fetchedData = await fetch('/api/fetch-cars');

        // Check if the response is successful before parsing the data
        if (!fetchedData.ok) {
          throw new Error('Failed to fetch data');
        }

        const parsedData = await fetchedData.json();
        setParkedCars(parsedData);
        setDataLoaded(true);
        toast.success('Data Loaded');
      } catch (error) {
        toast.error('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    };

    getAllCars();
  }, []);

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
   * Handler function to navigate to the detailed view of a parked car.
   * @param {string} id - The ID of the parked car.
   */
  const handleClick = (id: string) => {
    router.push(`/parked/${id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-3 max-w-full">
      {/* Display loading spinner while data is being loaded */}
      {parkedCars.length === 0 && !dataLoaded && (
        <div>
          <LoaderIcon className="animate-spin" width={36} height={36} />
          <span className="text-3xl text-gray-700">Loading...</span>
        </div>
      )}

      {/* Display a message if the parking lot is empty */}
      {parkedCars.length === 0 && dataLoaded && (
        <span className="text-5xl text-cyan-900">Parking lot is empty</span>
      )}

      {/* Render each parked car as a Card component */}
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
