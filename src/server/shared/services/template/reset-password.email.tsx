import { Body, Heading, Html, render, Text } from 'react-email';

export function ResetPasswordEmail({ code }: { code: string }) {
  return (
    <Html>
      <Body>
        <Heading>Відновлення паролю — FinMan</Heading>
        <Text>Ваш одноразовий код:</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{code}</Text>
        <Text>Код дійсний 5 хвилини.</Text>
      </Body>
    </Html>
  );
}

export const resetPasswordHtml = (code: string) => render(<ResetPasswordEmail code={code} />);
