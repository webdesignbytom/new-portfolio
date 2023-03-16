import React, { useContext, useEffect, useState } from 'react';
// Context
import { UserContext } from '../../context/UserContext';
// Components
import Navbar from '../../components/nav/Navbar';
import LoggedInUser from '../../utils/LoggedInUser';
// Fetch
import { setFormByUserId } from '../../utils/Fetch';
// Data
import client from '../../utils/client';
import AdminOverview from '../../components/admin/AdminOverview';
import UsersContainer from '../../components/users/UsersContainer';
import ContactsContainer from '../../components/contacts/ContactsContainer';
import LoadingSpinner from '../../components/utils/LoadingSpinner';
import ProjectsOverview from '../../components/account/ProjectsOverview';
import AdminSearch from '../../components/admin/AdminSearch';
import AdminProjects from '../../components/admin/AdminProjects';

function AdminPanel() {
  const { user } = useContext(UserContext);
  const [updateUserForm, setUpdateUserForm] = useState(user);
  const [resendVerification, setResendVerification] = useState(true);
  // Users
  const [allUsers, setAllUsers] = useState([]);
  // Contact form messages
  const [allContacts, setAllContacts] = useState([]);
  // Projects
  const [allProjects, setAllProjects] = useState([]);
  // Display items
  const [displayOverview, setDisplayOverview] = useState(false);
  const [displayProjects, setDisplayProjects] = useState(false);
  const [displayUsers, setDisplayUsers] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayFixed, setDisplayFixed] = useState(true);
  const [selectedNavElement, setSelectedNavElement] = useState('overview');
  // Favorites
  const [listOfFavorites, setListOfFavorites] = useState([]);

  useEffect(() => {
    const foundUser = LoggedInUser();
    setFormByUserId(foundUser.id, setUpdateUserForm);

    // Notifications
    client
      .get(`/contacts`)
      .then((res) => {
        console.log('res', res.data);
        setAllContacts(res.data.data.contacts);
      })
      .catch((err) => {
        console.error('Unable to get contact messages', err);
      });

    client
      .get(`/projects`)
      .then((res) => {
        console.log('response', res.data);
        setAllProjects(res.data.data.projects);
      })
      .catch((err) => {
        console.error('Unable to get all projects', err);
      });

    client
      .get(`/users`)
      .then((res) => {
        console.log('response', res.data);
        setAllUsers(res.data.data.users);
      })
      .catch((err) => {
        console.error('Unable to get users', err);
      });
  }, [user.id]);

  useEffect(() => {
    setTimeout(() => {
      if (!user.isVerified) {
        setResendVerification(false);
      }
    }, 2000);
  }, [user.isVerified]);

  return (
    <>
      <div className='bg-white dark:bg-black lg:max-h-screen lg:overflow-hidden'>
        <Navbar />
        {/* Main */}
        <section className='grid lg:h-[calc(100vh-64px)] lg:max-h-[calc(100vh-64px)] lg:grid-rows-reg overflow-hidden'>
          {/* Titles */}
          <div className='text-left ml-2 mt-4 mb-1 lg:mx-6'>
            <h1 className='font-bold text-xl'>
              Admin Panel: {user.firstName} {user.lastName}
            </h1>
          </div>
          {/* Main Container */}
          <section className='interaction__container'>
            {/* Left */}
            <section className='grid lg:grid-rows-reg'>
              {/* Nav */}
              <nav className='p-2 lg:mr-4 lg:mb-4 border-b-2 border-hover-text border-solid mb-4'>
                <ul className='flex justify-between lg:justify-start lg:gap-28'>
                  <li
                    onMouseEnter={() => {
                      setDisplayOverview(true);
                      setDisplayFixed(false);
                    }}
                    onMouseLeave={() => {
                      setDisplayOverview(false);
                      setDisplayFixed(true);
                    }}
                    onClick={() => setSelectedNavElement('overview')}
                    className='cursor-pointer text-active-text hover:text-hover-text active:text-active-text'
                  >
                    Overview
                  </li>
                  <li
                    onMouseEnter={() => {
                      setDisplayUsers(true);
                      setDisplayFixed(false);
                    }}
                    onMouseLeave={() => {
                      setDisplayUsers(false);
                      setDisplayFixed(true);
                    }}
                    onClick={() => setSelectedNavElement('users')}
                    className='cursor-pointer text-active-text hover:text-hover-text active:text-active-text'
                  >
                    Users
                  </li>
                  <li
                    onMouseEnter={() => {
                      setDisplayProjects(true);
                      setDisplayFixed(false);
                    }}
                    onMouseLeave={() => {
                      setDisplayProjects(false);
                      setDisplayFixed(true);
                    }}
                    onClick={() => setSelectedNavElement('projects')}
                    className='cursor-pointer text-active-text hover:text-hover-text active:text-active-text'
                  >
                    Projects
                  </li>
                  <li
                    onMouseEnter={() => {
                      setDisplaySearch(true);
                      setDisplayFixed(false);
                    }}
                    onMouseLeave={() => {
                      setDisplaySearch(false);
                      setDisplayFixed(true);
                    }}
                    onClick={() => setSelectedNavElement('search')}
                    className='cursor-pointer text-active-text hover:text-hover-text active:text-active-text'
                  >
                    Search
                  </li>
                </ul>
              </nav>
              {/* Content */}
              <section className='grid lg:mr-4'>
                {/* Hover */}
                {displayOverview && <AdminOverview />}
                {displayUsers && <UsersContainer users={allUsers} />}
                {displayProjects && <AdminProjects projects={allProjects} />}
                {displaySearch && <AdminSearch />}
                {/* Open */}
                {selectedNavElement === 'overview' && displayFixed === true && (
                  <AdminOverview />
                )}
                {selectedNavElement === 'users' && displayFixed === true && (
                  <UsersContainer users={allUsers} />
                )}
                {selectedNavElement === 'projects' && displayFixed === true && (
                  <AdminProjects projects={allProjects} />
                )}
                {selectedNavElement === 'search' && displayFixed === true && (
                  <AdminSearch />
                )}
              </section>
            </section>
            {/* Right */}
            <section className='hidden lg:grid lg:grid-rows-ls gap-2 overflow-hidden'>
              {/* Messages */}
              <section className='grid lg:grid-rows-2 gap-1 border-2 border-black border-solid rounded-sm overflow-hidden p-1'>
                <section className='grid lg:grid-rows-reg border-2 border-black border-solid rounded-sm overflow-hidden'>
                  <h3 className='border-b-2 h-min border-black border-solid pl-2 py-1 bg-main-colour lg:bg-white'>
                    Notifications
                  </h3>
                  <div className='grid max-h-[300px] lg:max-h-none lg:items-center overflow-scroll overflow-x-hidden bg-main-colour'>
                    {/* {allNotifications.length < 1 ? (
                      <div className='grid grid-rows-1'>
                        <LoadingSpinner height={'12'} width={'12'} />
                      </div>
                    ) : (
                      <NotificationsContainer
                        notifications={allNotifications}
                      />
                    )} */}
                  </div>
                </section>

                <section className='grid lg:grid-rows-reg border-2 border-black border-solid rounded-sm overflow-hidden'>
                  <h3 className='border-b-2 h-min border-black border-solid pl-2 py-1 bg-main-colour lg:bg-white'>
                    Contact Form
                  </h3>
                  <div className='grid max-h-[300px] lg:max-h-none lg:items-center overflow-scroll overflow-x-hidden bg-main-colour w-full'>
                    {allContacts.length < 1 ? (
                      <div className='grid grid-rows-1 justify-center'>
                        <LoadingSpinner
                          height={'h-6 lg:h-12'}
                          width={'w-6 lg:w-12'}
                        />
                      </div>
                    ) : (
                      <ContactsContainer contacts={allContacts} />
                    )}
                  </div>
                </section>
              </section>
              {/* Favorites */}
              <section className='hidden lg:grid border-2 border-black border-solid rounded-sm p-1'>
                <div className='border-2 border-black border-solid rounded-sm overflow-hidden'>
                  <h3 className='border-b-2 border-black border-solid pl-2 py-1'>
                    Favorites
                  </h3>
                  <ul className='bg-main-colour grid h-full'>
                    {listOfFavorites > 0 ? (
                      listOfFavorites.map((favorite, index) => {
                        return <li key={index}>{favorite.name}</li>;
                      })
                    ) : (
                      <div className='grid justify-center'>
                        <p>Nothing to display</p>
                      </div>
                    )}
                  </ul>
                </div>
              </section>
            </section>
          </section>
          {/* {!resendVerification && (
            <ResendConfirmEmail handleResend={handleResend} />
          )} */}
        </section>
      </div>
    </>
  );
}

export default AdminPanel;
