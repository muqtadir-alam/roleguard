"use client";

import { Form, Input, Button, Card, message, Select, Typography, Progress } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";

const { Title, Text } = Typography;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  // Simple password strength calculator
  const calculateStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 20;
    if (pwd.match(/[a-z]/)) strength += 20;
    if (pwd.match(/[A-Z]/)) strength += 20;
    if (pwd.match(/[0-9]/)) strength += 20;
    if (pwd.match(/[^a-zA-Z0-9]/)) strength += 20;
    return strength;
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/register", values);
      if (res.data.success) {
        message.success(res.data.message || "Registration successful");
        router.push("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const onPasswordChange = (e) => {
    const pwd = e.target.value;
    setPasswordStrength(calculateStrength(pwd));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card
        className="w-full max-w-md shadow-2xl rounded-2xl border-0 overflow-hidden"
        bodyStyle={{ padding: "2rem" }}
      >
        <div className="text-center mb-6">
          <Title level={2} className="!mb-2">
            Create Account
          </Title>
          <Text type="secondary">Join RoleGuard and start managing your tasks</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} size="large">
          {/* Full Name */}
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Enter your full name"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Email */}
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

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Create password"
              className="rounded-lg"
              onChange={onPasswordChange}
            />
          </Form.Item>

          {/* Password Strength Meter (optional) */}
          {passwordStrength > 0 && (
            <div className="mb-4 -mt-2">
              <Progress
                percent={passwordStrength}
                showInfo={false}
                strokeColor={
                  passwordStrength < 40 ? "red" : passwordStrength < 70 ? "orange" : "green"
                }
                size="small"
              />
              <Text className="text-xs text-gray-500">
                {passwordStrength < 40
                  ? "Weak"
                  : passwordStrength < 70
                  ? "Medium"
                  : "Strong"}{" "}
                password
              </Text>
            </div>
          )}

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<SafetyOutlined className="text-gray-400" />}
              placeholder="Confirm password"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Optional Role */}
          {/* <Form.Item name="role" label="Role (Optional)">
            <Select
              placeholder="Select role"
              className="rounded-lg"
              options={[
                { label: "User", value: "user" },
                { label: "Admin", value: "admin" },
              ]}
            />
          </Form.Item> */}

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="rounded-lg h-10 font-semibold shadow-sm hover:shadow-md transition-shadow"
          >
            Register
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="text-center">
            <Text type="secondary">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/")}
                className="text-blue-500 cursor-pointer font-medium hover:underline"
              >
                Login here
              </span>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}