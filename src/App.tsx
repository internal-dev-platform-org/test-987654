import {FC} from 'react';
import {Spinner, T} from '@admiral-ds/react-ui';

import styles from './App.module.css';
import {useGetFormData} from './hooks/use-get-form-data';
import {ApplicationForm} from './pages/application-form/ApplicationForm';

export const App: FC = () => {
    const {isPending} = useGetFormData();

    if (isPending)
        return (
            <div className={styles.loader}>
                <T font="Body/Body 1 Long" as="div">
                    Загрузка демо приложения
                </T>
                <Spinner dimension="l" />
            </div>
        );

    return <ApplicationForm />;
};
