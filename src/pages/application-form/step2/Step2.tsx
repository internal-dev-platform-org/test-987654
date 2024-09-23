import {Dispatch, SetStateAction} from 'react';
import {Button, T} from '@admiral-ds/react-ui';

import styles from './Step2.module.css';
import {InputFile} from './input-file/InputFile';

export const Step2 = ({
    submitted,
    setStep,
    setSubmitted,
}: {
    submitted: boolean;
    setStep: Dispatch<SetStateAction<number>>;
    setSubmitted: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <>
            {!submitted ? (
                <>
                    <T font="Header/H3">Прикрепите скан документа</T>
                    <InputFile />
                    <div className={styles.continue}>
                        <Button onClick={() => setSubmitted(true)}>Продолжить</Button>
                    </div>
                </>
            ) : (
                <div className={styles.submitted}>
                    <T font="Header/H3" as="div">
                        Данные успешно сохранены
                    </T>
                    <Button
                        className={styles.restart}
                        appearance="tertiary"
                        onClick={() => {
                            setStep(0);
                            setSubmitted(false);
                        }}
                    >
                        Начать сначала
                    </Button>
                </div>
            )}
        </>
    );
};
