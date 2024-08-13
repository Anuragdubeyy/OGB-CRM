import { z } from 'zod';

export const addTodayGoldRateSchema = z.object({
    
    price: z .string({ required_error: 'Gold price is required'}),
    

});

export type CreateTodayGoldRateInput = z.infer<typeof addTodayGoldRateSchema>;