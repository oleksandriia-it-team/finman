import {
  type ProfileSettingsData,
  type ProfileSettingsFormData,
  ProfileSettingsSchema,
} from '@common/domains/profile/schema/profile-settings.schema';
import { SupportLanguages } from '@common/enums/support-languages.enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSettingsService } from '@frontend/features/user-settings/profile-settings.service';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';

export function useProfileSettingsForm() {
  const t = useTranslations('userSettings');
  const tCommon = useTranslations('common');
  const { userInformation, setUserInformation, refresh } = useUserInformation(
    useShallow((state) => ({
      userInformation: state.userInformation,
      setUserInformation: state.setUserInformation,
      refresh: state.refresh,
    })),
  );
  const { showToast } = useGlobalToast();

  const methods = useForm<ProfileSettingsFormData, unknown, ProfileSettingsData>({
    resolver: zodResolver(ProfileSettingsSchema),
    defaultValues: {
      name: userInformation?.name ?? '',
      locale: userInformation?.locale ?? 'uk-UA',
      language: userInformation?.language ?? SupportLanguages.Ukrainian,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (!userInformation) {
      return;
    }

    reset({
      name: userInformation.name,
      locale: userInformation.locale,
      language: userInformation.language,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }, [reset, userInformation]);

  const updateMutation = useSendDataFetch(
    async (data: ProfileSettingsData) => {
      if (!userInformation) {
        throw new Error('User not found.');
      }

      const updatedUser = await profileSettingsService.updateProfile(userInformation, data);

      if (!updatedUser.online) {
        setUserInformation(updatedUser);
      }

      return updatedUser;
    },
    {
      onSuccess: async () => {
        try {
          await refresh();
        } catch (error) {
          // Log error but don't block success flow
          console.error('Failed to refresh user information:', error);
        } finally {
          reset({
            ...methods.getValues(),
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          showToast({ title: tCommon('successTitle'), description: t('profileUpdated'), variant: 'default' });
        }
      },
    },
  );

  return {
    methods,
    submit: methods.handleSubmit((data) => updateMutation.mutate(data)),
    updateMutation,
    isDirty: methods.formState.isDirty,
  };
}
