import { useRouter } from 'next/navigation';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useAuthorizedUser } from '@frontend/entities/auth/authorized-user.hook';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { profileApiClient } from '@frontend/shared/services/user-information/profile.api.client';
import { databaseLocalService } from '@frontend/database/database.local.service';
import { useTranslations } from 'next-intl';

export function useDeleteAccount() {
  const router = useRouter();
  const user = useAuthorizedUser();
  const logOut = useUserInformation((state) => state.logOut);
  const t = useTranslations('userSettings.actions.deleteAccountConfirm');

  return useSendDataFetch(
    async () => {
      if (user.online) {
        await profileApiClient.deleteAccount();
      } else {
        await databaseLocalService.clearDatabase();
      }
    },
    {
      successMessage: t('successMessage'),
      onSuccess: () => {
        logOut();
        router.push('/login');
      },
    },
  );
}
