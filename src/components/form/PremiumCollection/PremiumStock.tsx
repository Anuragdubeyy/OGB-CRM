import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    CreatePremiumCollectionInput,
    addPremiumCollectionSchema,
} from "../../../schema/premiumCollection";
import {
    useAppDispatch,
} from "../../../store/Hooks";
import {
    getPremiumCollectionListAsync,
    updatePremiumCollectionsAsync,
} from "../../../store/slices/premiumCollectionList";
import { Button } from "../../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

interface Props {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ornament: any;
}

export const ViewPremiumStock = ({ setIsDialogOpen, ornament }: Props) => {
  console.log(ornament);
  const dispatch = useAppDispatch();

  // const agentCases = useAppSelector(selectAgentCases)
  // const { ornament_id, stock_count } = premiumCollection;

  const form = useForm<CreatePremiumCollectionInput>({
    resolver: zodResolver(addPremiumCollectionSchema),
    defaultValues: {
      ornament_id: ornament.ornament_id.toString() || "",
      stock_count: "",
    },
  });

  const onSubmit = async (data: CreatePremiumCollectionInput) => {
    console.log(data);

    dispatch(updatePremiumCollectionsAsync(data)).then(() => {
      // setIsDialogOpen(false);
      setIsDialogOpen(false);
      form.reset();
      const closeModalButton = document.getElementById("close-modal");
      if (closeModalButton) {
        closeModalButton.click();
      }
      dispatch(getPremiumCollectionListAsync());

      toast.success("Stock added successfully!");

    });
  };

  console.log(form.formState.errors);

  return (
    <>
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="stock_count"
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
                stock_count: "",
              })
            }
            type="button"
          >
            Clear
          </Button>
        </div>
      </form>
    </Form>
    </>
  );
};
