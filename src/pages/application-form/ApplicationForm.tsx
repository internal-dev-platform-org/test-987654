import {useState} from 'react';

import styles from './ApplicationForm.module.css';
import {Stepper} from './stepper/Stepper';
import {Step1} from './step1/Step1';
import {Step2} from './step2/Step2';

export const ApplicationForm = () => {
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Stepper step={step} submitted={submitted} />
            <div className={styles.form}>
                {step === 0 && <Step1 setStep={setStep} />}
                {step === 1 && <Step2 setStep={setStep} setSubmitted={setSubmitted} submitted={submitted} />}
            </div>
        </div>
    );
};
