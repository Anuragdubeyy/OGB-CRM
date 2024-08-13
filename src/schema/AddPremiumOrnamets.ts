import { z } from 'zod';

export const addPremiumOrnamentsSchema = z.object({
    ornament_id: z .string({ required_error: 'ornament id is required'}),
    ornamentName: z .string({ required_error: 'ornament id is required'}),
    ornamentDescription: z .string({ required_error: 'ornament id is required'}),
    ornamentCategory: z .string({ required_error: 'ornament id is required'}),
    category: z .string({ required_error: 'ornament id is required'}),
    width: z .string({ required_error: 'ornament id is required'}),
    height: z .string({ required_error: 'ornament id is required'}),
    carat: z .string({ required_error: 'ornament id is required'}),
    goldWeight: z .string({ required_error: 'ornament id is required'}),
    otherStones: z .string({ required_error: 'ornament id is required'}),
    otherMetals: z .string({ required_error: 'ornament id is required'}),
    otherCharges: z .string({ required_error: 'ornament id is required'}),
    totalWeight: z .string({ required_error: 'ornament id is required'}),
    stock_count: z.string({required_error: 'stock count is required'}),
    ornamentImage: z.instanceof(File),

});

export type CreatePremiumOrnamentsInput = z.infer<typeof addPremiumOrnamentsSchema>;
