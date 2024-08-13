// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';import { useEffect } from "react";
import { useEffect } from "react";
// import {  getCasesByAgentAsync, selectAgentCases } from "../../store/slices/cases";
import { useAppDispatch,
  //  useAppSelector 
  } from "../../../store/Hooks";
import { Button } from "../../ui/button";

interface Props {
  agentId: string;
}

export const UploadPremiumVideo = ({ agentId }: Props) => {
  const dispatch = useAppDispatch();

  // const agentCases = useAppSelector(selectAgentCases)


  useEffect(() => {
    // dispatch(getCasesByAgentAsync(agentId));
  },[dispatch, agentId]);

  // console.log(agentCases)

  return (
    <div className="container mx-auto p-4">

      <table className="flex flex-col ">
        <tr>
          <th>category</th>
          <th>Product ID</th>
        </tr>
      </table>

    
      <div>
                    <img className='mt-10 ml-44 mb-5 w-12' src="./src/assets/icon/upload.svg" alt="" />
                    <span className='ml-28 '>Drag And Drop File Here</span>
      </div>

      <div>
        <Button>Close</Button>
        <Button>Add</Button>
      </div>
      

  {/* {agentCases.map((agentCase, index) => (
    <div className="bg-white p-6 rounded-md shadow-md mb-4" key={index}>
      <h1 className="text-xl font-semibold mb-2">
        Customer Name: {agentCase.customer.first_name} {agentCase.customer.last_name}
      </h1>
      <p className="text-gray-600 mb-2">Email Id: {agentCase.customer.email}</p>
      <p className="text-gray-600">Phone No: {agentCase.customer.phoneNumber}</p>
    </div>
  ))} */}
</div>
  );
};
