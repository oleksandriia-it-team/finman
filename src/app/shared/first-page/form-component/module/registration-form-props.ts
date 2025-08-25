'use client';

import { UserInformation } from '../../../../../data-access/auth-service/models/user-infomation.model';

export type RegistrationFormProps = {
  onSuccessAction: (data: UserInformation | null) => void
};