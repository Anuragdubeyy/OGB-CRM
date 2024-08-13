import axios from 'axios';
import { API_URL } from '../../../constant';
import { UpdatePrivilegeSettleLoanInput } from '../../../routes/schema/AddPrivilegeSettleLoan';

export function getAllPrivilegeLoans() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_LOAN_PRIVILEGE,{
          headers: {
            Authorization: localStorage.getItem('ogbToken'),
            admin_id: localStorage.getItem('userId'),
    
          },
        });
  
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  export function updatePrivilegeSettleLoan({
    user_id,
    loan_id,
    settlement_amount,
  }: UpdatePrivilegeSettleLoanInput) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.UPDATE_LOAN_PRIVILEGE(user_id, loan_id, settlement_amount ),{
          headers: {
            Authorization: localStorage.getItem('ogbToken'),
            admin_id: localStorage.getItem('userId'),
    
          },
        }
        );
  
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }





