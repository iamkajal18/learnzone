import { User } from "lucide-react";

interface ProfileSummaryProps {
  name: string;
  avatar?: string;
  bio?: string;
  totalBlogs: number;
}

export default function ProfileSummary({ name, avatar, bio, totalBlogs }: ProfileSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profile Summary</h3>
      <div className="flex items-center gap-4">
        <img
          src={avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=00CFD1&color=fff"}
          alt={name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="text-md font-medium text-gray-800 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{bio || "No bio provided"}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{totalBlogs} Blogs Posted</p>
        </div>
        <User className="h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
}