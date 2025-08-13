// eslint-disable-next-line
// @ts-ignore
export class InjectToken<T> {
  description: string;

  constructor(description: string) {
    this.description = description;
  }

  toJSON() {
    return this.description;
  }
}