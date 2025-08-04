import { X, Bell, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotification,
  markAllNotificationsAsRead,
} from "../../../../store/Notification/notifcationSlice";

const NotificationSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );

  console.log(notifications);
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  const markAsRead = (id) => {
    // Implement mark as read functionality
  };

  const markAllAsRead = async () => {
    try {
      await dispatch(markAllNotificationsAsRead(user._id)).unwrap();
      // Refresh notifications after marking all as read
      dispatch(fetchNotification(user._id));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const formatDate = (dateString) => {
    // Implement date formatting
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-labelledby="notification-sidebar"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div
            className={`w-screen max-w-md transform transition ease-in-out duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-4 py-6 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Notifications
                    </h2>
                  </div>
                  <div className="flex items-center">
                    {notifications.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-indigo-600 hover:text-indigo-800 mr-4"
                      >
                        Mark all as read
                      </button>
                    )}
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">
                    Error loading notifications
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No notifications
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      We'll notify you when something arrives.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                      <li
                        key={notification._id}
                        className="px-4 py-4 hover:bg-gray-50"
                      >
                        <div
                          className={`relative p-3 rounded-lg ${
                            notification.read ? "bg-white" : "bg-indigo-50"
                          } transition-all duration-150`}
                        >
                          {!notification.read && (
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600"></span>
                          )}

                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`text-sm font-medium ${
                                  notification.read
                                    ? "text-gray-700"
                                    : "text-gray-900"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {formatDate(notification.date)}
                              </p>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="ml-2 p-1 rounded-full hover:bg-indigo-100 text-indigo-600"
                                title="Mark as read"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                <div className="text-center">
                  <button
                    onClick={onClose}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Close notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSidebar;
