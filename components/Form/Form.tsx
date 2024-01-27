import {
  ParkedCar,
  ParkedCarSchema,
  ValidFieldNames,
} from "@/app/types/ParkedCar";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const Form = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ParkedCar>({
    resolver: zodResolver(ParkedCarSchema),
  });

  const onSubmit = async (data: ParkedCar) => {
    try {
      const response = await axios.post("/api/add-car", data);
      const { errors = {} } = response.data;
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        carPlateLetters: "carPlateLetters",
        carPlateNumbers: "carPlateNumbers",
        carModel: "carModel",
        ownerPhone: "ownerPhone",
      };
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );
      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }
      router.push("/parked");
    } catch (error) {
      alert("Submitting form failed!");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"flex flex-1 items-center justify-between mr-4"}>
        <Label>Car Plates</Label>
        <FormField
          type="text"
          placeholder="ABC"
          name="carPlateLetters"
          register={register}
          error={errors.carPlateLetters}
          className="m-2 max-w-16"
        />
        <FormField
          type="number"
          placeholder="1234"
          name="carPlateNumbers"
          register={register}
          error={errors.carPlateNumbers}
          className="max-w-24"
          maxLength={4}
        />
      </div>
      <div>
        <Label>Car Model</Label>
        <FormField
          type="text"
          placeholder="Opel Meriva"
          name="carModel"
          register={register}
          error={errors.carModel}
          className="my-2"
        />
      </div>
      <div>
        <Label>Owner Phone</Label>
        <FormField
          type="number"
          placeholder="6987654321"
          name="ownerPhone"
          register={register}
          error={errors.ownerPhone}
          className="my-2"
          maxLength={10}
        />
      </div>
      <div className="flex flex-1 justify-center items-center ">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <p>Submiting...</p> : <p>Submit</p>}
        </Button>
      </div>
    </form>
  );
};
export default Form;
