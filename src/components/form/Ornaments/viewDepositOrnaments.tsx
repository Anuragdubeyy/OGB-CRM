import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { ImageDomain } from "../../../constant";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import {
  getDepositOrnamentImagesAsync,
  selectSelectedDepositOrnamentImages,
} from "../../../store/slices/depositOrnaments";

interface Props {
  ornamentId: string;
}

export default function ViewDepositOrnamentImage({ ornamentId }: Props) {
  const selectedDepositOrnament = useAppSelector(
    selectSelectedDepositOrnamentImages
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDepositOrnamentImagesAsync(ornamentId));
  }, [dispatch, ornamentId]);

  return (
    <div className="container overflow-hidden mx-auto p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center  ">
          {selectedDepositOrnament.map((item) => (
            <tr key={item.image_id} >
              <td>{item.image_id}</td>
              <td className="flex justify-center">
                <img 
                  src={ImageDomain + "/" + item.image_path}
                  style={{ width: "120px", height: "120px" }}
                />
              </td>
              <td>
                <button>
                  <Trash2 className="text-red-700"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
