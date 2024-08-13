
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/Hooks';
import { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addOtcOrnamentsAsync, selectCustomerOtcAddOrnamentsLoading } from '../../../store/slices/customerOtcAddOrnaments';
import { LoadingBtn } from '../../../components/common/LoadingBtn';
import { selectCheckUserId } from '../../../store/slices/userCheck';
import { getAllPremiumCollectionCategoryAsync, selectSelectedPremiumCollectionCategory } from '../../../store/slices/premiumCollectionList';
// import { Button } from '../../../components/ui/button'
interface UploadPayload {
  userid:string;
  ornament_name: string;
  // ornament_category: string;
  ornament_description: string;
  category: string;
  width: string;
  height: string;
  carat: string;
  gold_weight: string;
  total_price: string;
  image: File | null;
  other_stones: string;
  other_metals: string;
  other_charges: string;
  total_weight: string;
  locker_number: string;
}
export default function Deposit() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCustomerOtcAddOrnamentsLoading);
  const checkUserId = useAppSelector(selectCheckUserId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UploadPayload>({
    defaultValues: {
      ornament_name: "",
      // ornament_category: "",
      
      ornament_description: "",
      category: "",
      locker_number: "",
      gold_weight: "",
      carat: "",
      width: "",
      height: "",
      other_stones: "",
      other_metals: "",
      other_charges: "",
      total_weight: "",
      image: null,
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>{
    const files = e.target.files;

    if (files && files.length > 0){
      setValue("image", files[0]);
    }
  }
  const onSubmit = async (data: any) => {
    console.log(data);

    const formData = new FormData();

    formData.append("ornament_name", data.ornament_name);
    // formData.append("ornament_category", data.ornament_category);
    formData.append("ornament_description", data.ornament_description)
    formData.append("category", data.category);
    formData.append("userid", checkUserId );
    formData.append("width", data.width);
    formData.append("height", data.height);
    formData.append("carat", data.carat);
    formData.append("gold_weight", data.gold_weight);
    formData.append("other_stones", data.other_stones);
    formData.append("other_metals", data.other_metals);
    formData.append("other_charges",data.other_charges);
    formData.append("total_Weight", data.total_weight);
    formData.append("locker_number", data.locker_number);
    formData.append("image", data.image);


    dispatch(addOtcOrnamentsAsync(formData))
  };
  const categories = useAppSelector(selectSelectedPremiumCollectionCategory);
  console.log(categories);
  useEffect(() => {
    dispatch(getAllPremiumCollectionCategoryAsync());
  }, [dispatch]);
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div
        className="border-2 p-3"
        style={{
          fontWeight: "500",
          border: "1px solid rgba(195, 166, 109, 0.5)",
          borderRadius: "1.5rem",
        }}
      >
        <div>
          <Link to="/Over-The-Customer_home">
            <img
              className="w-5"
              src="./src/assets/icon/backbutton.svg"
              alt=""
            />
          </Link>
          <h2 className="mt-2">Premium Collection</h2>
        </div>

        <div className="flex gap-56 mt-3 ml-3">
          <div>
            <h2>Ornament Name</h2>
            <input
              {...register("ornament_name", {
                valueAsNumber: false,
                required: "Ornament name is required",
              })}
              placeholder="Enter Ornament name"
              className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2 pl-2"
              type="text"
            />
            {errors?.ornament_name && (
              <span className="text-red-500 text-sm">
                {errors.ornament_name.message?.toString()}
              </span>
            )}
            <h2>Ornament Category</h2>
          <select
              className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2 pl-2"
            {...register('category', {
              required: 'Product category is required',
            })}>
            <option disabled selected>
              Choose a Category
            </option>
            {categories?.map((category, index) => (
  <option key={index} value={String(category)}>
    {String(category)}
  </option>
))}
          </select>
            {errors?.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message?.toString()}
              </span>
            )}
            <h2>Ornament Description</h2>
            <textarea
              {...register("ornament_description", {
                valueAsNumber: false,
                required: "Ornament Description is required",
              })}
              className="border-2 border-[gray] rounded-xl w-96 h-36 mt-2 mb-2 pl-2"
            ></textarea>
            {errors?.ornament_description && (
              <span className="text-red-500 text-sm">
                {errors.ornament_description.message?.toString()}
              </span>
            )}
            <h2>Locker Number</h2>
            <input
              {...register("locker_number", {
                valueAsNumber: true,
                required: "Stock Count is required",
              })}
              className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2 pl-2"
              type="text"
            />
            {errors?.locker_number && (
              <span className="text-red-500 text-sm">
                {errors.locker_number.message?.toString()}
              </span>
            )}
          </div>
          <div>
            <div
              className="w-100 h-40 mt-2 bg-[#EDE6D8]"
              style={{
                fontWeight: "500",
                border: "1px dashed rgba(195, 166, 109, 0.5)",
                borderRadius: "1.5rem",
              }}
            >
              <div onClick={() => document.getElementById("file")?.click()} >
                <img
                  className="mt-10 ml-44 mb-5 w-12   relative"
                  src="./src/assets/icon/upload.svg"
                  alt=""
                />
                <span className="ml-28 " >Upload Your Image Here </span>

                {/* {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Brand Logo Preview"
                    className="max-h-32 mb-2 "
                  />
                ) : (
                  <>
                    <Upload size={50} strokeWidth={"2 px"} />
                    Upload logo
                  </>
                )} */}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="ml-2"
                  style={{display:"none"}}
                  id="file"
                />
              </div>
            </div>
            <div className="flex gap-24 mt-5 ">
              <div>
                <h2>Gold Weight(gm)</h2>
                <input
                  {...register("gold_weight", {
                    valueAsNumber: true,
                    required: "Gold Weight is required",
                  })}
                  className="border-2 border-[gray] rounded-xl w-40 h-11 mt-2 mb-2 pl-2"
                  type="text"
                />
                {errors?.gold_weight && (
                  <span className="text-red-500 text-sm">
                    {errors.gold_weight.message?.toString()}
                  </span>
                )}
              </div>
              <div>
                <h2>Caret</h2>
                <input
                  {...register("carat", {
                    valueAsNumber: true,
                    required: "Carat is required",
                  })}
                  className="border-2 border-[gray] rounded-xl w-40 h-11 mt-2 mb-2 pl-2"
                />
                {errors?.carat && (
                  <span className="text-red-500 text-sm">
                    {errors.carat.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-24">
              <div>
                <h2>Height(mm)</h2>
                <input
                  {...register("height", {
                    valueAsNumber: true,
                    required: "Height(mm) is required",
                  })}
                  className="border-2 border-[gray] rounded-xl w-40 h-11 mt-2 mb-2 pl-2"
                  type="text"
                />
                {errors?.height && (
                  <span className="text-red-500 text-sm">
                    {errors.height.message?.toString()}
                  </span>
                )}
              </div>
              <div>
                <h2>Width(mm)</h2>
                <input
                  {...register("width", {
                    valueAsNumber: true,
                    required: "Width(mm) is required",
                  })}
                  className="border-2 border-[gray] rounded-xl w-40 h-11 mt-2 mb-2 pl-2"
                  type="text"
                />
                {errors?.width && (
                  <span className="text-red-500 text-sm">
                    {errors.width.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            {/* <div>
              <h2>Other Category</h2>
              <input
                name="other_category"
                onChange={handleInput}
                value={formState.other_category}
                className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2"
                type="text"
              />
            </div> */}
          </div>
        </div>

        <div
          className="w-100 mt-3 p-3"
          style={{
            fontWeight: "500",
            border: "1px solid rgba(195, 166, 109, 0.5)",
            borderRadius: "1.5rem",
          }}
        >
          <div className="flex justify-between ">
            <h2>Other Details</h2>
          </div>
          <div className="flex gap-56 mt-2">
            <div>
              <h2>Other Stone</h2>
              <input
                {...register("other_stones", {
                  valueAsNumber: false,
                  required: "Other Stone is required",
                })}
                className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-4 pl-2"
                type="text"
              />
              {errors?.other_stones && (
                <span className="text-red-500 text-sm">
                  {errors.other_stones.message?.toString()}
                </span>
              )}
              <h2>Other Metals</h2>
              <input
                {...register("other_metals", {
                  valueAsNumber: false,
                  required: "Other Metal is required",
                })}
                className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2 pl-2"
              />
              {errors?.other_metals && (
                <span className="text-red-500 text-sm">
                  {errors.other_metals.message?.toString()}
                </span>
              )}
            </div>
            <div>
              <h2>Other Charges</h2>
              <input
                {...register("other_charges", {
                  valueAsNumber: true,
                  required: "Other Charges is required",
                })}
                className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-4 pl-2"
              />
              {errors?.other_charges && (
                <span className="text-red-500 text-sm">
                  {errors.other_charges.message?.toString()}
                </span>
              )}
              <h2>Total Weight(gm)</h2>
              <input
                {...register("total_weight", {
                  valueAsNumber: true,
                  required: "Total Weight is required",
                })}
                className="border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-4 pl-2"
                type="number"
              />
              {errors?.total_weight && (
                <span className="text-red-500 text-sm">
                  {errors.total_weight.message?.toString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='mt-3 pl-2'>

        <LoadingBtn isLoading={loading} value="Submit" />
        </div>

        {/* <button className="w-28 bg-black mt-5 text-white py-2 ml-2 rounded-md mb-5 hover:bg-black" value="submit" type="submit">
          submit
        </button> */}
      </div>
    </form>
  );
}
