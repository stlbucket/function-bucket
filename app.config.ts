export default defineAppConfig({
  ui: {
    // icons: ['heroicons'],
    icons: {
      dynamic: true,
      collections: ['heroicons']
    },
    primary: 'green',
    gray: 'stone',
    modal: { container: 'max-sm:items-start'},
    card: {
      "base": "overflow-hidden",
      "background": "bg-white dark:bg-gray-900",
      "divide": "divide-y divide-gray-200 dark:divide-gray-800",
      "ring": "ring-1 ring-gray-200 dark:ring-gray-800",
      "rounded": "rounded-lg",
      "shadow": "shadow",
      "body": {
        "base": "",
        "background": "dark:bg-gray-700",
        "padding": "px-2 py-2 sm:p-6"
      },
      "header": {
        "base": "",
        "background": "dark:bg-gray-700",
        "padding": "px-2 py-3 sm:px-6"
      },
      "footer": {
        "base": "",
        "background": "dark:bg-gray-700",
        "padding": "px-2 py-2 sm:px-6"
      }
    },
    table: {
      "wrapper": "relative overflow-x-auto",
      "base": "min-w-full table-fixed",
      "divide": "divide-y divide-gray-300 dark:divide-gray-700",
      "thead": "",
      "tbody": "divide-y divide-gray-200 dark:divide-gray-800",
      "tr": {
        "base": "",
        "selected": "bg-gray-50 dark:bg-gray-800/50",
        "active": "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
      },
      "th": {
        "base": "text-left rtl:text-right",
        "padding": "px-3 py-2",
        "color": "text-gray-900 dark:text-white",
        "font": "font-semibold",
        "size": "text-sm"
      },
      "td": {
        "base": "whitespace-nowrap",
        "padding": "px-2 py-2",
        "color": "text-gray-500 dark:text-gray-400",
        "font": "",
        "size": "text-sm"
      },
      "loadingState": {
        "wrapper": "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        "label": "text-sm text-center text-gray-900 dark:text-white",
        "icon": "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin"
      },
      "emptyState": {
        "wrapper": "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        "label": "text-sm text-center text-gray-900 dark:text-white",
        "icon": "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4"
      },
      "default": {
        "sortAscIcon": "i-heroicons-bars-arrow-up-20-solid",
        "sortDescIcon": "i-heroicons-bars-arrow-down-20-solid",
        "sortButton": {
          "icon": "i-heroicons-arrows-up-down-20-solid",
          "trailing": true,
          "square": true,
          "class": "-m-1.5"
        },
        "loadingState": {
          "icon": "i-heroicons-arrow-path-20-solid",
          "label": "Loading..."
        },
        "emptyState": {
          "icon": "i-heroicons-circle-stack-20-solid",
          "label": "No items."
        }
      }
    }
    
  }
})
