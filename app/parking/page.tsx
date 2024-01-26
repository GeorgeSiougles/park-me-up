"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [newCar, setNewCar] = useState<ParkedCar>({
    carPlates: "",
    carModel: "",
    ownerPhone: "",
  });

  const handlePlateChange = (newPlates: string) => {
    setNewCar({ ...newCar, carPlates: newPlates });
  };
  const handleModelChange = (newModel: string) => {
    setNewCar({ ...newCar, carModel: newModel });
  };
  const handlePhoneChange = (newPhone: string) => {
    setNewCar({ ...newCar, ownerPhone: newPhone });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/add-car", {
        method: "POST",
        body: JSON.stringify(newCar),
      });
    } catch (error) {
      console.log("Something went wrong while sending data", error);
    }
    router.push("/parked");
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="flex-1 mt-4 p-4 border-4 rounded-lg border-slate-500 ">
        <form onSubmit={handleSubmit}>
          <div className={"flex flex-1 items-center justify-between mr-4"}>
            <Label>Car Plates</Label>
            <Input
              maxLength={8}
              placeholder={"ABC 1234"}
              className="my-2"
              value={newCar.carPlates}
              onChange={(e) => handlePlateChange(e.target.value)}
            />
          </div>
          <div className={"flex flex-1 items-center justify-between mr-4"}>
            <Label>Car Model</Label>
            <Input
              maxLength={40}
              placeholder={"Opel Meriva"}
              className="my-2"
              value={newCar.carModel}
              onChange={(e) => handleModelChange(e.target.value)}
            />
          </div>
          <div className={"flex flex-1 items-center justify-between mr-4"}>
            <Label>Owner Phone</Label>
            <Input
              maxLength={10}
              placeholder={"6987654321"}
              className="my-2"
              value={newCar.ownerPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </div>
          <div className="flex flex-1 justify-center items-center ">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
