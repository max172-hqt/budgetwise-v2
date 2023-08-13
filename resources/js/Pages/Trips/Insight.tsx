export default function Insight() {
  return (
    <div>
      <header className="px-5 pt-4 pb-8">
        <h2 className="font-semibold text-gray-800 text-4xl">Insights</h2>
        <div className="text-gray-400 mt-1">
          Suggestions on resolving debts among trip members
        </div>
      </header>
      <div className="flex">
        <div className="px-5">
          <h1 className="text-xl font-semibold">Members</h1>
          <nav
            className="flex flex-col space-y-4"
            aria-label="Tabs"
            role="tablist"
            data-hs-tabs-vertical="true"
          >
            <button
              type="button"
              className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 py-1 pr-4 inline-flex items-center gap-2 border-r-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 active"
              id="vertical-tab-with-border-item-1"
              data-hs-tab="#vertical-tab-with-border-1"
              aria-controls="vertical-tab-with-border-1"
              role="tab"
            >
              Tab 1
            </button>
            <button
              type="button"
              className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 py-1 pr-4 inline-flex items-center gap-2 border-r-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600"
              id="vertical-tab-with-border-item-2"
              data-hs-tab="#vertical-tab-with-border-2"
              aria-controls="vertical-tab-with-border-2"
              role="tab"
            >
              Tab 2
            </button>
            <button
              type="button"
              className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 py-1 pr-4 inline-flex items-center gap-2 border-r-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600"
              id="vertical-tab-with-border-item-3"
              data-hs-tab="#vertical-tab-with-border-3"
              aria-controls="vertical-tab-with-border-3"
              role="tab"
            >
              Tab 3
            </button>
          </nav>
        </div>

        <div className="ml-3">
          <div
            id="vertical-tab-with-border-1"
            role="tabpanel"
            aria-labelledby="vertical-tab-with-border-item-1"
          >
            <p className="text-gray-500 dark:text-gray-400">
              This is the{' '}
              <em className="font-semibold text-gray-800 dark:text-gray-200">
                first
              </em>{' '}
              item's tab body.
            </p>
          </div>
          <div
            id="vertical-tab-with-border-2"
            className="hidden"
            role="tabpanel"
            aria-labelledby="vertical-tab-with-border-item-2"
          >
            <p className="text-gray-500 dark:text-gray-400">
              This is the{' '}
              <em className="font-semibold text-gray-800 dark:text-gray-200">
                second
              </em>{' '}
              item's tab body.
            </p>
          </div>
          <div
            id="vertical-tab-with-border-3"
            className="hidden"
            role="tabpanel"
            aria-labelledby="vertical-tab-with-border-item-3"
          >
            <p className="text-gray-500 dark:text-gray-400">
              This is the{' '}
              <em className="font-semibold text-gray-800 dark:text-gray-200">
                third
              </em>{' '}
              item's tab body.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
