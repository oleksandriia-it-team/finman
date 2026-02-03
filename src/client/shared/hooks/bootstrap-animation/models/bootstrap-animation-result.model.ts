export interface BootstrapAnimationResult<T extends Array<unknown>> {
  shouldRender: boolean;
  showElement: boolean;
  animatedData: T;
}
