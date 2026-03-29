"use client";

import { Form, Input, Button, Card, message, Checkbox, Space, Typography } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "../services/api";

const { Title, Text } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  // Load remembered email from localStorage on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      form.setFieldsValue({ email: rememberedEmail });
    }
  }, [form]);

  type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean
}; 
  const onFinish = async (values : LoginFormValues) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", values);
      if (res.data.success) {
        const { token, user } = res.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Handle "Remember me"
        if (values.remember) {
          localStorage.setItem("rememberedEmail", values.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        message.success(res.data.message || "Login successful");
        router.push("/dashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card
        className="w-full max-w-md shadow-2xl rounded-2xl border-0 overflow-hidden"
        bodyStyle={{ padding: "2rem" }}
      >
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2">
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          className="space-y-4"
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="you@example.com"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {/* <a href="/forgot-password" className="text-blue-500 hover:text-blue-700">
              Forgot password?
            </a> */}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="rounded-lg h-10 font-semibold shadow-sm hover:shadow-md transition-shadow"
          >
            Sign In
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button
            block
            icon={<GoogleOutlined />}
            className="rounded-lg flex items-center justify-center"
            onClick={() => message.info("Social login coming soon")}
          >
            Google
          </Button>
        </Form>

        <div className="mt-6 text-center">
          <Text type="secondary">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 font-medium hover:underline">
              Register now
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
}