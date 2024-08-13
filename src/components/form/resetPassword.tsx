// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';import { useEffect } from "react";
// import { useEffect } from "react";
// import {  getCasesByAgentAsync, selectAgentCases } from "../../store/slices/cases";
import {
    useAppDispatch,
} from "../../store/Hooks";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateResetAdminPassword, addResetAdminPassword } from "../../schema/resetPassword";
import { resetAdminPasswordAsync } from "../../store/slices/adminResetPassword";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
settleLoan: any;
}

export const AdminResetPassword = ({ setIsDialogOpen, settleLoan }: Props) => {
console.log(settleLoan);
const dispatch = useAppDispatch();


const form = useForm<CreateResetAdminPassword>({
  resolver: zodResolver(addResetAdminPassword),
  defaultValues: {
    admin_id: settleLoan.admin_id.toString() || "",
    password: "",
  },
});

const onSubmit = async (data: CreateResetAdminPassword) => {
  console.log(data);

  dispatch(resetAdminPasswordAsync(data)).then(() => {
    // setIsDialogOpen(false);
    setIsDialogOpen(false);
    form.reset();
    
  });
};

console.log(form.formState.errors);

return (
  <Form {...form}>
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stock Count</FormLabel>
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

      <div className="flex items-center gap-5">
        <Button
          className="bg-primary text-white"
          // disabled={!form.formState.isValid}
          type="submit"
        >
          Save
        </Button>
        <Button
          className="bg-secondary-foreground text-white"
          disabled={!form.formState.isValid}
          onClick={() =>
            form.reset({
              password: "",
            })
          }
          type="button"
        >
          Clear
        </Button>
      </div>
    </form>
  </Form>
);
};
