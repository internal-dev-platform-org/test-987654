import { FC } from "react";
import { createEffect, createStore, sample } from "effector";
import { createGate, useGate, useUnit } from "effector-react";

import styles from './App.module.css';

const loadFormData = createGate();
const loadFormDataFx = createEffect()
const $formDataLoaded = createStore(false);

$formDataLoaded.on(loadFormDataFx.doneData, () => true)

loadFormDataFx.use(async () => {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2500)
  });
  await promise;
});

sample({
  source: loadFormData.open,
  target: loadFormDataFx
});

const Loading = () => (
  <div className={styles.loading}>Загружается...</div>
);

const Form = () =>  (
  <form className={styles.form}>
    <input type='text' placeholder='Введите значение' />
    <input type="submit" onClick={(e) => e.preventDefault()} />
  </form>
  );

export const App: FC = () => {
  useGate(loadFormData);
  const formDataLoaded = useUnit($formDataLoaded);
  
  return formDataLoaded ? <Form /> : <Loading />;
}