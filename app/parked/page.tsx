import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parkedCars } from "../constants/parkedCars";

const page = () => {
  return (
    <div className="flex p-2 sm:flex-col">
      {parkedCars.map((parkedCar) => (
        <Card
          className="m-2 border-4 border-gray-700 bg-gray-100 sm:max-w-sm "
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
export default page;