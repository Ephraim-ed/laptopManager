import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "@remix-run/react";
import { createLaptop } from "../components/API";
import { useNavigate } from "react-router-dom";
import { NumberSchema } from "yup";

 
type FormData = {
  serialNumber: number;
  model: string;
  currentUser: string;
};

export default function LaptopInfo() {
  const navigate = useNavigate()
  const schema: ZodType<FormData> = z.object({
    serialNumber: z.number().gt(9999999, "Enter a valid Serial Number"),
    model: z.string().min(2).max(30),
    currentUser: z.string().min(2).regex(/\s/, "Add a Last Name"),
  });

  const { register,
    handleSubmit,
    formState: { errors },
   } = useForm<FormData>({ resolver: zodResolver(schema)
  });


  const submitData = (data: FormData) => {
    { createLaptop(data) };
    console.log(data);
    navigate('/');
    
  };


  return (
    <div>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex flex-col items-center w-screen h-screen justify-center">
          <div className="bg-form">
            <p className="flex flex-col items-center justify-center content-center">
              <input
                className="drop-shadow-md flex flex-col items-center justify-center content-center"
                type="number"
                placeholder="Serial Number"
                {...register("serialNumber", { valueAsNumber: true })}
                />
                
                {errors.serialNumber && <span className="text-orange-600 text-xs mb-5">{errors.serialNumber.message}</span>}
                
            </p>

            <p className="flex flex-col items-center justify-center content-center">
              <input
                className="drop-shadow-md"
                type="text"
                placeholder="Model"
                {...register("model")}
              />
              {errors.model && <span className="text-orange-600 text-xs mb-5">{errors.model.message}</span>}
            </p>

            <p className="flex flex-col items-center justify-center content-center">
              <input
                className="drop-shadow-md"
                type="text"
                placeholder="User"
                {...register("currentUser")}
              />
              {errors.currentUser && <span className="text-orange-600 text-xs mb-5">{errors.currentUser.message}</span>}
            </p>
            
            <input type="submit" className="btn content-center" />
            
          </div>
        </div>
      </form>
    </div>
  );
}
