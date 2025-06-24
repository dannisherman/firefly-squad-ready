
import { Shield } from "lucide-react";
import { UserProfile } from "./UserProfile";
import { SearchBar } from "./SearchBar";

interface TopBarProps {
  onSearch?: (query: string) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSignOutClick?: () => void;
}

export const TopBar = ({
  onSearch,
  onProfileClick,
  onSettingsClick,
  onSignOutClick
}: TopBarProps) => {
  return (
    <header className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Search */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-red-500 md:hidden" />
            <h1 className="text-lg font-bold text-white md:hidden">FireOps</h1>
          </div>
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Right side - User Profile */}
        <UserProfile
          onProfileClick={onProfileClick}
          onSettingsClick={onSettingsClick}
          onSignOutClick={onSignOutClick}
        />
      </div>
    </header>
  );
};
