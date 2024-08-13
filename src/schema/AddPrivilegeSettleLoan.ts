import { z } from 'zod';

export const addPrivilegeSettleLoanSchema = z.object({
    user_id: z .string({ required_error: 'ornament id is required'}),
    loan_id: z .string({ required_error: 'ornament id is required'}),
    settlement_amount: z .string({ required_error: 'Settlement amount  is required'}),
    

});

export type CreatePrivilegeSettleLoanInput = z.infer<typeof addPrivilegeSettleLoanSchema>;

export const updatePrivilegeSettleLoanSchema = z.object({
    user_id: z .string({ required_error: 'ornament id is required'}),
    loan_id: z .string({ required_error: 'ornament id is required'}),
    settlement_amount: z .string({ required_error: 'Settlement amount  is required'}),
});

export type UpdatePrivilegeSettleLoanInput = z.infer<typeof updatePrivilegeSettleLoanSchema>;
