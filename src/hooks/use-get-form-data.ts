import {useQuery} from '@tanstack/react-query';

import {getFormData} from '../api/get-form-data';

export const useGetFormData = () =>
    useQuery({
        queryKey: ['formData'],
        queryFn: getFormData,
    });
