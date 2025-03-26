
const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-auto">
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AdminLayout;
