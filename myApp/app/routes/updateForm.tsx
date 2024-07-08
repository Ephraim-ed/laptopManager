import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "@remix-run/react";
import { updateLaptop } from "../components/API";
import { useNavigate } from "react-router-dom";

 
type FormData = {
  id: string;
  currentUser: string;
};

export default function LaptopInfo(id: number) {
  const navigate = useNavigate()
  const schema: ZodType<FormData> = z.object({
    currentUser: z.string().min(2).regex(/\s/, "Add a Last Name"),
    id: z.string()
  });

  const { register,
    handleSubmit,
    formState: { errors },
   } = useForm<FormData>({ resolver: zodResolver(schema)
  });


  const submitData = (data: FormData) => {
    { updateLaptop(id, data) };
    console.log(id)
    navigate('/');
  };


  return (
    <div>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex flex-col items-center w-screen h-screen justify-center">
          <div className="bg-form">
            
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