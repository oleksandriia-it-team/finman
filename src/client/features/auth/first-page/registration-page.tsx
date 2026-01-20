'use client';

import './styles/first-page.scss';

//Page-component that meets user when launch app.
// Realised as stepper component which shows reg form in first app-launch

export default function RegistrationPage() {
  // const stepperRef = useRef<Stepper | null>(null);
  //
  // const { methods, submit } = useSetupRegistration(() => {
  //   stepperRef.current?.nextCallback();
  // });
  //
  // return (
  //   <div className="flex items-center h-full ">
  //     <Stepper className={ 'my-stepper ' } ref={ stepperRef }>
  //       <StepperPanel header="Page I">
  //         <FormProvider { ...methods }>
  //           <div className=" content flex items-center justify-center ">
  //             <div className=" flex-auto flex justify-center align-items-center font-medium">
  //               <RegistrationFormComponent/></div>
  //             <PageButton onClick={ submit }/>
  //           </div>
  //         </FormProvider>
  //       </StepperPanel>
  //       <StepperPanel header="Page 2">
  //         <div className="Content flex items-center justify-center ">
  //           <div className=" flex-auto flex justify-center align-items-center font-medium">
  //             <SecondPage/>
  //           </div>
  //           <PageButton className="scale-x-[-1]" onClick={ () => stepperRef.current?.prevCallback() }/>
  //         </div>
  //       </StepperPanel>
  //     </Stepper>
  //   </div>
  // );
}
