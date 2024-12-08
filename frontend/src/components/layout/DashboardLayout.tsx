import { Fragment, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CalculatorIcon,
  ChartBarIcon,
  XMarkIcon,
  BellIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ThemeToggle } from '../common/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Inventory', href: '/inventory', icon: ShoppingBagIcon },
  { name: 'Billing', href: '/billing', icon: CalculatorIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
];

const slideVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-light to-light-accent dark:from-dark dark:to-dark-accent transition-all duration-300">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={slideVariants}
                  className="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 hover:rotate-90 transition-transform duration-200"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </motion.div>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-6 pb-4 ring-1 ring-gray-900/10 dark:ring-gray-100/10">
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeVariants}
                    className="flex h-16 shrink-0 items-center"
                  >
                    <img
                      className="h-8 w-auto"
                      src="/logo.svg"
                      alt="Dukaan Tech"
                    />
                  </motion.div>
                  <nav className="flex flex-1 flex-col">
                    <motion.ul 
                      role="list" 
                      className="flex flex-1 flex-col gap-y-7"
                    >
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item, index) => (
                            <motion.li
                              key={item.name}
                              initial="hidden"
                              animate="visible"
                              variants={slideVariants}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Link
                                to={item.href}
                                className={clsx(
                                  location.pathname === item.href
                                    ? 'bg-primary-50/80 text-primary-600 dark:bg-primary-900/80 dark:text-primary-200 shadow-lg shadow-primary-500/20'
                                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50/80 dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-primary-300',
                                  'group flex gap-x-3 rounded-xl p-2 text-sm leading-6 font-semibold transition-all duration-200 hover:scale-105'
                                )}
                              >
                                <item.icon
                                  className={clsx(
                                    location.pathname === item.href
                                      ? 'text-primary-600 dark:text-primary-200'
                                      : 'text-gray-400 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-300',
                                    'h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-110'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <Link
                          to="/settings"
                          className="group -mx-2 flex gap-x-3 rounded-xl p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50/80 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-primary-300 transition-all duration-200 hover:scale-105"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-300 transition-transform duration-200 group-hover:rotate-180"
                            aria-hidden="true"
                          />
                          Settings
                        </Link>
                      </li>
                    </motion.ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-6 pb-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
            className="flex h-16 shrink-0 items-center"
          >
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Dukaan Tech"
            />
          </motion.div>
          <nav className="flex flex-1 flex-col">
            <motion.ul 
              role="list" 
              className="flex flex-1 flex-col gap-y-7"
            >
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial="hidden"
                      animate="visible"
                      variants={slideVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={clsx(
                          location.pathname === item.href
                            ? 'bg-primary-50/80 text-primary-600 dark:bg-primary-900/80 dark:text-primary-200 shadow-lg shadow-primary-500/20'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50/80 dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-primary-300',
                          'group flex gap-x-3 rounded-xl p-2 text-sm leading-6 font-semibold transition-all duration-200 hover:scale-105'
                        )}
                      >
                        <item.icon
                          className={clsx(
                            location.pathname === item.href
                              ? 'text-primary-600 dark:text-primary-200'
                              : 'text-gray-400 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-300',
                            'h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-110'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  to="/settings"
                  className="group -mx-2 flex gap-x-3 rounded-xl p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50/80 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-primary-300 transition-all duration-200 hover:scale-105"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-300 transition-transform duration-200 group-hover:rotate-180"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </li>
            </motion.ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
        >
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <Menu as="div" className="relative">
                <Menu.Button className="relative flex items-center p-1.5 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50 ring-2 ring-primary-500/20"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={clsx(
                            active ? 'bg-gray-50 dark:bg-gray-700' : '',
                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={clsx(
                            active ? 'bg-gray-50 dark:bg-gray-700' : '',
                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </motion.div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
