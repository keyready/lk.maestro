import classes from './Sidebar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    return <VStack className={classNames(classes.Sidebar, {}, [className])}>sidebar</VStack>;
};
