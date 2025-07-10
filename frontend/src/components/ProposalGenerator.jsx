import { useState } from "react";

export default function ProposalGenerator() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    vehicleCount: 1,
    dashcamType: "Regular Dashcam",
    features: {
      incidentDetection: true,
      cloudStorage: true,
    },
    installationLocation: "",
    onlineOption: false,
    additionalDomeCamera: false,
    platformSubscription: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('features.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [key]: type === 'checkbox' ? checked : prev.features[key],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const calculateTotalPrice = () => {
    const prices = {
      "Hero-ME40-02": 675,
      "Hero-ME41-02": 85,
      "DMS Camera": 100,
      "256GB SD Card": 22,
      "Installation": 12,
      "10GB Data SIM Card": 11,
      "Additional Dome Camera": 55,
      "Eagle IoT Platform Subscription": 55,
    };
    let total = 0;
    const baseModel = formData.dashcamType === "AI-Powered Dashcam" ? "Hero-ME41-02" : "Hero-ME40-02";
    total += formData.vehicleCount * prices[baseModel];
    total += formData.vehicleCount * prices["256GB SD Card"];
    total += formData.vehicleCount * prices["Installation"];
    if (formData.dashcamType === "AI-Powered Dashcam") {
      total += formData.vehicleCount * prices["DMS Camera"];
    }
    if (formData.additionalDomeCamera) {
      total += formData.vehicleCount * prices["Additional Dome Camera"];
    }
    if (formData.onlineOption) {
      total += formData.vehicleCount * prices["10GB Data SIM Card"];
    }
    if (formData.platformSubscription) {
      total += formData.vehicleCount * prices["Eagle IoT Platform Subscription"];
    }
    return total.toFixed(2);
  };

  return (
    <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-b-xl shadow-2xl border border-blue-200">
      <section className="md:col-span-1 bg-white p-6 rounded-lg shadow-inner border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Client Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Vehicles</label>
            <input
              type="number"
              name="vehicleCount"
              min="1"
              value={formData.vehicleCount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dashcam Type</label>
            <select
              name="dashcamType"
              value={formData.dashcamType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option>Regular Dashcam</option>
              <option>AI-Powered Dashcam</option>
            </select>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Features</h3>
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                name="features.incidentDetection"
                checked={formData.features.incidentDetection}
                onChange={handleChange}
                className="rounded text-blue-600"
              />
              <span>Incident Detection</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="features.cloudStorage"
                checked={formData.features.cloudStorage}
                onChange={handleChange}
                className="rounded text-blue-600"
              />
              <span>Cloud Storage</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Online Access</label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="onlineOption"
                checked={formData.onlineOption}
                onChange={handleChange}
                className="rounded text-blue-600"
              />
              <span>Add 10GB Data SIM Card</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Installation Location</label>
            <input
              type="text"
              name="installationLocation"
              value={formData.installationLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Dome Camera</label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="additionalDomeCamera"
                checked={formData.additionalDomeCamera}
                onChange={handleChange}
                className="rounded text-blue-600"
              />
              <span>Add Dome Camera</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform Subscription</label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="platformSubscription"
                checked={formData.platformSubscription}
                onChange={handleChange}
                className="rounded text-blue-600"
              />
              <span>Include Eagle IoT Platform Subscription</span>
            </label>
          </div>
          <button type="button" className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Generate Proposal Content (AI)
          </button>
        </form>
      </section>

      <section className="md:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Generated Proposal Preview</h2>
        <pre className="whitespace-pre-wrap leading-relaxed text-gray-700">
          {JSON.stringify(formData, null, 2)}
        </pre>
        <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800">Pricing Details</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-50">
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
              <th className="border border-gray-200 px-4 py-3 text-right text-sm font-semibold text-gray-700">Quantity</th>
              <th className="border border-gray-200 px-4 py-3 text-right text-sm font-semibold text-gray-700">Unit Price</th>
              <th className="border border-gray-200 px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2 text-left">Hero-ME40-02</td>
              <td className="border border-gray-200 px-4 py-2 text-right">{formData.vehicleCount}</td>
              <td className="border border-gray-200 px-4 py-2 text-right">SAR675.00</td>
              <td className="border border-gray-200 px-4 py-2 text-right">SAR{(formData.vehicleCount * 675).toFixed(2)}</td>
            </tr>
            <tr className="bg-blue-100 font-bold">
              <td className="border border-gray-200 px-4 py-2">Total Estimated Price</td>
              <td colSpan="3" className="border border-gray-200 px-4 py-2 text-right">SAR{calculateTotalPrice()}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}