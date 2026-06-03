'use client';
import { UiSidebarProvider } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { UiSidebarHeader } from '@frontend/ui/ui-sidebar/ui-sidebar-header';
import { UiSidebarHeaderTitle } from '@frontend/ui/ui-sidebar/ui-sidebar-header-title';
import { UiSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar';
import { UiSidebarTrigger } from '@frontend/ui/ui-sidebar/ui-sidebar-trigger';
import { UiSidebarHeaderIcon } from '@frontend/ui/ui-sidebar/ui-sidebar-header-icon';
import { UiSidebarSeparator } from '@frontend/ui/ui-sidebar/ui-sidebar-separator';
import { LogoSvg } from '@frontend/shared/svg/logo-svg';
import { ProfileSidebarContent } from './profile-sidebar-content';
import { useTranslations } from 'next-intl';

export function ProfileSidebar() {
  const t = useTranslations('common');

  return (
    <UiSidebarProvider>
      <UiSidebar
        collapsible="icon"
        colorVariant="white"
        sheetTitle={t('controlPanel')}
        sheetDescription={t('mobileOnly')}
      >
        <UiSidebarHeader>
          <div className="flex gap-1 flex-1 items-center">
            <UiSidebarHeaderIcon className="size-9 group-data-[collapsible=icon]:w-full">
              <LogoSvg
                width={28}
                height={28}
              />
            </UiSidebarHeaderIcon>

            <UiSidebarHeaderTitle>Finman</UiSidebarHeaderTitle>
          </div>

          <UiSidebarTrigger
            hideOnCollapse
            srLabel={t('toggleSidebar')}
          />
        </UiSidebarHeader>

        <UiSidebarSeparator />

        <ProfileSidebarContent />
      </UiSidebar>
    </UiSidebarProvider>
  );
}
