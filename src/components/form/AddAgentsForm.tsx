import { Link } from "react-router-dom";

export default function AddAgentsForm() {
  return (
    
      <div  className="border-2 p-3 "
    style={{
      fontWeight: "500",
      border: "1px solid rgba(195, 166, 109, 0.5)",
      borderRadius: "1.5rem ",
    }}>
        <div >
          <Link to="/agent-Detail"><img className="w-5" src="./src/assets/icon/backbutton.svg" alt="" /></Link>
          <h2 className='mt-2 '>Add Agent</h2>
        </div>

        <div className='flex gap-56 mt-3 ml-3'>
            <div>
                <h2>Agent Name</h2>
                <input className='border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2' type="text" />
            
                <h2>Contact Number</h2>
                <input  className='border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2' type="text" name="" id="" />

                <h2>Address</h2>
                <textarea  className='border-2 border-[gray] rounded-xl w-96 h-36 mt-2 mb-2' name="" id="" ></textarea>

                <h2>Date of Birth</h2>
                <input  className='border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2' type="date" name="" id="" />

            </div>

            <div>
                <div className='w-100 h-40 mt-2 bg-[#EDE6D8]' style={{
      fontWeight: "500",
      border: "1px dashed rgba(195, 166, 109, 0.5)",
      borderRadius: "1.5rem ",

    }} >
      <div>
                    <img className='mt-10 ml-44 mb-5 w-12' src="./src/assets/icon/upload.svg" alt="" />
                    <span className='ml-28 '>Drag And Drop File Here</span>
                    </div>

                </div>
                <div>
                <h2>Agent Name</h2>
                <input className='border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2' type="text" />
            
                <h2>Contact Number</h2>
                <input  className='border-2 border-[gray] rounded-xl w-96 h-11 mt-2 mb-2' type="text" name="" id="" />

                
                </div>

                
                
            </div>

        </div>
        <button className="w-40 bg-black mt-5 text-white py-2 ml-2 rounded-md mb-5 hover:bg-black"
      type="submit">Add New Agent</button>

    </div>

    
  )
}
