import { setDefaultOptions } from 'date-fns/setDefaultOptions'
import { format  } from 'date-fns';
import { parseISO } from 'date-fns/fp/parseISO';
import { ru } from 'date-fns/locale';

setDefaultOptions({ locale: ru });

export const formatDate = (date?: string) => {
    if (date)
        return format(parseISO(date), 'dd MMMM yyyy, HH:mm');
};