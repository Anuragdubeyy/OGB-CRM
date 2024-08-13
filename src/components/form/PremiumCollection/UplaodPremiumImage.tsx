// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';import { useEffect } from "react";
import {
    useAppDispatch,
    useAppSelector
} from "../../../store/Hooks";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
// import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { UploadPremiumCollectionInput, uploadPremiumCollectionSchema } from "../../../schema/premiumCollection";
import { PremiumCollection, selectPremiumCollectionLoading, uploadPremiumImageAsync } from "../../../store/slices/premiumCollectionList";
import { LoadingBtn } from "../../common/LoadingBtn";

interface IProps {
  premiumCollections: PremiumCollection;
}

export const UploadPremiumImage = ({ premiumCollections }: IProps) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectPremiumCollectionLoading);

  const { ornament_id, image_paths} = premiumCollections;

  console.log(image_paths)

  // const agentCases = useAppSelector(selectAgentCases)
  const form = useForm<UploadPremiumCollectionInput>({
    resolver: zodResolver(uploadPremiumCollectionSchema),
    defaultValues: {
      ornament_id: ornament_id.toString() || '',
      ornamentImage: new File([], ""),
    },
  });

  console.log(form.formState.errors)

  const onSubmit = async (data: UploadPremiumCollectionInput) => {
    const formData = new FormData();

    formData.append("ornament_id", data.ornament_id.toString());
    formData.append("image", data.ornamentImage);

    dispatch(uploadPremiumImageAsync(formData)).then(() =>{
      form.reset();
      const closeModalButton = document.getElementById("close-modal");
      if (closeModalButton) {
        closeModalButton.click();
      }
    })
    

};

  return (
    <div className="container mx-auto p-4">

      <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="ornamentImage"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel></FormLabel>
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

        <div className="flex items-center gap-5">
        <LoadingBtn isLoading={loading} value="Save" />
          
        </div>
      </form>
    </Form>

    
      {/* <div>
                    <img className='mt-10 ml-44 mb-5 w-12' src="./src/assets/icon/upload.svg" alt="" />
                    <span className='ml-28 '>Drag And Drop File Here</span>
      </div> */}

      

  
</div>
  );
};
