import {  Trash2 } from "lucide-react";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { ImageDomain } from "../../../constant";
import { deletePremiumCollectionImagesAsync, getPremiumCollectionImagesAsync, selectSelectedPremiumCollectionImages } from "../../../store/slices/premiumCollectionList";

interface Props {
  ornamentId: string;
}

export default function ViewPremiumImage({ ornamentId }: Props) {
  const selectedPremiumCollection = useAppSelector(
    selectSelectedPremiumCollectionImages
  );
console.log(selectedPremiumCollection)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPremiumCollectionImagesAsync(ornamentId));
  }, [dispatch, ornamentId]);

  const handelDeleteImage = (image_id:string) =>{
    dispatch(deletePremiumCollectionImagesAsync(image_id)).then(() => {
      dispatch(getPremiumCollectionImagesAsync(ornamentId));
    });
  }

  return (
    <div className="container overflow-hidden mx-auto p-4">
      <table className="table-auto w-full text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {selectedPremiumCollection.map((item) => (
            <tr key={item.image_id}  className="">
              <td>{item.image_id}</td>
              <td className="flex justify-center mt-4">
                <img
                  src={ImageDomain + "/" + item.image_path}
                  style={{ width: "120px", height: "120px" }}
                />
              </td>
              <td>
                
                <button onClick={() => handelDeleteImage(item.image_id)} >
                <Trash2 className="text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
