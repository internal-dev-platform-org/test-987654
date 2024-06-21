import {FC} from 'react';

import styles from './App.module.css';
import {useGetPosts} from './hooks/use-get-posts';

export const App: FC = () => {
    const {isPending, error, data: post, isFetching, refetch} = useGetPosts();

    if (isPending) return <div className={styles.loading}>Загружается...</div>;
    if (isFetching) return <div className={styles.loading}>Обновляется...</div>;
    if (error) return <div className={styles.loading}>Возникла ошибка: {error.message}</div>;

    return (
        <>
            <button className={styles.refresh} onClick={() => refetch()}>
                Обновить
            </button>
            <div className={styles.post}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>
        </>
    );
};
