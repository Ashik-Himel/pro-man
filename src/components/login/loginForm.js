'use client';
import { userStore } from '@/store/useStore';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, ConfigProvider, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { email, password } = userStore(state => state?.user);
  
  const onFinish = values => {
    if (values?.email == email && values?.password == password) {
      toast.success("Login Successful!");
      router.replace('/dashboard');
    }
    else toast.error("Invalid login credentials!");
  }

  return (
    <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
      <Form
        name="login"
        className="space-y-3 flex-1"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <FormItem>
          <h2 className='text-2xl font-medium text-primary text-center uppercase'>Login</h2>
        </FormItem>

        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            type='email'
            placeholder="Email"
          />
        </FormItem>

        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </FormItem>

        <FormItem>
          <FormItem name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </FormItem>
          <Link href='' className='text-primary font-medium'>Forgot Password?</Link>
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          <span className='italic underline font-medium text-sm text-primary cursor-pointer select-none ml-4' onClick={() => setIsModalOpen(true)}>Login credentials</span>
          <p className='mt-3'>New to ProMan? <Link href='' className='text-primary font-medium'>Register Now!</Link></p>
        </FormItem>
      </Form>

      <Modal title="Login Credentials" centered open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <p><span className='font-medium'>Email:</span> admin@pro-man.vercel.app</p>
        <p><span className='font-medium'>Password:</span> Admin@1234</p>
      </Modal>
    </ConfigProvider>
  );
}
