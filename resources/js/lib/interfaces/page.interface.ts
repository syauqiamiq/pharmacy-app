import { IAuthProps } from './auth.interface';

export interface IPageProps {
    auth: IAuthProps;
    [key: string]: any;
}
