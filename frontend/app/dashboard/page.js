"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  List,
  message,
  Typography,
  Avatar,
  Modal,
  Skeleton,
  Space,
  Tag,
  Empty,
  Statistic,
} from "antd";
import {
  LogoutOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import API from "../../services/api";

const { Text, Title } = Typography;

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // ✏️ Edit state
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // 🗑️ Delete confirmation
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out");
    router.push("/");
  };

  // 📥 Fetch Tasks
  const fetchTasks = async () => {
    setFetchLoading(true);
    try {
      const res = await API.get("/tasks");
      if (res.data.success) {
        setTasks(res.data.data);
        setMeta(res.data.meta || {});
      } else {
        message.error(res.data.message);
      }
    } catch {
      message.error("Unauthorized");
      router.push("/");
    } finally {
      setFetchLoading(false);
    }
  };

  // ➕ Add Task
  const addTask = async () => {
    if (!title.trim()) return message.warning("Please enter a task title");
    setLoading(true);
    try {
      const res = await API.post("/tasks", { title: title.trim() });
      if (res.data.success) {
        message.success(res.data.message);
        setTitle("");
        fetchTasks();
      } else {
        message.error(res.data.message);
      }
    } catch {
      message.error("Error adding task");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete Task
  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setDeleteModalVisible(true);
  };

  const deleteTask = async () => {
    if (!taskToDelete) return;
    try {
      const res = await API.delete(`/tasks/${taskToDelete._id}`);
      if (res.data.success) {
        message.success(res.data.message);
        fetchTasks();
      } else {
        message.error(res.data.message);
      }
    } catch {
      message.error("Delete failed");
    } finally {
      setDeleteModalVisible(false);
      setTaskToDelete(null);
    }
  };

  // ✏️ Start Edit
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditValue(task.title);
  };

  // ❌ Cancel Edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  // 💾 Save Edit
  const saveEdit = async (id) => {
    if (!editValue.trim()) return message.warning("Task cannot be empty");
    try {
      const res = await API.put(`/tasks/${id}`, { title: editValue.trim() });
      if (res.data.success) {
        message.success(res.data.message);
        setEditingId(null);
        setEditValue("");
        fetchTasks();
      } else {
        message.error(res.data.message);
      }
    } catch {
      message.error("Update failed");
    }
  };

  // 🔍 Filter tasks by search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔐 Auth Check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      fetchTasks();
    }
  }, []);

  // 👤 Mock user (replace with actual from token if needed)
  const userName = "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar size="large" className="bg-indigo-500">
              {userName[0].toUpperCase()}
            </Avatar>
            <div>
              <Title level={4} className="!mb-0">
                Welcome back, {userName}!
              </Title>
              <Text type="secondary">Stay organized and productive</Text>
            </div>
          </div>
          <Button
            type="text"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="hover:bg-red-50"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
          {/* Stats */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <Statistic
              title="Total Tasks"
              value={meta.total || tasks.length}
              valueStyle={{ color: "#3b82f6", fontWeight: 600 }}
            />
          </div>

          {/* Search & Add Task */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input
              placeholder="Search tasks..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 rounded-lg"
              allowClear
            />
            <Input
              placeholder="New task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onPressEnter={addTask}
              className="flex-1 rounded-lg"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addTask}
              loading={loading}
              className="rounded-lg shadow-sm"
            >
              Add
            </Button>
          </div>

          {/* Task List */}
          {fetchLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton.Input key={i} active block size="large" />
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            <Empty
              description={
                searchTerm
                  ? `No tasks match "${searchTerm}"`
                  : "No tasks yet. Add your first task!"
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <List
              dataSource={filteredTasks}
              renderItem={(item) => (
                <List.Item
                  className="!p-4 hover:bg-gray-50 transition-colors rounded-lg"
                  actions={
                    editingId === item._id
                      ? [
                          <Button
                            key="save"
                            type="primary"
                            size="small"
                            icon={<CheckOutlined />}
                            onClick={() => saveEdit(item._id)}
                            className="rounded-full"
                          />,
                          <Button
                            key="cancel"
                            size="small"
                            icon={<CloseOutlined />}
                            onClick={cancelEdit}
                            className="rounded-full"
                          />,
                        ]
                      : [
                          <Button
                            key="edit"
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => startEdit(item)}
                            className="text-blue-500 hover:text-blue-700"
                          />,
                          <Button
                            key="delete"
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => confirmDelete(item)}
                            className="hover:text-red-700"
                          />,
                        ]
                  }
                >
                  {editingId === item._id ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onPressEnter={() => saveEdit(item._id)}
                      autoFocus
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Tag color="blue" className="rounded-full">
                        Task
                      </Tag>
                      <Text className="text-base">{item.title}</Text>
                    </div>
                  )}
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Task"
        open={deleteModalVisible}
        onOk={deleteTask}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        centered
      >
        <p>Are you sure you want to delete this task?</p>
        <Text strong>{taskToDelete?.title}</Text>
      </Modal>
    </div>
  );
}