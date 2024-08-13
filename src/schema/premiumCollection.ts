import { z } from 'zod';

export const addPremiumCollectionSchema = z.object({
    ornament_id: z .string({ required_error: 'ornament id is required'}),
    stock_count: z.string({required_error: 'stock count is required'}),
    // ornamentImage: z.instanceof(File),

});

export type CreatePremiumCollectionInput = z.infer<typeof addPremiumCollectionSchema>;

export const updatePremiumCollectionSchema = z.object({
    ornament_id: z .string({ required_error: 'ornament id is required'}),
    stock_count: z.string({required_error: 'stock count is required'}),

});

export type UpdatePremiumCollectionInput = z.infer<typeof updatePremiumCollectionSchema>;

export const uploadPremiumCollectionSchema = z.object({
    ornament_id: z .string({ required_error: 'ornament id is required'}),
    ornamentImage: z.instanceof(File),

});

export type UploadPremiumCollectionInput = z.infer<typeof uploadPremiumCollectionSchema>;
