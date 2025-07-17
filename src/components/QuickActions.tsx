import Link from "next/link";
import { Plus, Settings, Upload } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="flex flex-col gap-2">
        <Link
          href="/create"
          className="flex items-center gap-2 bg-[#0286a3] hover:bg-[#0286a3]/90 text-white py-2 px-4 rounded"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Blog</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
        <Link
          href="/upload-cover"
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Cover Image</span>
        </Link>
      </div>
    </div>
  );
}
