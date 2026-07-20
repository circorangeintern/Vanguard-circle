import SearchBar from "../components/dashboard/common/SearchBar";
import NotificationButton from "../components/dashboard/common/NotificationButton";
import avatar from "../images/avatar.png";

const DashboardHeader = () => {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        bg-white
        backdrop-blur-md
        border-b
        border-slate-100
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-[1440px]
          items-center
          justify-center
          px-6
          lg:px-8
        "
      >
        {/* Search */}
        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="ml-8 flex items-center gap-4">
          <NotificationButton count={3} />

          <button
            className="
              h-12
              w-12
              overflow-hidden
              rounded-full
              transition-transform
              duration-300
              hover:scale-105
            "
          >
            <img
              src={avatar}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
