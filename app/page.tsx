'use client'

import { useState, useEffect, useCallback, useMemo } from "react";
import AlertDialog from "@/components/AlertDialog";
import SuccessDialog from "@/components/SuccessDialog";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function Example() {
  // State variables
  const [price, setPrice] = useState("");
  const [selected, setSelected] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState(0.5);
  const [activity, setActivity] = useState("");
  const [todoList, setTodoList] = useState<
    { activity: string; price: string; selected: string; isChecked: boolean; value: number }[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Memoized dropdown options (prevents unnecessary recalculations)
  const options = useMemo(() => [
    "Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"
  ], []);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedList = localStorage.getItem("todoList");
    if (savedList) setTodoList(JSON.parse(savedList));
  }, []);

  // Save tasks to localStorage whenever the todoList changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Handle price input with validation (allows only numbers with up to 2 decimal places)
  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) setPrice(value);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!activity || !price || !selected) {
      setAlertMessage("Please fill in all required fields.");
      setOpenAlert(true);
      return;
    }

    const newItem = { activity, price, selected, isChecked, value };
    setTodoList(prev => [...prev, newItem]);

    // Reset form fields
    setActivity("");
    setPrice("");
    setSelected("");
    setIsChecked(false);
    setValue(0.5);

    // Show success dialog
    setOpenSuccess(true);
  };

  // Delete task (optimized using `useCallback`)
  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updatedList = todoList.filter((_, i) => i !== deleteIndex);
      setTodoList(updatedList);
      setConfirmOpen(false);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-10 lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          {/* Header Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold text-gray-900">To Do List Form</h2>
            <h5 className="text-gray-600">Total Tasks: {todoList.length}</h5>

            {/* Form Fields */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Activity Field */}
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium text-gray-900">*Activity:</label>
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="Create a static page"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Price Field */}
              <div className="col-span-full w-50">
                <label className="block text-sm font-medium text-gray-900">*Price (RM):</label>
                <input
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="Enter price"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Type Selection */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-900">*Type:</label>
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-50 mt-1 p-2 border rounded-md"
                >
                  <option value="" disabled>Select an option</option>
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Booking Required Checkbox */}
              <div className="flex gap-3 col-span-full">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(prev => !prev)}
                  className="h-5 w-5 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-900">Booking Required</span>
              </div>

              {/* Accessibility Slider */}
              <div className="w-64">
                <label className="block text-sm font-medium text-gray-700">Accessibility</label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={value}
                  onChange={(e) => setValue(parseFloat(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-300 rounded-lg cursor-pointer"
                />
                <div className="mt-1 text-sm text-gray-600">Value: {value.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 cursor-pointer"
          >
            Add
          </button>

        </div>
      </form>

      {/* Alert Dialog for Validation */}
      <AlertDialog open={openAlert} onClose={() => setOpenAlert(false)} title="Validation Error" message={alertMessage} />

      {/* Success Dialog */}
      <SuccessDialog open={openSuccess} onClose={() => setOpenSuccess(false)} title="Success!" message="Task has been added successfully." />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />

      {/* Task List Display */}
      {todoList.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900">Task List</h3>
          <ul className="mt-4 space-y-2">
            {todoList.map((item, index) => (
              <li key={index} className="p-3 border rounded-md bg-gray-100 flex justify-between items-center">
                <div>
                  <strong>{item.activity}</strong> - RM {item.price || "0.00"} - {item.selected || "No Type"}
                  <br />
                  📅 Booking Required: {item.isChecked ? "✅ Yes" : "❌ No"}
                  <br />
                  🔧 Accessibility: {item.value.toFixed(1)}
                </div>
                <button
                  onClick={() => {
                    setDeleteIndex(index);
                    setConfirmOpen(true);
                  }}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
