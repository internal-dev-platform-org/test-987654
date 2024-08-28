import {FC} from 'react';
import {Button, T} from '@admiral-ds/react-ui';

import styles from './App.module.css';
import {useGetPosts} from './hooks/use-get-posts';

export const App: FC = () => {
    const {isPending, error, data: post, isFetching, refetch} = useGetPosts();

    if (isPending)
        return (
            <div className={styles.loading}>
                <T font="Main/XS">Загружается...</T>
            </div>
        );
    if (isFetching)
        return (
            <div className={styles.loading}>
                <T font="Main/XS">Обновляется...</T>
            </div>
        );
    if (error)
        return (
            <div className={styles.loading}>
                <T font="Main/XS">Возникла ошибка: {error.message}</T>
            </div>
        );

    return (
        <>
            <Button dimension="m" className={styles.refresh} onClick={() => refetch()}>
                Обновить
            </Button>
            <div className={styles.post}>
                <T font="Main/M">{post.title}</T>
                <T font="Main/XS">{post.body}</T>
            </div>
        </>
    );
};
