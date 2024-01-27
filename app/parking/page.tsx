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
  const [isValidInput, setIsValidInput] = useState({
    isPlateNumbersValid: false,
    isPlateLettersValid: false,
    isCarModelValid: false,
    isPhoneNumberValid: false,
  });
  const [plateLetters, setPlateLetters] = useState("");
  const [plateNumbers, setPlateNumbers] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (newPhone.trim().length === 10) {
      setIsValidInput({ ...isValidInput, isPhoneNumberValid: true });
    } else {
      setIsValidInput({ ...isValidInput, isPhoneNumberValid: false });
    }
  };

  const handlePlateLetterBlur = () => {
    if (plateLetters.trim().length === 0) {
      setIsValidInput({ ...isValidInput, isPlateLettersValid: false });
    }
    if (plateLetters.trim().length > 0 && plateLetters.trim().length < 4) {
      setIsValidInput({ ...isValidInput, isPlateLettersValid: true });
    }
  };
  const handlePlateNumberBlur = () => {
    if (plateNumbers.trim().length === 0) {
      setIsValidInput({ ...isValidInput, isPlateNumbersValid: false });
    }
    if (plateNumbers.trim().length > 0 && plateNumbers.trim().length < 5) {
      setIsValidInput({ ...isValidInput, isPlateNumbersValid: true });
    }
  };
  const handleCarModelBlur = () => {
    if (newCar.carModel.trim().length === 0) {
      setIsValidInput({ ...isValidInput, isCarModelValid: false });
    }
    if (
      newCar.carModel.trim().length > 0 &&
      newCar.carModel.trim().length < 40
    ) {
      setIsValidInput({ ...isValidInput, isCarModelValid: true });
    }
  };
  const handleOwnerPhoneBlur = () => {
    if (newCar.ownerPhone.trim().length === 0) {
      setIsValidInput({ ...isValidInput, isPhoneNumberValid: false });
    }
    if (newCar.ownerPhone.trim().length === 10) {
      setIsValidInput({ ...isValidInput, isPhoneNumberValid: true });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await fetch("/api/add-car", {
        method: "POST",
        body: JSON.stringify(newCar),
      });
    } catch (error) {
      console.log("Something went wrong while sending data", error);
    } finally {
      setIsSubmitting(false);
    }
    router.push("/parked");
  };

  let isFormValid = false;
  isFormValid =
    isValidInput.isPlateNumbersValid &&
    isValidInput.isPlateLettersValid &&
    isValidInput.isCarModelValid &&
    isValidInput.isPhoneNumberValid;
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
              onBlur={handlePlateLetterBlur}
            />
            <Input
              maxLength={4}
              placeholder={"1234"}
              className="max-w-24"
              value={plateNumbers}
              onChange={(e) => handlePlateNumbersChange(e.target.value)}
              onBlur={handlePlateNumberBlur}
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
              onBlur={handleCarModelBlur}
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
              onBlur={handleOwnerPhoneBlur}
            />
          </div>
          <div className="flex flex-1 justify-center items-center ">
            <Button type="submit" disabled={isSubmitting || !isFormValid}>
              {isSubmitting ? <p>Submitting...</p> : <p>Enter new car</p>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
