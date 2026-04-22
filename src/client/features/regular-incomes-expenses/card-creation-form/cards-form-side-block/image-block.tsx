import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';

export function ImageBlock() {
  return (
    <div className="relative size-full text-primary-foreground">
      <UiGraphic
        src="/pictures/card-form-image.jpg"
        size="100%"
        objectFit="cover"
      />
      <div className="absolute bottom-0 w-full h-20 bg-muted bg-muted/50 backdrop-blur-[2px]">
        <div className=" pl-3 size-full flex flex-col justify-center">
          <h3>
            <b>Плануйте фінанси розумно</b>
          </h3>
          <p>Регулярні платежі допомагають контролювати бюджет</p>
        </div>
      </div>
    </div>
  );
}
