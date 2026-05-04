import {
  ProfileSettingsSchema,
  type ProfileSettingsData,
  type ProfileSettingsFormData,
} from '@common/domains/profile/schema/profile-settings.schema';
import { SupportLanguages } from '@common/enums/support-languages.enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSettingsService } from '@frontend/features/setting-page/profile-settings.service';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

export function useProfileSettingsForm() {
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

  useEffect(() => {
    if (!userInformation) {
      return;
    }

    methods.reset({
      name: userInformation.name,
      locale: userInformation.locale,
      language: userInformation.language,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }, [methods, userInformation]);

  const updateMutation = useSendDataFetch(
    async (data: ProfileSettingsData) => {
      if (!userInformation) {
        throw new Error('User not found');
      }

      const updatedUser = await profileSettingsService.updateProfile(userInformation, data);

      if (!updatedUser.online) {
        setUserInformation(updatedUser);
      }

      return updatedUser;
    },
    {
      onSuccess: async () => {
        await refresh();
        methods.reset({
          ...methods.getValues(),
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        showToast({ title: 'Успішно', description: 'Профіль оновлено', variant: 'default' });
      },
    },
  );

  return {
    methods,
    submit: methods.handleSubmit((data) => updateMutation.mutate(data)),
    updateMutation,
  };
}
