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
  const [plateLetters, setPlateLetters] = useState("");
  const [plateNumbers, setPlateNumbers] = useState("");

  const handlePlateLettersChange = (newLetters: string) => {
    setPlateLetters(newLetters);
    setNewCar({ ...newCar, carPlates: `${newLetters}-${plateNumbers}` });
  };
  const handlePlateNumbersChange = (newNumber: string) => {
    setPlateNumbers(newNumber);
    setNewCar({ ...newCar, carPlates: `${plateLetters}-${newNumber}` });
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
              maxLength={3}
              placeholder={"ABC"}
              className="m-2 max-w-16"
              value={plateLetters}
              onChange={(e) => handlePlateLettersChange(e.target.value)}
            />
            <Input
              maxLength={4}
              placeholder={"1234"}
              className="max-w-24"
              value={plateNumbers}
              onChange={(e) => handlePlateNumbersChange(e.target.value)}
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
