import { FieldValues } from "react-hook-form";

export interface Login extends FieldValues {
  familyPassword: string,
  familyEmail: string
}