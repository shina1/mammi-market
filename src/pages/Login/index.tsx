import styles from './index.module.scss';
import { useNavigate } from 'react-router';
import { FormEvent, useEffect } from 'react';
import { getUser, login, logout } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/components/Spinner';
// interface authResponse {
//   error?: {
//     message: string;
//   };
//   payload?: {
//     data: string;
//     status: number;
//   };
// }
const LoginPage = () => {
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user === null && token) {
      const userId = localStorage.getItem('user');
      dispatch(getUser(Number(userId)));
    }
  }, [token, user, dispatch]);

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp: any = await dispatch(login({ username, password }));
    console.log('loginAttempt', resp);
    if (resp?.error && resp?.payload?.response?.status === 401) {
      alert(resp?.payload?.response?.data);
    }

    if (user && token) {
      navigate('/');
      console.log(user);
    }
  };

  const logoutHandler = async () => {
    await dispatch(logout());
    navigate('/');
  };

  if (isLoading) return <Spinner />;

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        {user !== null ? (
          <div className={styles.profile}>
            <div className={styles.profileHeader}>
              <div className={styles.profileInfo}>
                <span className={styles.name}>
                  Name: {`${user?.name.firstname} ${user?.name.lastname}`}
                </span>
                <span>
                  Email: <strong>{user?.email}</strong>
                </span>
                <span>
                  Location: <strong>{user?.address.city}</strong>
                </span>
                <span>
                  Phone: <strong>{user?.address.number}</strong>
                </span>
              </div>
            </div>
            <button
              type="button"
              className={styles.logoutBtn}
              onClick={() => logoutHandler()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form action="/login" onSubmit={formSubmitHandler}>
              <div className={styles.formItem}>
                <div className={styles.formField}>
                  <input type="text" name="username" placeholder="Username:" />
                </div>
                <p className={styles.apiSignExample}>
                  demo username: <strong>mor_2314</strong>
                </p>
              </div>
              <div className={styles.formItem}>
                <div className={styles.formField}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password:"
                  />
                </div>
                <p className={styles.apiSignExample}>
                  demo password: <strong>83r5^_</strong>
                </p>
              </div>
              <div className={styles.formSubmit}>
                <button type="submit">Sign In</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
