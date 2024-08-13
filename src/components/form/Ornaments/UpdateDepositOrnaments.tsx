import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import {
//     UpdateDepositOrnamentsInput,
//     updateDepositOrnamentsSchema,
// } from "../../routes/schema/DepositOrnaments";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import {
    DepositOrnaments,
    selectDepositOrnamentsLoading,
    updateDepositOrnamentsAsync,
} from "../../../store/slices/depositOrnaments";
import { LoadingBtn } from "../../common/LoadingBtn";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { UpdateDepositOrnamentsInput, updateDepositOrnamentsSchema } from "../../../schema/DepositOrnaments";

interface IProps {
  depositOrnaments: DepositOrnaments;
}
export default function UpdateDepositOrnamentsForm({
  depositOrnaments,
}: IProps) {
  const loading = useAppSelector(selectDepositOrnamentsLoading);

  const { ornament_id, image } = depositOrnaments;

  console.log(image)

  const dispatch = useAppDispatch();
  const form = useForm<UpdateDepositOrnamentsInput>({
    resolver: zodResolver(updateDepositOrnamentsSchema),
    defaultValues: {
      ornament_id: ornament_id.toString(),
      ornamentImage: new File([], ""),
    },
  });

  console.log(form.formState.errors)

  const onSubmit = async (data: UpdateDepositOrnamentsInput) => {
      const formData = new FormData();

      formData.append("ornament_id", data.ornament_id.toString());
      formData.append("image", data.ornamentImage);

      dispatch(updateDepositOrnamentsAsync(formData))

   
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="ornamentImage"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : [])
                  }
                  accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingBtn isLoading={loading} value="Save" />
      </form>
    </Form>
  );
}
