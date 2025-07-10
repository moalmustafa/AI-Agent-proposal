export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col items-center justify-center font-inter">
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 w-full max-w-4xl border border-blue-200 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Dashboard Overview</h1>
        <p className="text-gray-700 mb-8">
          Welcome to the Eagle IoT Proposal Generator dashboard.
        </p>
      </div>
    </div>
  );
}