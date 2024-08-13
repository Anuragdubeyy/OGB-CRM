import { z } from 'zod';

export const updateDepositOrnamentsSchema = z.object({
    ornament_id: z .string({ required_error: 'ornament id is required'}),
    ornamentImage: z.instanceof(File),
});

export type UpdateDepositOrnamentsInput = z.infer<typeof updateDepositOrnamentsSchema>;
