import { ParkedCarFormProps } from "@/app/types/ParkedCar";
import { Input } from "../ui/input";

const FormField: React.FC<ParkedCarFormProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  ...props
}) => {
  return (
    <>
      <div className="flex flex-col justify-center align-center relative">
        <Input
          {...props}
          type={type}
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
        {error && <span className="text-xs text-red-500">{error.message}</span>}
      </div>
    </>
  );
};
export default FormField;
