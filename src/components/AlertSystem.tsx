
import { useState, useEffect } from "react";
import { AlertTriangle, X, Bell, Info, CheckCircle } from "lucide-react";

interface Alert {
  id: number;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: Date;
  dismissed: boolean;
}

export const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "critical",
      title: "Emergency Callback Required",
      message: "Station 7 needs immediate staffing - Engine out of service",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      dismissed: false,
    },
    {
      id: 2,
      type: "warning", 
      title: "Overtime Limit Alert",
      message: "Johnson, M. approaching 60-hour weekly limit",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      dismissed: false,
    },
    {
      id: 3,
      type: "info",
      title: "Schedule Update",
      message: "Tomorrow's shift roster has been updated",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      dismissed: false,
    },
  ]);

  const dismissAlert = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return timestamp.toLocaleDateString();
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  if (activeAlerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border shadow-lg backdrop-blur-sm ${getAlertStyles(alert.type)} animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{alert.title}</h4>
                <p className="text-sm opacity-90 mt-1">{alert.message}</p>
                <p className="text-xs opacity-75 mt-2">{formatTimestamp(alert.timestamp)}</p>
              </div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="ml-2 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
