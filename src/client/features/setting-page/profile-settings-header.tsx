import type { GetUser } from '@common/records/user.record';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';

interface ProfileSettingsHeaderProps {
  userInformation: GetUser;
}

export function ProfileSettingsHeader({ userInformation }: ProfileSettingsHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <UiTitle
          size="xl"
          className="text-2xl"
        >
          Профіль
        </UiTitle>
        <UiDescription size="sm">Керуйте своїм обліковим записом та налаштуваннями</UiDescription>
      </div>

      <div className="flex flex-col items-end gap-1 text-right">
        <UiTitle size="sm">{userInformation.name}</UiTitle>
        {userInformation.online && <UiDescription size="xs">{userInformation.email}</UiDescription>}
      </div>
    </header>
  );
}
