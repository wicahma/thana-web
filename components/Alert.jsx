import { useState, useEffect, useRef } from "react";
import { alertService, AlertType } from "../utils/alert";
import { XMarkIcon } from "@heroicons/react/20/solid";
export { Alert };

const Alert = ({ id = "default-alert", fade = true }) => {
  const mounted = useRef(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    mounted.current = true;

    const subscription = alertService.onAlert(id).subscribe((alert) => {
      if (!alert.message) {
        setAlerts((alerts) => {
          const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          return omit(filteredAlerts, "keepAfterRouteChange");
        });
      } else {
        // add alert to array with unique id
        alert.itemId = Math.random();
        setAlerts((alerts) => [...alerts, alert]);

        setTimeout(() => removeAlert(alert), 3000);
      }
    });

    // clear alerts on location change
    const clearAlerts = () => alertService.clear(id);
    // router.events.on("routeChangeStart", clearAlerts);

    // clean up function that runs when the component unmounts
    return () => {
      mounted.current = false;

      // unsubscribe to avoid memory leaks
      subscription.unsubscribe();
      clearAlerts;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function omit(arr, key) {
    return arr.map((obj) => {
      const { [key]: omitted, ...rest } = obj;
      return rest;
    });
  }

  function removeAlert(alert) {
    if (!mounted.current) return;

    if (fade) {
      // fade out alert
      setAlerts((alerts) =>
        alerts.map((x) =>
          x.itemId === alert.itemId ? { ...x, fade: true } : x
        )
      );

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
      }, 250);
    } else {
      // remove alert
      setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
    }
  }

  function cssClasses(alert) {
    if (!alert) return;

    const classes = ["alert"];

    const alertTypeClass = {
      [AlertType.Success]: "alert-success",
      [AlertType.Error]: "alert-error",
      [AlertType.Info]: "alert-info",
      [AlertType.Warning]: "alert-warning",
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("animate-slide-out");
    }

    return classes.join(" ");
  }

  if (!alerts.length) return null;

  return (
    <div className="transition-all space-y-2">
      {alerts.map((alert, index) => (
        <div
          role="alert"
          key={index}
          className={`flex animate-fade-in gap-2 justify-between items-center  ${cssClasses(
            alert
          )}`}
        >
          <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          <button
            className="cursor-pointer p-2 aspect-square h-8 hover:bg-black/15 transition-colors duration-300 flex items-center justify-center bg-black/5 rounded-md text-black/20"
            onClick={() => removeAlert(alert)}
          >
            <XMarkIcon />
          </button>
        </div>
      ))}
    </div>
  );
};
