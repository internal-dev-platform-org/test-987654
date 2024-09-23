import {Step, StepContent, Stepper as StepperUiKit} from '@admiral-ds/react-ui';

export const Stepper = ({step, submitted}: {step: number; submitted: boolean}) => {
    return (
        <StepperUiKit activeStep={step}>
            <Step key={0} completed={step === 1 ? true : false}>
                <StepContent>Шаг 1. Заполнение анкеты</StepContent>
            </Step>
            <Step key={1} completed={submitted ? true : false}>
                <StepContent>Шаг 2. Прикрепление документов</StepContent>
            </Step>
        </StepperUiKit>
    );
};
