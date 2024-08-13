import { useForm } from "react-hook-form";
import { LoadingBtn } from "../../../components/common/LoadingBtn";
import { Checkbox } from "../../../components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import {
  addAdminAsync,
  selectAddAdminLoading,
} from "../../../store/slices/registerAdmin";
import { ToastContainer, toast } from "react-toastify";

interface UploadPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}
export default function AddAdmin() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAddAdminLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadPayload>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    console.log(data.phone);

    dispatch(addAdminAsync(formData));
    toast.success("Admin Add successfully")
    
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer/>
      <div
        className="border-2 p-3 "
        style={{
          fontWeight: "500",
          border: "1px solid rgba(195, 166, 109, 0.5)",
          borderRadius: "1.5rem ",
        }}
      >
        <div>
          {/* <Link to="/overThe-Customer"><img className="w-5" src="./src/assets/icon/backbutton.svg" alt="" /></Link> */}
          <h2 className="mt-2 ">Premium Collection</h2>
        </div>

        <div className="flex gap-56 mt-3 ml-3">
          <div>
            <h2>Full Name</h2>
            <input
              {...register("name", {
                valueAsNumber: false,
                required: "name is required",
              })}
              placeholder="Enter Admin Name"
              type="text"
              className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2 pl-2"
            />
            {errors?.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message?.toString()}
              </span>
            )}
            <h2>Mobile</h2>
            <input
              {...register("phone", { required: "Mobile is required" })}
              placeholder="Enter mobile Number"
              type="tel"
              className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2 pl-2"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <div>
              <h2>Email</h2>
              <input
                {...register("email", {
                  valueAsNumber: false,
                  required: "email ID is required",
                })}
                className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2 pl-2"
                type="email"
              />
              {errors?.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message?.toString()}
                </span>
              )}

              <h2>Password</h2>
              <input
                {...register("password", {
                  valueAsNumber: false,
                  required: "password required",
                })}
                placeholder="Enter Your Password"
                className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2 pl-2"
                type="password"
              />
              {errors?.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message?.toString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-3 pl-2">
          <Checkbox className="mt-1" />
          <p>Is agent and locker manager</p>
        </div>
        <div className="mt-3 pl-3">
          <LoadingBtn isLoading={loading} value="Create New Admin" />
        </div>

        {/* <button className="w-40 bg-black mt-5 text-white py-2 ml-2 rounded-md mb-5 hover:bg-black"
        type="submit">Create New Admin</button> */}
      </div>
    </form>
  );
}
