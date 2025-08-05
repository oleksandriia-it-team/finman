export class InjectToken<T> {
  description: string;

  toJSON() {
    return this.description;
  }

  constructor(description: string) {
    this.description = description;
  }
}