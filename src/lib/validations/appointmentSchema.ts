import { z } from "zod";

const MX_PHONE_REGEX = /^(\+?52)?[\s\-.]?\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}$/;

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "Nombre demasiado largo"),
  phone: z
    .string()
    .regex(MX_PHONE_REGEX, "Ingresa un número de teléfono válido (10 dígitos)"),
  email: z
    .string()
    .email("Ingresa un correo electrónico válido"),
  service: z
    .string()
    .min(1, "Selecciona la especialidad o servicio"),
  doctor: z.string().optional(),
  preferredDate: z
    .string()
    .min(1, "Selecciona una fecha preferida"),
  preferredShift: z.enum(["morning", "afternoon"], {
    required_error: "Selecciona un turno",
  }),
  reason: z
    .string()
    .max(500, "El motivo no puede superar 500 caracteres")
    .optional(),
  isFirstTime: z.boolean().default(false),
  acceptsPrivacy: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debes aceptar el aviso de privacidad para continuar",
    }),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export const SHIFT_LABELS: Record<"morning" | "afternoon", string> = {
  morning: "Mañana (8:00–13:00)",
  afternoon: "Tarde (14:00–20:00)",
};
