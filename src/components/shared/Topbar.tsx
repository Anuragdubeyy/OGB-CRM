import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    CreateTodayGoldRateInput,
    addTodayGoldRateSchema,
} from "../../schema/AddTodatGold";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import {
    getAdminInfoAsync,
    selectAllAdminInfoList,
} from "../../store/slices/adminInfo";
import { selectPremiumCollectionLoading } from "../../store/slices/premiumCollectionList";
import {
    getTodayGoldRateListAsync,
    selectAllTodayGoldRateList,
    updateTodayGoldRateListAsync,
} from "../../store/slices/todayGoldRate";
import { getAllNotificationListAsync, selectAllNotificationList } from "../../store/slices/topbarNotification";
import { LoadingBtn } from "../common/LoadingBtn";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
const AdminId = () => localStorage.getItem("userId") || "";

export default function TopBar({ sideButton, setSideButton }: any) {
  const dispatch = useAppDispatch();
  const AdminInfo = useAppSelector(selectAllAdminInfoList);
  const [greeting, setGreeting] = useState("");
  const loading = useAppSelector(selectPremiumCollectionLoading);
  
  const todayGoldrate = useAppSelector(selectAllTodayGoldRateList);
  console.log(todayGoldrate);

  const form = useForm<CreateTodayGoldRateInput>({
    resolver: zodResolver(addTodayGoldRateSchema),
    defaultValues: {
      price: "",
    },
  });

  const onSubmit = async (data: CreateTodayGoldRateInput) => {
    console.log(data)
    const { price } = data;
    const priceString = price.toString();

    try {
      await dispatch(updateTodayGoldRateListAsync(priceString));
      form.reset();
    } catch (error) {
      toast.success("Gold Rate added successfully!");
      console.error("An error occurred:", error);
    }
  };
  console.log(form.formState.errors);

  useEffect(() => {
    const admin_id = AdminId();
    dispatch(getAdminInfoAsync(admin_id));
    dispatch(getTodayGoldRateListAsync());

    const getTimeAndSetGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good afternoon");
      } else if (hour >= 18 && hour < 22) {
        setGreeting("Good evening");
      } else {
        setGreeting("Good night");
      }
    };

    getTimeAndSetGreeting();

    const interval = setInterval(() => {
      getTimeAndSetGreeting();
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  //  notification
  const notification = useAppSelector(selectAllNotificationList);

  useEffect(()=> {
dispatch(getAllNotificationListAsync())
  }, [dispatch])
  return (
    <>
      <header
        className={`${
          sideButton ? " pl-56 " : ""
        }  fixed top-0 bg-white z-40 w-full`}
      >
        <nav className="flex px-5 py-6 justify-between gap-4">
          <div className="col-span-4 col-span-xl-8 mb-4 ml-2 mb-xl-0">
            <div className="flex gap-2">
              {!sideButton ? (
                <button onClick={() => setSideButton(true)}>
                  <img
                    className="w-6"
                    src="./src/assets/icon/option.svg"
                    alt=""
                  />
                </button>
              ) : (
                ""
              )}
              <span className="text-gray-500 text-2xl">{greeting}</span>
              <h3 className="font-bold text-2xl">, {AdminInfo?.name}</h3>
            </div>
            <h6 className="font-normal text-gray-500 text-lg mb-0">
              Your performance summary
            </h6>
          </div>
          <div className="col-span-2 col-span-xl-4 text-right float-left flex items-center">
            <div className="text-center hidden md:block float-left ">
              <p className="text-center statistics-title text-black font-semibold">
                Today 10 Gram Rate
              </p>
              <button
                type="button"
                className="ml-4 mt-1 flex gap-2 p-1 pl-2 pr-2 border-2 border-gray-100 rounded"
              >
                <span id="rate" className="text-black font-bold">
                  ₹ {todayGoldrate}
                </span>
                <Popover>
                  <PopoverTrigger>
                    <img src="./src/assets/icon/pencil.svg" alt="" />
                  </PopoverTrigger>
                  <PopoverContent className="p-1 rounded-lg">
                    <div className="border-2 rounded-lg border-[#C3A66D] p-5">
                      <Form {...form}>
                        <form
                          className="space-y-4"
                          onSubmit={form.handleSubmit(onSubmit)}
                        >
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gold Rate</FormLabel>
                                <FormControl defaultValue={field.value}>
                                  <Input
                                    className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...field}
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="mt-3 pl-2">
                            <LoadingBtn isLoading={loading} value="Submit" />
                          </div>
                        </form>
                      </Form>
                    </div>
                  </PopoverContent>
                </Popover>
              </button>
            </div>
            <div className="ml-9 w-6 mr-11">
              <Popover>
                <PopoverTrigger>
                  <span className="ml-9 w-6 mr-11">
                    <img src="./src/assets/icon/bell.svg" alt="" />{" "}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-96 bg-white mr-10">
                  <div>
                    <div className="flex justify-between  ">
                      {" "}
                      <h2 className="font-bold">Notification</h2>{" "}
                      <p>Mark all as read</p>{" "}
                    </div>
                    <span className="w-full underline-offset-0"></span>
                  </div>
                  {notification.map((notification, index) => (
                    <div className="flex justify-between pt-4" key={index}>
                    <div className="flex ">
                      <img
                        className="w-11 h-11 mt-2 mr-6 overflow-hidden cursor-pointer rounded-[50%]"
                        src="..\src\assets\faces\face4.jpg"
                        alt="profile"
                      />
                      <div>
                        <h2>{notification.name}</h2>
                        <p>{notification.message}</p>
                      </div>
                    </div>

                    <span>6 min ago</span>
                  </div>
                  ))}
                  
                  
                  <div className="mt-2 text-center underline">
                    <h2>view all notification</h2>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <a href="#" className=""></a>
            <div>
              <Popover>
                <PopoverTrigger>
                  <span>
                    <img
                      className="w-14 h-14 mt-2 mr-6 overflow-hidden cursor-pointer rounded-[50%]"
                      src={AdminInfo?.image}
                      alt="profile"
                    />
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-40 mr-5">
                  <div className="">
                    <img
                      className="w-16 ml-8 h-16 overflow-hidden cursor-pointer rounded-[50%]"
                      src={AdminInfo?.image}
                      alt="profile"
                    />
                    <h2 className="pt-2  pl-10  text-[#C3A66D]">Admin</h2>
                    <div className="flex gap-2 justify-end pt-3 mr-2 cursor-pointer ">
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
                          <AlertDialogTitle>
                            Are you sure want to logout?
                          </AlertDialogTitle>
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
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
