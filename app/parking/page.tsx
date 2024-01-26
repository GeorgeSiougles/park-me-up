import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex-1 mt-4 p-4 border-4 rounded-lg border-slate-500 ">
        <div className="flex-row p-2 max-w-md">
          <div className="flex flex-1 items-center justify-between mr-4">
            <Label> Car plates</Label>
            <Input maxLength={8} placeholder="ABC 1234" className="my-2" />
          </div>
          <div className="flex flex-1 items-center justify-between mr-4">
            <Label> Car Model</Label>
            <Input placeholder="Opel Meriva" maxLength={30} className="my-2" />
          </div>
          <div className="flex flex-1 items-center justify-between m-r-4">
            <Label> Owner Phone</Label>
            <Input
              type="string"
              maxLength={10}
              placeholder="6987654321"
              className="my-2"
            />
          </div>
          <div className="flex flex-1 justify-center items-center ">
            <Button>Register</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
