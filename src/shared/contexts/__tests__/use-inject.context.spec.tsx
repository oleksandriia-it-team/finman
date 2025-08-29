import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, within } from '@testing-library/react';
import ProvideDependencies, { useInject } from '../use-inject.context';
import { InjectProvider } from '../../models/inject-provider.model';

const firstPartDependencies: InjectProvider[] = [
  {
    token: '123',
    value: '456'
  },
  {
    token: 'Dmytro',
    value: 'Reshetylo'
  },
  {
    token: 'Ukraine',
    value: 'Kyiv'
  }
];

const secondPartDependencies: InjectProvider[] = [
  {
    token: 'Kirovohrad oblast',
    value: 'Oleksandriia'
  },
];

const thirdPartDependencies: InjectProvider[] = [
  {
    token: 'Europe',
    value: 'Earth'
  },
];

describe('useInject', () => {

  afterEach(() => {
    cleanup();
  });

  it('should provide 3 dependencies', () => {
    function UnitTestComponent() {
      const dependency: string = useInject('Dmytro', true) as string;

      return (
        <span>{ dependency }</span>
      );
    }

    const renderResult = render(
      <ProvideDependencies providers={ firstPartDependencies }>
        <UnitTestComponent/>
      </ProvideDependencies>
    );

    expect(renderResult.getByText('Reshetylo')).toBeTruthy();
  });

  it('should get error to inject unknown token', () => {
    function UnitTestComponent() {
      const dependency: string = useInject('335798ERERTT4', true) as string;

      return (
        <span>{ dependency }</span>
      );
    }

    try {
      render(
        <ProvideDependencies providers={ firstPartDependencies }>
          <UnitTestComponent/>
        </ProvideDependencies>
      );
    } catch ( err: unknown ) {
      expect((err as Error).message).toBe('Provider with token "335798ERERTT4" is not found');
    }
  });

  it('shouldn\' get error to inject unknown token as optional', () => {
    function UnitTestComponent() {
      const dependency: string | null = useInject('335798ERERTT4', false) as string | null;

      return (
        <span>{ dependency ?? 'Not found' }</span>
      );
    }

    const renderResult = render(
      <ProvideDependencies providers={ firstPartDependencies }>
        <UnitTestComponent/>
      </ProvideDependencies>
    );

    expect(renderResult.getByText('Not found')).toBeTruthy();
  });

  it('should get error when don\'t provide any dependencies', () => {
    try {
      function UnitTestComponent() {
        const dependency: string = useInject('Dmytro', true) as string;

        return (
          <span>{ dependency }</span>
        );
      }

      render(
        <ProvideDependencies providers={ [] }>
          <UnitTestComponent/>
        </ProvideDependencies>
      );


    } catch ( err: unknown ) {
      expect((err as Error).message).toBe('You must provide something to use InjectProvider');
    }
  });

  it('should inject children and parent dependencies', () => {
    function UnitTestParentComponent() {
      const dependency: string = useInject('Dmytro', true) as string;

      return <div>
        <span>{ dependency }</span>
        <ProvideDependencies providers={ secondPartDependencies }>
          <UnitTestChildrenComponent/>
        </ProvideDependencies>
      </div>;
    }

    function UnitTestChildrenComponent() {
      const dependencyFromParent: string = useInject('Ukraine', true) as string;
      const dependencyFromChildren: string = useInject('Kirovohrad oblast', true) as string;

      return <div>
        <span>{ dependencyFromParent }</span>
        <span>{ dependencyFromChildren }</span>
      </div>;
    }

    const result = render(
      <ProvideDependencies providers={ firstPartDependencies }>
        <UnitTestParentComponent/>
      </ProvideDependencies>
    );

    expect(result.getByText('Reshetylo')).toBeTruthy();
    expect(result.getByText('Kyiv')).toBeTruthy();
    expect(result.getByText('Oleksandriia')).toBeTruthy();
  });

  it('should render injected and fallback values in correct containers', () => {
    function UnitTestParentComponent() {

      return <div>
        <div className="firstChild">
          <ProvideDependencies providers={ secondPartDependencies }>
            <UnitTestChildrenComponent/>
          </ProvideDependencies>
        </div>

        <div className="secondChild">
          <ProvideDependencies providers={ thirdPartDependencies }>
            <UnitTestChildrenComponent/>
          </ProvideDependencies>
        </div>

      </div>;
    }

    function UnitTestChildrenComponent() {
      const dependencyFromParent: string = useInject('Ukraine', true) as string;
      const dependencyFromChildren1: string | null = useInject('Kirovohrad oblast', false) as string | null;
      const dependencyFromChildren2: string | null = useInject('Europe', false) as string | null;

      return <div>
        <span>{ dependencyFromParent }</span>
        <span>{ dependencyFromChildren1 ?? 'Not Found token Kirovohrad oblast' }</span>
        <span>{ dependencyFromChildren2 ?? 'Not Found token Europe' }</span>
      </div>;
    }

    const result = render(
      <ProvideDependencies providers={ firstPartDependencies }>
        <UnitTestParentComponent/>
      </ProvideDependencies>
    );

    const firstChild = result.container.querySelector('.firstChild') as HTMLElement;
    const secondChild = result.container.querySelector('.secondChild') as HTMLElement;

    expect(within(firstChild).getByText('Kyiv')).toBeTruthy();
    expect(within(secondChild).getByText('Kyiv')).toBeTruthy();
    expect(within(firstChild).getByText('Oleksandriia')).toBeTruthy();
    expect(within(secondChild).getByText('Earth')).toBeTruthy();
    expect(within(firstChild).getByText('Not Found token Europe')).toBeTruthy();
    expect(within(secondChild).getByText('Not Found token Kirovohrad oblast')).toBeTruthy();
  });


});