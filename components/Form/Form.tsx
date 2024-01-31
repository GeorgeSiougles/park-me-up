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
import toast from "react-hot-toast";

/**
 * Form component for adding parked cars.
 */
const Form = () => {
  const router = useRouter();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ParkedCar>({
    resolver: zodResolver(ParkedCarSchema),
  });

  /**
   * Submit handler for the form.
   * @param {ParkedCar} data - Form data representing a parked car.
   */
  const onSubmit = async (data: ParkedCar) => {
    try {
      // Submit form data to the server
      const response = await axios.post("/api/add-car", data);

      const { errors = {} } = response.data;
      // Map server errors to form fields and set errors using setError
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

      // Redirect to the parked cars page
      router.push("/parked");
    } catch (error) {
      // Handle form submission failure
      if (axios.isAxiosError(error)) {
        // Axios error (network error, HTTP error, etc.)
        if (error.response?.status === 400) {
          // Car with the same plate already exists
          toast.error(
            "Car with the same plate already exists. Please provide unique plate details."
          );
        } else {
          // Handle other HTTP errors
          toast.error(`HTTP Error: ${error.response?.status || "Unknown"}`);
        }
      } else {
        // Handle other types of errors (e.g., network issues, timeouts)
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  // Render the form with form fields and submit button
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Car Plates section */}
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

      {/* Car Model section */}
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

      {/* Owner Phone section */}
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

      {/* Submit button */}
      <div className="flex flex-1 justify-center items-center ">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <p>Submitting...</p> : <p>Submit</p>}
        </Button>
      </div>
    </form>
  );
};

export default Form;
