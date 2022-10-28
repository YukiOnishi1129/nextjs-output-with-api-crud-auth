/**
 * SignInTemplate
 *
 * @package components
 */
import { FC, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { singInApi } from '@/apis/authApi';
import { NAVIGATION_PATH, NAVIGATION_LIST } from '@/constants/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { InputForm } from '@/components/atoms/InputForm';
import { CommonButton } from '@/components/atoms/CommonButton';
import { EventType } from '@/interfaces/Event';
import styles from './styles.module.css';

/**
 * SignInTemplate
 * @returns
 */
export const SignInTemplate: FC = () => {
  const router = useRouter();
  const { singIn } = useAuthContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * ログイン処理
   */
  const handleLogin: EventType['onSubmit'] = useCallback(
    async (event) => {
      event.preventDefault();
      const res = await singInApi(email, password);
      if (res?.code === 401) {
        console.log(res.message);
        return;
      }
      if (res?.data?.user) {
        singIn(res.data.user);
        localStorage.setItem('access_token', res.data.accessToken);
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [email, password, singIn, router]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.area}>
          <InputForm type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.area}>
          <InputForm
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.area}>
          <CommonButton type="submit" title="login" />
        </div>
        <div className={styles.link}>
          <Link href={NAVIGATION_LIST.SIGNUP}>&lt;&lt; to signup page</Link>
        </div>
      </form>
    </div>
  );
};
