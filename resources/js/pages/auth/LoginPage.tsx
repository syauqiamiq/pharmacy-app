import { BasicButton } from '@/lib/components/atoms/button';
import { FormInput, PasswordInput } from '@/lib/components/atoms/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { router, usePage } from '@inertiajs/react';
import { Divider, message, Space } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from './constants/formSchema';
import { useEffect } from 'react';

const defaultValues = {
    email: '',
    password: '',
};

const LoginPage = () => {

    const props = usePage().props;
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(formSchema),
        mode: 'onSubmit',
    });
    

    const { handleSubmit } = methods;

    const onSubmit = (data: any) => {
        router.post('/login', {
            email: data.email,
            password: data.password,
        });
    };
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (props.errors && props.errors.message ) {
        messageApi.open({
            type: 'error',
            content: props.errors.message,
            duration: 2
        });
    }
  }, [props.errors]);


    return (
       <>
        {contextHolder}
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <div className="w-100 rounded-2xl border border-gray-300 bg-white p-6 shadow-lg">
                <h2 className="text-4xl font-medium">Pharmacy App</h2>
                <Divider className="my-4" orientation="center" type="horizontal" size="large" variant="solid" />
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Space direction="vertical" size="large" className="w-full">
                            <FormInput size='large' name="email" title="email" label="Email" className="mb-10" />
                            <PasswordInput size='large' name="password" title="password" label="Password" className="mb-3" />
                            <div className="flex w-full justify-center">
                                <BasicButton title="Sign In" size="middle" variant="contained" type="submit" />
                            </div>
                        </Space>
                    </form>
                </FormProvider>
            </div>
        </div></>
    );
};

export default LoginPage;
