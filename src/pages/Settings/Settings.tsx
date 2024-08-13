import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import {
  getAdminInfoAsync,
  selectAllAdminInfoList,
} from "../../store/slices/adminInfo";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { AdminResetPassword } from "../../components/form/resetPassword";

const AdminId = () => localStorage.getItem("userId") || "";
// console.log(AdminId());

export default function Settings() {
  const dispatch = useAppDispatch();
  const AdminInfo = useAppSelector(selectAllAdminInfoList);
  // console.log(AdminInfo);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    const admin_id = AdminId();
    dispatch(getAdminInfoAsync(admin_id));
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div
      className="border-2 p-4 w-[65%] ml-36 mt-10 "
      style={{
        fontWeight: "500",
        border: "1px solid rgba(195, 166, 109, 0.5)",
        borderRadius: "0.8rem ",
      }}
    >
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <img className="rounded-[50%] w-14" src={AdminInfo?.image} alt="" />
          <div>
            <h2 className="font-bold"> {AdminInfo?.name} </h2>
            <p>{AdminInfo.role}</p>
          </div>
        </div>
        <Dialog open={isDialogOpen}>
          <DialogTrigger>
          <span className="pr-12 pt-3 underline">Reset Password</span>

          </DialogTrigger>
          <DialogContent className="max-h-[50%] max-w-[50%] ">
            <AlertDialogHeader>
              <DialogTitle>Reset Your Password</DialogTitle>
            </AlertDialogHeader>
            <AdminResetPassword settleLoan={AdminId} setIsDialogOpen={setIsDialogOpen}/>
            {/* <AddSettleLoan
              settleLoan={row.original}
              setIsDialogOpen={setIsDialogOpen}
            /> */}
          </DialogContent>
        </Dialog>
        {/* <span className="pr-12 pt-3 underline">Reset Password</span> */}
      </div>
      <div className="mt-10  ">
        <ul className="flex  flex-col gap-3">
          <li className="flex text-[#00000099] gap-2">
            Name <p className="text-black">-{AdminInfo.name}</p>
          </li>
          <li className="flex  text-[#00000099] gap-2">
            Email <p className="text-black">- {AdminInfo?.email}</p>
          </li>
          <li className="flex  text-[#00000099] gap-2">
            Password <p className="text-black">- *******</p>
          </li>
          <li className="flex  text-[#00000099] gap-2">
            Mobile <p className="text-black">- {AdminInfo?.mobile}</p>
          </li>
          <li className="flex  text-[#00000099] gap-2">
            Address{" "}
            <p className="text-black">
              - Room no. 405 floor no-4,98 street,Boston ground. New York City
            </p>
          </li>
        </ul>
      </div>

      <div className="flex gap-2 justify-end pt-6 pb-4 ">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="text-sm ml-3 mb-4 justify-start inline-flex items-start gap-2"
              variant="ghost"
            >
              <LogOut /> Log Out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Are you sure want to logout?</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/90"
                onClick={handleLogout}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
