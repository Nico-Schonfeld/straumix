"use client";

import * as React from "react";
// import { RotateCcw, ArrowUpRight } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, type Transition } from "motion/react";

const transition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 26,
};

const getCardVariants = (i: number) => ({
  collapsed: {
    marginTop: i === 0 ? 0 : -44,
    scaleX: 1 - i * 0.05,
  },
  expanded: {
    marginTop: i === 0 ? 0 : 4,
    scaleX: 1,
  },
});

// const textSwitchTransition: Transition = {
//   duration: 0.22,
//   ease: "easeInOut",
// };

// const notificationTextVariants = {
//   collapsed: { opacity: 1, y: 0, pointerEvents: "auto" },
//   expanded: { opacity: 0, y: -16, pointerEvents: "none" },
// };

// const viewAllTextVariants = {
//   collapsed: { opacity: 0, y: 16, pointerEvents: "none" },
//   expanded: { opacity: 1, y: 0, pointerEvents: "auto" },
// };

function NotificationList({
  setIsOpenNotification,
  notifications,
}: {
  setIsOpenNotification: (isOpen: boolean) => void;
  notifications: {
    id: number;
    title: string;
    subtitle: string;
    time?: string;
    count?: number;
  }[];
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      className="bg-neutral-200 dark:bg-neutral-900 p-3 rounded-3xl w-xs space-y-3 shadow-md"
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onClick={() => {
        // Solo cambiar estado en mobile
        if (window.innerWidth <= 768) {
          setIsExpanded(!isExpanded);
        }
      }}
      onHoverStart={() => {
        // Solo cambiar estado en desktop
        if (window.innerWidth > 768) {
          setIsExpanded(true);
        }
      }}
      onHoverEnd={() => {
        // Solo cambiar estado en desktop
        if (window.innerWidth > 768) {
          setIsExpanded(false);
        }
      }}
    >
      <div>
        {notifications.slice(0, isExpanded ? 8 : 3).map((notification, i) => (
          <motion.div
            key={notification.id}
            className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-2 shadow-sm hover:shadow-lg transition-shadow duration-200 relative"
            variants={getCardVariants(i)}
            transition={transition}
            style={{
              zIndex: notifications.length - i,
            }}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-sm font-medium">{notification.title}</h1>
              {/* {notification.count && (
                <div className="flex items-center text-xs gap-0.5 font-medium text-neutral-500 dark:text-neutral-300">
                  <RotateCcw className="size-3" />
                  <span>{notification.count}</span>
                </div>
              )} */}
            </div>

            <div className="text-xs text-neutral-500 font-medium">
              <span>{notification.time}</span>
              &nbsp;•&nbsp;
              <span>{notification.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full px-4 py-3 backdrop-blur-sm rounded-4xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-7 w-auto rounded-full px-2 gap-2 bg-background text-black dark:text-white text-xs flex items-center justify-center font-medium shadow-md">
              {notifications.length}{" "}
              <motion.span
              // variants={notificationTextVariants}
              // transition={textSwitchTransition}
              >
                Notificaciones
              </motion.span>
            </div>
            {/* <motion.a
              href="/notifications"
              className="text-sm font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 flex items-center gap-1.5 transition-colors hover:underline"
              variants={viewAllTextVariants}
              transition={textSwitchTransition}
            >
              Ver
              <ArrowUpRight className="size-4" />
            </motion.a> */}
          </div>
        </div>

        <button
          className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer"
          onClick={() => setIsOpenNotification(false)}
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  );
}

export { NotificationList };
