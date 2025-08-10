'use client';

import './styles/load-theme.component.scss';

import { ReduxStore } from '../../models/store.model';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';

/**
 * LoadThemeComponent dynamically switches the application theme between light and dark modes
 * using PrimeReact's `changeTheme` function and Redux state.
 *
 * It listens to the Redux `mode` value (`light` or `dark`) and updates the theme accordingly
 * by injecting a `<link>` tag and triggering PrimeReact's theme change.
 *
 * @component
 *
 * @param {ChildrenComponentProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the themed layout.
 *
 * @example
 * <LoadThemeComponent>
 *   <App />
 * </LoadThemeComponent>
 */
export default function LoadThemeComponent({ children }: ChildrenComponentProps) {
  const { changeTheme } = useContext(PrimeReactContext);

  const linkStyleRef = useRef<HTMLLinkElement | null>(null);

  const [ linkStyleLoading, setLinkStyleLoading ] = useState<boolean>(true);
  const [ linkStyleError, setLinkStyleError ] = useState<boolean>(false);

  const mode: 'light' | 'dark' = useSelector(({ mode }: ReduxStore) => mode);

  const theme = useMemo(() => mode === 'light' ? 'lara-light-blue' : 'lara-dark-blue', [ mode ]);

  useEffect(() => {
    const newTheme = mode === 'light' ? 'lara-light-blue' : 'lara-dark-blue';
    const oldTheme = mode === 'light' ? 'lara-dark-blue' : 'lara-light-blue';

    setLinkStyleLoading(true);
    setLinkStyleError(false);

    try {
      changeTheme?.(oldTheme, newTheme, 'theme', () => {
        setLinkStyleLoading(false);
      });
    } catch {
      setLinkStyleLoading(false);
      setLinkStyleError(true);
    }

  }, [ changeTheme, mode ]);

  return (
    <>
      <link id="theme" rel="stylesheet" href={ `/themes/${ theme }/theme.css` } ref={ linkStyleRef }/>

      {
        linkStyleLoading || linkStyleError
          ? (
            <div
              className={ `w-screen h-screen flex justify-center items-center ${ mode === 'light' ? 'bg-white' : 'bg-black' }` }>
              { linkStyleLoading && (
                <div className="load-theme-spinner"></div>
              ) }

              { linkStyleError && (
                <span className="text-sm text-red-500">Load theme error! Please try later</span>
              ) }
            </div>
          ) : (
            <div className={ `${ mode }-theme` }>
              { children }
            </div>
          )
      }
    </>
  );


}
