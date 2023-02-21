import styles from './Avatar.module.pcss';

const avatarUrl = 'https://gravatar.com/avatar/60cff6c6fa4d200720541d0732add946?s=200';

export const Avatar = () => (
  <>
    <div className={`${styles.avatar}`}>
      <img src={avatarUrl} alt="avatar" className={`w-full h-full`} />
    </div>
  </>
);
