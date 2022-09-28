import { string } from "prop-types";

export interface Register {
  parentName: string,
  familyEmail: string,
  familyPassword: string,
  confirmPassword?: string
}