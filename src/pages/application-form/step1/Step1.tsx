import {Dispatch, SetStateAction} from 'react';
import {Button, DateInput, FieldSet, RadioButton, T, TextInput} from '@admiral-ds/react-ui';

import styles from './Step1.module.css';

export const Step1 = ({setStep}: {setStep: Dispatch<SetStateAction<number>>}) => {
    return (
        <>
            <T font="Header/H3">Заполните онлайн-заявку</T>
            <TextInput placeholder="ФИО" />
            <DateInput placeholder="Дата рождения" />
            <FieldSet flexDirection="row" className={styles.gender}>
                <RadioButton value="Мужчина" name="gender">
                    Мужчина
                </RadioButton>
                <RadioButton value="Женщина" name="gender">
                    Женщина
                </RadioButton>
            </FieldSet>
            <TextInput placeholder="Серия и номер паспорта" />
            <div className={styles.passport}>
                <DateInput placeholder="Дата выдачи" />
                <TextInput placeholder="Код подразделения" />
            </div>
            <TextInput placeholder="Кем выдан" />
            <TextInput placeholder="Адрес регистрации" />
            <div className={styles.continue}>
                <Button onClick={() => setStep(1)}>Продолжить</Button>
            </div>
        </>
    );
};
