"use client";

import Form from "@/components/Form/Form";

const Page = () => {
  return (
    <main>
      <div className="flex flex-col items-center ">
        <div className="flex-1 mt-4 p-4 border-4 rounded-lg border-slate-500">
          <Form />
        </div>
      </div>
    </main>
  );
};
export default Page;
