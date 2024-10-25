import { z } from 'zod';
import { role } from '../user/user.constant';

const signupValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
    role: z.enum([...role] as [string, ...string[]]).optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  }),
});

export const AuthValidationSchema = {
  signupValidationSchema,
  loginSchema,
};