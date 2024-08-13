import { z } from 'zod';

export const addResetAdminPassword = z.object({
    password: z.string({ required_error: 'password is required'}),
    admin_id: z.string({ required_error: 'admin is required'})
});

export type CreateResetAdminPassword = z.infer<typeof addResetAdminPassword >;
