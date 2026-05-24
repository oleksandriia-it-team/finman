import { toDataURL } from 'qrcode';

export const qrcodeApiManager = {
  generateQRCodeImage: async (text: string): Promise<string> => {
    return await toDataURL(text);
  },
};
